import { gql } from "graphql-request";

export const projectsQuery = gql`
	query Projects($limit: Int, $offset: Int, $filter: projects_filter) {
		projects_aggregated(filter: $filter) {
			count {
				id
			}
		}
		projects(limit: $limit, offset: $offset, filter: $filter, sort: ["sort", "date_created"]) {
			slug
			project_title
			project_title_short
			location
			grid_image {
				filename_disk
				title
				description
			}
		}
	}
`;
