import { gql } from "graphql-request";
import type { PageServerLoad } from "./$types";
import { cmsClient } from "$lib/cms";
import { error } from "@sveltejs/kit";

export const _query = gql`
	query ExpertisePage {
		services(
			filter: { visibility: { _eq: "visible" } },
			sort: ["sort_priority"],
			limit: 9
		) {
			slug
			medium_name
			sub_services_truncated
		}

		markets(
			filter: { visibility: { _eq: "visible" } },
			sort: ["sort_priority"],
			limit: 18
		) {
			slug
			medium_name
			grid_image {
				title
				description
				filename_disk
			}
		}
	}
`;

export const load: PageServerLoad = async ({ params }) => {
	const res = await cmsClient.ExpertisePage();

	return { services: res.services, markets: res.markets };
};
