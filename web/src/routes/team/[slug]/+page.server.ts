import { gql } from "graphql-request";
import type { PageServerLoad } from "./$types";
import { cmsClient } from "$lib/cms";
import { error } from "@sveltejs/kit";

export const _query = gql`
	query TeamSlug($slug: String!) {
		team(filter: { slug: { _eq: $slug }, visibility: { _nin: ["visibleInFeeds", "archived"] } }) {
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
			featured_image {
				title
				description
				filename_disk
			}
			bio
			education
			honors
			speaking_publications_topics
			expertise
			contact_email
			hubspot_tracking_url
			hubspot_tracking_scripts
			contact_phone_1
			contact_phone_1_extension
			contact_phone_2
			contact_phone_2_extension
			linkedin_url
			has_profile_page
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

		news_posts(
			limit: 7
			filter: { authors: { team_id: { slug: { _eq: $slug } } }, visibility: { _nin: ["draft", "visibleExceptFeeds", "archived"] } }
		) {
			slug
			post_title
			published_date
		}
	}
`;

export const load: PageServerLoad = async ({ params }) => {
	const res = await cmsClient.TeamSlug({ slug: params.slug });

	if (res.team.length === 0) {
		throw error(404);
	}

	return {
		team: res.team[0],
		newsPosts: res.news_posts
	};
};
