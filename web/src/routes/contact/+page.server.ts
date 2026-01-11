import { gql } from "graphql-request";
import type { PageServerLoad } from "./$types";
import { cmsClient } from "$lib/cms";
import { error } from "@sveltejs/kit";

export const _query = gql`
	query ContactPage {
		studio_locations(filter: { visibility: { _eq: "visible" } }) {
			slug
			location
			address
			contact_phone
			contact_email
			hubspot_tracking_url
			hubspot_tracking_scripts
		}
		careers(sort: ["sort"], filter: { visibility: { _eq: "visible" } }) {
			slug
			name
		}
	}
`;

export const load: PageServerLoad = async ({ params }) => {
	const res = await cmsClient.ContactPage();

	return {
		studioLocations: res.studio_locations,
		careers: res.careers
	};
};
