import { JSDOM } from "jsdom";
import { importFiles, importFilesWithDescriptions } from "./directus";
import { URL } from "url";

// from Node.ELEMENT_NODE
const ELEMENT_NODE = 1;

export enum PageBlock {
    RichText = "page_block_rich_text",
    CTA = "page_block_cta",
    Blockquote = "page_block_blockquote",
    ImageRow = "page_block_image_row",
}

/**
 * Parses sort priority from a string or number. If the value is null or empty, returns 0 as default.
 */
export function parseSortPriority(
    sort_priority: number | string | null
): number | null {
    if (sort_priority === null || sort_priority === "") {
        return 0;
    } else {
        let priority = sort_priority;
        if (typeof sort_priority === "string") {
            priority = parseInt(sort_priority);
        }
        return priority as number;
    }
}

export function stripStrongTags(html: string) {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const strongElements = document.querySelectorAll("strong");

    strongElements.forEach((strong) => {
        const parent = strong.parentNode;
        while (strong.firstChild) {
            parent!.insertBefore(strong.firstChild, strong);
        }
        parent!.removeChild(strong);
    });

    return document.body.innerHTML;
}

export async function parseHtmlPageBlocks(html: string) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const blocks: any[] = [];
    const textNodes: Element[] = [];
    const figures: { url: string; description?: string | null }[] = [];

    const TEXT_NODES = ["H1", "H2", "H3", "H4", "H5", "H6", "P"];

    const walkNode = async (node: Element) => {
        if (node.nodeType === ELEMENT_NODE) {
            if (TEXT_NODES.includes(node.tagName)) {
                if (node.tagName === "H6" && node.querySelector("a")) {
                    const anchor = node.querySelector("a");
                    blocks.push({
                        collection: PageBlock.CTA,
                        item: {
                            text: anchor!.textContent,
                            link: anchor!.getAttribute("href"),
                        },
                    });
                } else {
                    textNodes.push(node);

                    const nextNodeIsNotText = !TEXT_NODES.includes(
                        node.nextElementSibling?.tagName ?? ""
                    );
                    const nextNodeIsCTA =
                        node.nextElementSibling?.tagName === "H6" &&
                        node.nextElementSibling?.querySelector("a");

                    if (nextNodeIsNotText || nextNodeIsCTA) {
                        // the next node is non-text or a CTA; flush text nodes
                        blocks.push({
                            collection: PageBlock.RichText,
                            item: {
                                content: stripStrongTags(
                                    textNodes.map((n) => n.outerHTML).join("\n")
                                ),
                            },
                        });
                        textNodes.length = 0; // clear text nodes
                    }
                }
            } else if (node.tagName === "BLOCKQUOTE") {
                blocks.push({
                    collection: PageBlock.Blockquote,
                    item: {
                        body: stripStrongTags(node.innerHTML),
                        attribution:
                            node.nextElementSibling &&
                            node.nextElementSibling.tagName === "BLOCKQUOTE"
                                ? stripStrongTags(
                                      node.nextElementSibling.innerHTML
                                  )
                                : null,
                    },
                });
            } else if (node.tagName === "FIGURE") {
                let layout;

                if (node.classList.contains("w-richtext-align-fullwidth")) {
                    layout = "fullWidth";
                } else if (node.classList.contains("w-richtext-align-normal")) {
                    layout = "halfToHalf";
                } else if (
                    node.classList.contains("w-richtext-align-floatright")
                ) {
                    layout = "oneToTwo";
                } else if (
                    node.classList.contains("w-richtext-align-floatleft")
                ) {
                    layout = "twoToOne";
                } else {
                    layout = "halfToHalf";
                }

                let imgElement = node.querySelector("img");
                let figCaptionElement = node.querySelector("figcaption");

                const imgSrc = imgElement?.getAttribute("src");
                const imgAlt = imgElement?.getAttribute("alt");
                if (imgSrc) {
                    figures.push({ url: imgSrc, description: imgAlt });
                }

                // Add image row block
                if (
                    figures.length == 2 ||
                    layout === "fullWidth" ||
                    node.nextElementSibling?.tagName !== "FIGURE" ||
                    (node.nextElementSibling?.tagName === "FIGURE" &&
                        node.className !== node.nextElementSibling.className)
                ) {
                    blocks.push({
                        collection: PageBlock.ImageRow,
                        item: {
                            layout,
                            images: await importFilesWithDescriptions(figures),
                            caption: figCaptionElement
                                ? stripStrongTags(figCaptionElement.innerHTML)
                                : null,
                        },
                    });
                    figures.length = 0; // Clear figures array
                }
            }
        }

        // Recursively call walkNode on child nodes
        for (let child of node.childNodes) {
            await walkNode(child as Element);
        }
    };

    await walkNode(document.body);

    return blocks;
}

/**
 * Parses an HTML list of non-linked items (markets, services) into an array of strings.
 */
export function parseRepeaterItems(
    html: string
): { name: string; link?: string }[] {
    if (html === "") {
        return [];
    }

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const output = [];

    for (let node of document.body.childNodes) {
        if (node.nodeType === ELEMENT_NODE) {
            if ((node.firstChild as Element)?.tagName === "A") {
                const href = (node.firstChild as Element).getAttribute("href");

                let link;
                if (href?.startsWith("/")) {
                    link = href;
                } else if (href) {
                    link = new URL(href).pathname;
                }

                output.push({
                    name: node.textContent ?? "",
                    link,
                });
            } else if (node.textContent) {
                output.push({ name: node.textContent });
            }
        }
    }

    return output;
}

async function test() {
    const test1 = await parseHtmlPageBlocks(`
    <h1>Heading</h1>
    <h2>Another heading</h2>
    <figure>
        <img src="test" />
    </figure>
    <p>Paragraph</p>
    <h2>Heading</h2>
    <p>Another paragraph</p>
    <h6><a>Do the thing!</a></h6>
    <p>Paragraph</p>
`);
    console.log(test1);
}

// test();
