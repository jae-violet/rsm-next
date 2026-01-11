import type { AwardsPageQuery } from "$lib/__generated__/graphql";
import { cmsClient } from "$lib/cms";
import type { PageServerLoad } from "./$types";
import { gql } from "graphql-request";

export const _query = gql`
	query AwardsPage {
		awards(limit: -1, filter: { visibility: { _eq: "visible" } }, sort: ["year", "-awards_page_sort"]) {
			award_designation
			year
			awards_page_sort
			project_name
			project_location
			project {
				slug
				project_title
			}
		}
	}
`;

type Award = AwardsPageQuery["awards"][number];

export const load: PageServerLoad = async ({ params }) => {
	const res = await cmsClient.AwardsPage();

	// group awards by year
	const awardYearMap = res.awards.reduce((acc: Record<number, Award[]>, award) => {
		if (!award.year) {
			return acc;
		}

		if (!acc[award.year]) {
			acc[award.year] = [];
		}
		acc[award.year].push(award);
		return acc;
	}, {});

	const awardsByYear = Object.entries(awardYearMap).sort(([a], [b]) => parseInt(b) - parseInt(a));

	return {
		awardsByYear
	};
};
