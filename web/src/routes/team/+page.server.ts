import { gql } from "graphql-request";
import type { PageServerLoad } from "./$types";
import { cmsClient } from "$lib/cms";
import { error } from "@sveltejs/kit";

export const _query = gql`
	query TeamIndexPage {
		team(sort: ["-banner_grid_image_sort"], filter: { visibility: { _in: ["visible", "visibleInFeeds"] } }) {
			slug
			name
			full_title
			short_title
			seo_page_description
			headshot {
				title
				description
				filename_disk
			}
			banner_grid_image_color {
				title
				description
				filename_disk
			}
			banner_grid_image_sort
			sort_priority
			bio
			contact_email
			contact_phone_1
			contact_phone_1_extension
			contact_phone_2
			contact_phone_2_extension
			linkedin_url
			has_profile_page
			speaking_publications_topics
			display_latest_articles
			recent_projects {
				projects_id {
					slug
					grid_image {
						description
						filename_disk
					}
				}
			}
		}
	}
`;

export const load: PageServerLoad = async ({ params }) => {
	const res = await cmsClient.TeamIndexPage();

	return {
		team: res.team
	};
};
