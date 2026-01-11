import tempAwards from "../data/awards.json";
import tempBooks from "../data/books.json";
import tempCareers from "../data/careers.json";
import tempGeographicalRegions from "../data/geographical_regions.json";
import tempMarkets from "../data/markets.json";
import tempMiscs from "../data/misc.json";
import tempNewsPosts from "../data/news_posts.json";
import tempNewsTopics from "../data/news_topics.json";
import tempProjects from "../data/projects.json";
import tempServices from "../data/services.json";
import tempStudioLocations from "../data/studio_locations.json";
import tempTeams from "../data/team.json";
import tempTestimonials from "../data/testimonials.json";
import {
    parseHtmlPageBlocks,
    parseRepeaterItems,
    parseSortPriority,
    stripStrongTags,
} from "./parse";
import { directus, importFile, importFiles } from "./directus";

function optionalDate(date: string | null): Date | null {
    if (date) {
        return new Date(date);
    } else {
        return null;
    }
}

function optionalInt(int: string | number | null): number | null {
    if (int) {
        if (typeof int === "string") {
            return parseInt(int);
        } else {
            return int;
        }
    } else {
        return null;
    }
}

export async function relateMany(
    slugs: string[] | null | undefined,
    collection: string,
    relationColumn: string
) {
    let output = [];
    for (const slug of slugs ?? []) {
        if (!slug || slug === "") {
            continue;
        }
        console.log("Relating slugs " + JSON.stringify(slugs));
        const record: any = await directus.items(collection).readByQuery({
            filter: {
                slug: slug.trim(),
            },
        });
        if (record?.data?.[0]) {
            output.push({ [relationColumn]: record.data[0].id });
        }
    }
    return output;
}

export async function relateOne(slug: string | null, collection: string) {
    if (slug) {
        let record: any = await directus.items(collection).readByQuery({
            filter: {
                slug: slug.trim(),
            },
        });
        if (record?.data?.[0]) {
            return { id: record.data[0].id };
        } else {
            throw new Error("Missing record: " + slug);
        }
    } else {
        return null;
    }
}

