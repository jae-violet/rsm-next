import { gql } from "graphql-request";

export const filtersQuery = gql`
	query Filters {
		markets(sort: ["sort_priority"], filter: { _and: [ {visibility: { _in: ["visibleExceptExpertisePage", "visible"] } }, { show_filter: { _eq: true } } ] }) {
			slug
			short_name
		}
		services(sort: ["sort_priority"], filter: { _and: [ {visibility: { _in: ["visibleExceptExpertisePage", "visible"] } }, { show_filter: { _eq: true } } ] }) {
			slug
			short_name
		}
	}
`;
