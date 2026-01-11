import { mkdir } from "fs/promises";
import { fixProjectSort } from "./import";

/* -------------------------------------------------------------------------- */
/*                                    Main                                    */
/* -------------------------------------------------------------------------- */
async function main() {
    // create image directory for downloads
    await mkdir("./images", {
        recursive: true,
    });

    // console.log("Importing data");
    // await importAwards();
    // await importBooks();
    // await importTeam();
    // await importCareers();
    // await importProjects();
    // await importNewsTopics();
    // await importNewsPosts();
    // await importMarkets();
    // await importServices();
    // await importGeographicalRegions();
    // await importStudioLocations();
    // await importTestimonials();
    // await importMisc();

    // console.log("Creating relations");
    // await relateAwards();
    // await relateBooks();
    // await relateTeam();
    // await relateCareers();
    // await relateProjects();
    // await relateNewsTopics();
    // await relateNewsPosts();
    // await relateMarkets();
    // await relateServices();
    // await relateGeographicalRegions();
    // await relateStudioLocations();
    // await relateTestimonials();
    // await relateMisc();

    console.log("Fixing items");
    // await fixProjects();
    await fixProjectSort();
    // await fixNewsPosts();
}

main();