/* -------------------------------------------------------------------------- */
/*                                   Awards                                   */
/* -------------------------------------------------------------------------- */
export async function importAwards() {
    console.log("Importing awards...");
    for (const tempAward of tempAwards) {
        console.log(tempAward.slug);
        await directus.items("awards").createOne({
            status: "published",
            name: tempAward.name,
            slug: tempAward.slug,
            award_designation: tempAward["award,_designation"],
            award_designation_short: tempAward["award,_designation_short"],
            project_name: tempAward.project_name,
            project_location: tempAward.project_location,
            year: tempAward.year,
            awards_page_sort: parseSortPriority(
                tempAward.awards_page_sort_priority
            ),
            project_page_sort: parseSortPriority(
                tempAward.project_page_sort_priority
            ),
        });
    }
}
export async function relateAwards() {
    console.log("Relating awards...");
    const res: any = await directus.items("awards").readByQuery({ limit: -1 });
    for (const award of res.data ?? []) {
        const tempAward = tempAwards.find((x) => x.slug === award.slug);
        if (tempAward?.project) {
            directus.items("awards").updateOne(award.id, {
                project: await relateOne(tempAward.project, "projects"),
            });
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                                    Books                                   */
/* -------------------------------------------------------------------------- */
export async function importBooks() {
    console.log("Importing books...");
    for (const tempBook of tempBooks) {
        console.log(tempBook.slug);
        await directus.items("books").createOne({
            status: "published",
            title: tempBook.title,
            slug: tempBook.slug,
            seo_page_description: tempBook.seo_page_description,
            home_page_tagline: tempBook.home_page_tagline,
            home_page_blurb: tempBook.home_page_blurb,
            banner_image: await importFile(
                tempBook.banner_image,
                tempBook.banner_image_description
            ),
            banner_image_mobile: await importFile(
                tempBook.banner_image_mobile,
                tempBook.banner_image_mobile_description
            ),
            hero_image: await importFile(
                tempBook.hero_image,
                tempBook.hero_image_description
            ),
            grid_image: await importFile(
                tempBook.grid_image,
                tempBook.grid_image_description
            ),
            tag: tempBook.tag,
            book_description: tempBook.book_description,
            authors: tempBook.authors,
            format: tempBook.format,
            page_count: tempBook.page_count,
            weight: tempBook["weight_(lbs)"],
            visual_profile_books_link: tempBook.visual_profile_books_link,
            amazon_link: tempBook.amazon_link,
            body: stripStrongTags(tempBook.body),
        });
    }
}
export async function relateBooks() {
    console.log("No relations for books");
}

/* -------------------------------------------------------------------------- */
/*                                    Team                                    */
/* -------------------------------------------------------------------------- */
export async function importTeam() {
    console.log("Importing team...");
    for (const tempTeam of tempTeams) {
        console.log(tempTeam.slug);
        await directus.items("team").createOne({
            status: "published",
            name: tempTeam.name,
            slug: tempTeam.slug,
            seo_page_description: tempTeam.seo_page_description_principals_only,
            full_title: tempTeam.full_title,
            short_title: tempTeam.short_title,
            headshot: await importFile(
                tempTeam.headshot,
                tempTeam.headshot_description
            ),
            featured_image: await importFile(
                tempTeam.featured_image,
                tempTeam.featured_image_description
            ),
            bio: stripStrongTags(tempTeam.bio),
            education: parseRepeaterItems(tempTeam.education),
            honors: parseRepeaterItems(tempTeam.honors),
            speaking_publications_topics: parseRepeaterItems(
                tempTeam.speaking_publications_abstract_topics
            ),
            expertise: parseRepeaterItems(tempTeam.expertise),
            contact_phone_1: String(tempTeam.contact_phone_1),
            contact_phone_1_extension: String(
                tempTeam.contact_phone_1_extension
            ),
            contact_phone_2: tempTeam.contact_phone_2,
            contact_phone_2_extension: tempTeam.contact_phone_2_extension,
            contact_email: tempTeam.contact_email,
            hubspot_tracking_email: tempTeam.hubspot_tracking_email,
            instagram_url: tempTeam.instagram_url,
            linkedin_url: tempTeam.linkedin_url,
            noindex: tempTeam.noindex,
            sort_priority: parseSortPriority(tempTeam.sort_priority),
            title_ranking: tempTeam.title_ranking,
            banner_grid_image_bw: await importFile(
                tempTeam["banner_grid_image_b&w"],
                tempTeam.banner_grid_image_description
            ),
            banner_grid_image_color: await importFile(
                tempTeam.banner_grid_image_color,
                tempTeam.banner_grid_image_description
            ),
            banner_grid_image_sort: optionalInt(
                tempTeam.banner_grid_image_sort
            ),
            display_latest_articles: tempTeam.display_latest_articles,
        });
    }
}
export async function relateTeam() {
    console.log("Relating team...");
    const res: any = await directus.items("team").readByQuery({ limit: -1 });
    for (const team of res.data ?? []) {
        const tempTeam = tempTeams.find((x) => x.slug === team.slug);
        if (tempTeam?.recent_projects) {
            directus.items("team").updateOne(team.id, {
                recent_projects: await relateMany(
                    tempTeam.recent_projects.split(";"),
                    "projects",
                    "projects_id"
                ),
            });
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                                   Careers                                  */
/* -------------------------------------------------------------------------- */
export async function importCareers() {
    console.log("Importing careers...");
    for (const career of tempCareers) {
        console.log(career.slug);
        await directus.items("careers").createOne({
            status: "published",
            name: career.name,
            slug: career.slug,
            seo_page_description: career.seo_page_description,
            job_description: stripStrongTags(career.job_description),
        });
    }
}
export async function relateCareers() {
    console.log("No relations for careers");
}

/* -------------------------------------------------------------------------- */
/*                                  Projects                                  */
/* -------------------------------------------------------------------------- */
export async function importProjects() {
    console.log("Importing projects...");
    for (const project of tempProjects) {
        console.log(project.slug);
        const [grid_image, hero_image, slider_images, page_content] =
            await Promise.all([
                importFile(project.grid_image, project.grid_image_description),
                importFile(project.hero_image, project.hero_image_description),
                importFiles(project.slider_images?.split(";")),
                parseHtmlPageBlocks(project.project_body),
            ]);
        await directus.items("projects").createOne({
            status: "published",
            project_title: project.project_title,
            slug: project.slug,
            project_title_short: project.project_title_short,
            seo_page_description: project.seo_page_description,
            grid_image,
            hero_image,
            hero_image_crop_attachment: project.hero_image_crop_attachment,
            hero_video_id: String(project.hero_video_id),
            location: project.location,
            regions_and_studio_locations_list:
                project.regions_and_studio_locations_list,
            project_description: project.project_description,
            project_opening_date: optionalDate(project.project_opening_date),
            non_linked_markets: parseRepeaterItems(project.non_linked_markets),
            non_linked_services: parseRepeaterItems(
                project.non_linked_services
            ),
            sort: parseSortPriority(project.sort_priority_general),
            // if the sort priority is null, undefined, or 0, itll be hidden on the work page.
            hidden_on_work_page: !project.sort_priority_general,
            home_page_slider: project.home_page_slider === true,
            misc_filters_list: project.misc_filters_list,
            client: parseRepeaterItems(project.client),
            design_awards: parseRepeaterItems(project.design_awards),
            collaborators: project.collaborators,
            project_body: project.project_body,
            slider_images,
            page_content,
        });
    }
}
export async function relateProjects() {
    console.log("Relating projects...");
    const res: any = await directus
        .items("projects")
        .readByQuery({ limit: -1 });
    for (const project of res.data ?? []) {
        const tempProject = tempProjects.find((x) => x.slug === project.slug);
        if (tempProject) {
            directus.items("projects").updateOne(project.id, {
                geographical_regions: await relateMany(
                    tempProject.geographical_region?.split(";"),
                    "geographical_regions",
                    "geographical_regions_id"
                ),
                studio_locations: await relateMany(
                    tempProject.studio_locations?.split(";"),
                    "studio_locations",
                    "studio_locations_id"
                ),
                markets: await relateMany(
                    tempProject.markets?.split(";"),
                    "markets",
                    "markets_id"
                ),
                services: await relateMany(
                    tempProject.services?.split(";"),
                    "services",
                    "services_id"
                ),
            });
        }
    }
}
export async function fixProjects() {
    const res: any = await directus
        .items("projects")
        .readByQuery({ limit: -1 });

    const BATCH_SIZE = 10;
    const batches = [];
    for (let i = 0; i < res.data.length; i += BATCH_SIZE) {
        batches.push(res.data.slice(i, i + BATCH_SIZE));
    }

    for (const batch of batches) {
        const batchPromises = batch.map((project: any) => {
            console.log(project.slug);
            const tempProject = tempProjects.find(
                (x) => x.slug === project.slug
            );
            if (tempProject) {
                return directus.items("projects").updateOne(project.id, {
                    sort: parseSortPriority(tempProject.sort_priority_general),
                    // if the sort priority is null, undefined, or 0, itll be hidden on the work page.
                    hidden_on_work_page: !tempProject.sort_priority_general,
                    home_page_slider: tempProject.home_page_slider === true,
                });
            }
        });

        await Promise.all(batchPromises);
    }
}
/**
 * Fixes project sort order.
 */
export async function fixProjectSort() {
    const sortedProjects = tempProjects.slice().sort((a, b) => {
        const priorityA = a.sort_priority_general as number;
        const priorityB = b.sort_priority_general as number;
        if (priorityA > priorityB) {
            return -1;
        } else if (priorityA < priorityB) {
            return 1;
        } else {
            // priorities are equal, sort by most recent
            return (
                new Date(a.project_opening_date).getTime() -
                new Date(b.project_opening_date).getTime()
            );
        }
    });

    const res: any = await directus
        .items("projects")
        .readByQuery({ limit: -1 });

    const projects = res.data;

    let test = [];

    let batch = [];

    for (let i = 0; i < sortedProjects.length; i++) {
        let project = projects.find(
            (p: any) => p.slug === sortedProjects[i].slug
        );
        console.log(
            `Fixing project ${project.slug} ${sortedProjects[i].sort_priority_general}`
        );
        batch.push(
            directus.items("projects").updateOne(project.id, {
                sort: i,
            })
        );
        if (batch.length > 20) {
            await Promise.all(batch);
            batch.length = 0;
        }
    }

    console.log(test.length);
}

/* -------------------------------------------------------------------------- */
/*                                 News Topics                                */
/* -------------------------------------------------------------------------- */
export async function importNewsTopics() {
    console.log("Importing news topics...");
    for (const newsTopic of tempNewsTopics) {
        console.log(newsTopic.slug);
        await directus.items("news_topics").createOne({
            status: "published",
            name: newsTopic.name,
            slug: newsTopic.slug,
        });
    }
}
export async function relateNewsTopics() {
    console.log("No relations for news topics");
}

/* -------------------------------------------------------------------------- */
/*                                 News Posts                                 */
/* -------------------------------------------------------------------------- */
export async function importNewsPosts() {
    console.log("Importing news posts...");
    for (const newsPost of tempNewsPosts) {
        console.log(newsPost.slug);
        const [grid_image, hero_image, page_content] = await Promise.all([
            importFile(newsPost.grid_image, newsPost.grid_image_description),
            importFile(newsPost.hero_image, newsPost.hero_image_description),
            parseHtmlPageBlocks(newsPost.post_body),
        ]);
        await directus.items("news_posts").createOne({
            status: "published",
            post_title: newsPost.post_title,
            slug: newsPost.slug,
            published_date: optionalDate(newsPost.published_date),
            seo_page_description: newsPost.seo_page_description,
            article_preview: newsPost.article_preview,
            grid_image,
            topics_list: newsPost.topics_list,
            hero_image,
            hero_image_crop_attachment: newsPost.hero_image_crop_attachment,
            hero_video: newsPost.hero_video,
            featured: newsPost.featured,
            post_body: newsPost.post_body,
            page_content,
        });
    }
}
export async function relateNewsPosts() {
    console.log("Relating news posts...");
    const res: any = await directus.items("news_posts").readByQuery({
        limit: -1,
    });
    for (const newsPost of res.data ?? []) {
        const tempNewsPost = tempNewsPosts.find(
            (x) => x.slug === newsPost.slug
        );
        if (tempNewsPost) {
            directus.items("news_posts").updateOne(newsPost.id, {
                authors: await relateMany(
                    tempNewsPost.authors?.split(";"),
                    "team",
                    "team_id"
                ),
                topics: await relateMany(
                    tempNewsPost.topics?.split(";"),
                    "news_topics",
                    "news_topics_id"
                ),
            });
        }
    }
}
export async function fixNewsPosts() {
    console.log("Fixing news posts...");
    const res: any = await directus
        .items("news_posts")
        .readByQuery({ limit: -1 });

    const BATCH_SIZE = 10;
    const batches = [];
    for (let i = 0; i < res.data.length; i += BATCH_SIZE) {
        batches.push(res.data.slice(i, i + BATCH_SIZE));
    }
    console.log(batches);

    for (const batch of batches) {
        const batchPromises = batch.map((newsPost: any) => {
            console.log(newsPost.slug);
            const tempNewsPost = tempNewsPosts.find(
                (x) => x.slug === newsPost.slug
            );
            if (tempNewsPost) {
                return parseHtmlPageBlocks(tempNewsPost.post_body).then(
                    (page_content) => {
                        return directus
                            .items("news_posts")
                            .updateOne(newsPost.id, {
                                page_content,
                            });
                    }
                );
            }
        });

        await Promise.all(batchPromises);
    }
}

/* -------------------------------------------------------------------------- */
/*                                   Markets                                  */
/* -------------------------------------------------------------------------- */
export async function importMarkets() {
    console.log("Importing markets...");
    for (const market of tempMarkets) {
        console.log(market.slug);
        await directus.items("markets").createOne({
            status: "published",
            name: market.name_market_page,
            slug: market.slug,
            seo_page_description: market.seo_page_description,
            medium_name: market.medium_name_expertise_page,
            short_name: market.short_name_home_page,
            view_more_name: market.name_view_more_button,
            filter_button_name: market.name_filter_button,
            sort_priority: parseSortPriority(market.sort_priority),
            grid_image: await importFile(
                market.grid_image,
                market.grid_image_description
            ),
            hero_images: await importFiles(market.hero_images?.split(";")),
            overview: stripStrongTags(market.overview),
            sub_services: parseRepeaterItems(market["sub-services"]),
            team_leaders_text: stripStrongTags(market.team_leaders_text),
            default_sort: market.default_sort,
        });
    }
}
export async function relateMarkets() {
    console.log("Relating markets...");
    const res: any = await directus.items("markets").readByQuery({ limit: -1 });
    for (const market of res.data ?? []) {
        const tempMarket = tempMarkets.find((x) => x.slug === market.slug);
        if (tempMarket) {
            directus.items("markets").updateOne(market.id, {
                team_leaders: await relateMany(
                    tempMarket.team_leaders?.split(";"),
                    "team",
                    "team_id"
                ),
                related_articles: await relateMany(
                    tempMarket.related_articles?.split(";"),
                    "news_posts",
                    "news_posts_id"
                ),
                featured_projects: await relateMany(
                    tempMarket.featured_projects?.split(";"),
                    "projects",
                    "projects_id"
                ),
            });
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                                  Services                                  */
/* -------------------------------------------------------------------------- */
export async function importServices() {
    console.log("Importing services...");
    for (const service of tempServices) {
        console.log(service.slug);
        await directus.items("services").createOne({
            status: "published",
            name: service.name_service_page,
            slug: service.slug,
            seo_page_description: service.seo_page_description,
            medium_name: service.medium_name_expertise_page,
            short_name: service.short_name_home_page,
            view_more_name: service.name_view_more_button,
            filter_button_name: service.name_filter_button,
            sort_priority: parseSortPriority(service.sort_priority),
            grid_image: await importFile(
                service.grid_image,
                service.grid_image_description
            ),
            hero_images: await importFiles(service.hero_images?.split(";")),
            overview: stripStrongTags(service.overview),
            sub_services: parseRepeaterItems(service["sub-services"]),
            sub_services_truncated: parseRepeaterItems(
                service["sub-services_truncated"]
            ),
            default_sort: service.default_sort,
        });
    }
}
export async function relateServices() {
    console.log("Relating services...");
    const res: any = await directus
        .items("services")
        .readByQuery({ limit: -1 });
    for (const service of res.data ?? []) {
        const tempService = tempServices.find((x) => x.slug === service.slug);
        if (tempService) {
            directus.items("services").updateOne(service.id, {
                team_leaders: await relateMany(
                    tempService.team_leaders?.split(";"),
                    "team",
                    "team_id"
                ),
                related_articles: await relateMany(
                    tempService.related_articles?.split(";"),
                    "news_posts",
                    "news_posts_id"
                ),
                featured_projects: await relateMany(
                    tempService.featured_projects?.split(";"),
                    "projects",
                    "projects_id"
                ),
            });
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                            Geographical Regions                            */
/* -------------------------------------------------------------------------- */
export async function importGeographicalRegions() {
    console.log("Importing geographical regions...");
    for (const geographicalRegion of tempGeographicalRegions) {
        console.log(geographicalRegion.slug);
        await directus.items("geographical_regions").createOne({
            name: geographicalRegion.name,
            slug: geographicalRegion.slug,
            view_more_name: geographicalRegion["name_(view_more_button)"],
            search_name: geographicalRegion["name_(search_auto-complete)"],
            seo_page_description: geographicalRegion.seo_page_description,
            grid_image: await importFile(
                geographicalRegion.grid_image,
                geographicalRegion.grid_image_description
            ),
            hero_images: await importFiles(
                geographicalRegion.hero_images?.split(";")
            ),
            overview: stripStrongTags(geographicalRegion.overview),
            project_locations: parseRepeaterItems(
                geographicalRegion.project_locations
            ),
            non_linked_services: parseRepeaterItems(
                geographicalRegion["non-linked_services"]
            ),
            completed_projects_info: geographicalRegion.completed_projects_info,
            non_linked_completed_projects: parseRepeaterItems(
                geographicalRegion["non-linked_completed_projects"]
            ),
            region_filter: geographicalRegion.region_filter,
        });
    }
}
export async function relateGeographicalRegions() {
    console.log("Relating geographical regions...");
    const res: any = await directus.items("geographical_regions").readByQuery({
        limit: -1,
    });
    for (const geographicalRegion of res.data ?? []) {
        const tempGeographicalRegion = tempGeographicalRegions.find(
            (x) => x.slug === geographicalRegion.slug
        );
        if (tempGeographicalRegion) {
            directus
                .items("geographical_regions")
                .updateOne(geographicalRegion.id, {
                    sub_services: await relateMany(
                        tempGeographicalRegion["sub-services"]?.split(";"),
                        "services",
                        "services_id"
                    ),
                    related_articles: await relateMany(
                        tempGeographicalRegion.related_articles?.split(";"),
                        "news_posts",
                        "news_posts_id"
                    ),
                    featured_projects: await relateMany(
                        tempGeographicalRegion.featured_projects?.split(";"),
                        "projects",
                        "projects_id"
                    ),
                });
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                              Studio Locations                              */
/* -------------------------------------------------------------------------- */
export async function importStudioLocations() {
    console.log("Importing studio locations...");
    for (const studioLocation of tempStudioLocations) {
        console.log(studioLocation.slug);
        await directus.items("studio_locations").createOne({
            location: studioLocation.location_no_state,
            slug: studioLocation.slug,
            view_more_name: studioLocation.name_view_more_button,
            search_name: studioLocation.name_search_auto_complete,
            seo_page_description: studioLocation.seo_page_description,
            grid_image: await importFile(studioLocation.grid_image, ""),
            location_abbreviated: studioLocation.location_state_abbreviation,
            location_full: studioLocation.location_full_state,
            hero_images: await importFiles(
                studioLocation.hero_images?.split(";")
            ),
            overview: stripStrongTags(studioLocation.overview),
            address: stripStrongTags(studioLocation.address),
            contact_phone: studioLocation.contact_phone,
            contact_email: studioLocation.contact_email,
            sort_priority: parseSortPriority(studioLocation.sort_priority),
            studio_filter: studioLocation.studio_filter,
            hubspot_tracking_email: studioLocation.hubspot_tracking_email,
            noindex: studioLocation.noindex,
        });
    }
}
export async function relateStudioLocations() {
    console.log("Relating studio locations...");
    const res: any = await directus.items("studio_locations").readByQuery({
        limit: -1,
    });
    for (const studioLocation of res.data ?? []) {
        const tempStudioLocation = tempStudioLocations.find(
            (x) => x.slug === studioLocation.slug
        );
        if (tempStudioLocation) {
            directus.items("studio_locations").updateOne(studioLocation.id, {
                office_director: relateOne(
                    studioLocation.office_director,
                    "team"
                ),
                related_articles: relateMany(
                    tempStudioLocation.related_articles?.split(";"),
                    "news_posts",
                    "news_posts_id"
                ),
                featured_projects: relateMany(
                    tempStudioLocation.featured_projects?.split(";"),
                    "projects",
                    "projects_id"
                ),
            });
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                                Testimonials                                */
/* -------------------------------------------------------------------------- */
export async function importTestimonials() {
    console.log("Importing testimonials...");
    for (const testimonial of tempTestimonials) {
        console.log(testimonial.slug);
        await directus.items("testimonials").createOne({
            quote_attribution: testimonial.quote_attribution,
            slug: testimonial.slug,
            quote_attribution_job_title:
                testimonial.quote_attribution_job_title,
            company_name: testimonial.company_name,
            quote: stripStrongTags(testimonial.quote),
            banner_image: await importFile(
                testimonial.banner_image,
                testimonial.banner_image_description
            ),
            sort_priority: parseSortPriority(testimonial.sort_priority),
        });
    }
}
export async function relateTestimonials() {
    console.log("Relating testimonials...");
    const res: any = await directus.items("testimonials").readByQuery({
        limit: -1,
    });
    for (const testimonial of res.data ?? []) {
        const tempTestimonial = tempTestimonials.find(
            (x) => x.slug === testimonial.slug
        );
        if (tempTestimonial) {
            directus.items("testimonials").updateOne(testimonial.id, {
                associated_project: await relateOne(
                    tempTestimonial.associated_project,
                    "projects"
                ),
            });
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                                    Misc                                    */
/* -------------------------------------------------------------------------- */
export async function importMisc() {
    console.log("Importing misc...");
    for (const misc of tempMiscs) {
        console.log(misc.slug);
        await directus.items("misc").createOne({
            name: misc.name,
            slug: misc.slug,
            seo_page_description: misc.seo_page_description,
            grid_image: await importFile(
                misc.grid_image,
                misc.grid_image_description
            ),
            overview: stripStrongTags(misc.overview),
        });
    }
}
export async function relateMisc() {
    console.log("Relating misc...");
    const res: any = await directus.items("misc").readByQuery({
        limit: -1,
    });
    for (const misc of res.data ?? []) {
        const tempMisc = tempMiscs.find((x) => x.slug === misc.slug);
        if (tempMisc) {
            directus.items("misc").updateOne(misc.id, {
                sub_services: await relateMany(
                    tempMisc["sub-services"]?.split(";"),
                    "services",
                    "services_id"
                ),
                team_leaders: await relateMany(
                    tempMisc.team_leaders?.split(";"),
                    "team",
                    "team_id"
                ),
                projects: await relateMany(
                    tempMisc.projects?.split(";"),
                    "projects",
                    "projects_id"
                ),
            });
        }
    }
}
