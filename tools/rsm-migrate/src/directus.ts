import dotenv from "dotenv";
import { Directus } from "@directus/sdk";
import FormData from "form-data";
import fs from "fs";
import { CustomDirectusTypes } from "./types";

dotenv.config();

export const directus = new Directus("https://rsm-cms-prod.onrender.com", {
    auth: {
        staticToken: process.env.DIRECTUS_STATIC_TOKEN,
    },
});

async function uploadDirectusFile(filepath: string) {
    const form = new FormData();
    form.append("file", fs.createReadStream(filepath));

    return directus.files.createOne(
        form,
        {},
        {
            requestOptions: {
                headers: {
                    ...form.getHeaders(),
                },
            },
        }
    );
}

export async function importFile(
    url: string | null,
    description: string | null
) {
    if (url) {
        return directus.files.import({ url, data: { description } });
    } else {
        return null;
    }
}

export async function importFiles(urls?: string[] | null) {
    if (urls) {
        const output = [];
        for (const url of urls) {
            if (url === "") {
                continue;
            }
            output.push({
                directus_files_id: ((await importFile(url.trim(), "")) as any)
                    ?.id,
            });
        }
        return output;
    } else {
        console.log("No urls");
        return undefined;
    }
}

export async function importFilesWithDescriptions(
    files?: { url?: string | null; description?: string | null }[] | null
) {
    if (files) {
        const output = [];
        for (const file of files) {
            if (file.url === "") {
                continue;
            }
            output.push({
                directus_files_id: (
                    (await importFile(
                        file.url?.trim() ?? "",
                        file.description ?? ""
                    )) as any
                )?.id,
            });
        }
        return output;
    } else {
        console.log("No files");
        return undefined;
    }
}
