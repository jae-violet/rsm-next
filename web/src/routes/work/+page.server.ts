import { cmsClient } from "$lib/cms";
import type { PageServerLoad } from "./$types";
import { gql } from "graphql-request";

// export const _query = gql`
// 	query Work {
// 		projects(limit: 9) {
// 			slug
// 			project_title
// 			project_title_short
// 			studio_locations {
// 				studio_locations_id {
// 					location_full
// 				}
// 			}
// 			grid_image {
// 				filename_disk
// 				title
// 				description
// 			}
// 		}
// 	}
// `;

export const load: PageServerLoad = async ({ params }) => {
	const projectsLimit = 9;

	const res = await cmsClient.Projects({
		limit: projectsLimit,
		filter: { visibility: { _eq: "visible" } }
	});
	return {
		projects: res.projects,
		totalProjectsCount: res.projects_aggregated[0]?.count?.id ?? 0,
		projectsLimit,
		filters: await cmsClient.Filters()
	};
};
