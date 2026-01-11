import { gql } from "graphql-request";
import type { PageServerLoad } from "./$types";
import { cmsClient } from "$lib/cms";
import { error } from "@sveltejs/kit";

export const _query = gql`
	query CareersSlugPage($slug: String!) {
		slugCareer: careers(filter: { slug: { _eq: $slug }, visibility: { _neq: "archived" } }) {
			slug
			visibility
			name
			job_description
			seo_page_description
		}
		careers(filter: { visibility: { _eq: "visible" } }) {
			slug
			name
			seo_page_description
		}
		team(
			filter: { banner_grid_image_sort: { _neq: "0" }, visibility: { _in: ["visibleInFeeds", "visible"] } }
			sort: ["-banner_grid_image_sort"]
			limit: 24
		) {
			slug
			banner_grid_image_color {
				title
				description
				filename_disk
			}
			has_profile_page
		}
	}
`;

export const load: PageServerLoad = async ({ params }) => {
	const res = await cmsClient.CareersSlugPage({ slug: params.slug });

	console.log(res.slugCareer);
	if (!res.slugCareer[0]) {
		throw error(404);
	}

	return {
		career: res.slugCareer[0],
		careers: res.careers,
		team: res.team
	};
};
