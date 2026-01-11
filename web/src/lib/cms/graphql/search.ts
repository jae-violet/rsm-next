import { gql } from "graphql-request";

export const searchQuery = gql`
	query Search($query: String!) {
		projects(
			filter: {
				_and: [
					{ visibility: { _nin: ["draft", "archived"] } },
					{
						_or: [
							{ project_title: { _icontains: $query } }
							{ project_description: { _icontains: $query } }
							{ services: { services_id: { name: { _icontains: $query } } } }
							{ markets: { markets_id: { name: { _icontains: $query } } } }
							{ hidden_markets: { markets_id: { name: { _icontains: $query } } } }
							{ hidden_services: { services_id: { name: { _icontains: $query } } } }
							{ location: { _icontains: $query } }
							{ collaborators: { _icontains: $query } }
							{ page_content: {
								item__page_block_rich_text: {
									content: { _icontains: $query }
								}
							}}
							{ project_keywords: { _icontains: $query } }
						]
					}
				]
			}
		) {
			slug
			project_title
			project_opening_date
			grid_image {
				filename_disk
				description
			}
		}

		markets(
			filter: {
				_and: [
					{ visibility: { _nin: ["draft", "archived"] } },
					{
						_or: [
							{ name: { _icontains: $query } }
							{ overview: { _icontains: $query } }
							{ seo_page_description: { _icontains: $query } }
						]
					}
				]
			}
		) {
			slug
			name
			grid_image {
				filename_disk
				description
			}
		}

		services(
			filter: {
				_and: [
					{ visibility: { _nin: ["draft", "archived"] } },
					{
						_or: [
							{ name: { _icontains: $query } }
							{ overview: { _icontains: $query } }
							{ seo_page_description: { _icontains: $query } }
						]
					}
				]
			}
		) {
			slug
			name
			grid_image {
				filename_disk
				description
			}
		}

		studio_locations(
			filter: {
				_and: [
					{ visibility: { _nin: ["draft", "archived"] } },
					{
						_or: [
							{ search_name: { _icontains: $query } }
							{ address: { _icontains: $query } }
							{ overview: { _icontains: $query } }
							{ seo_page_description: { _icontains: $query } }
						]
					}
				]
			}
		) {
			slug
			search_name
			grid_image {
				filename_disk
				description
			}
		}

		geographical_regions(
			filter: {
				_and: [
					{ visibility: { _nin: ["draft", "archived"] } },
					{
						_or: [
							{ search_name: { _icontains: $query } }
							{ overview: { _icontains: $query } }
							{ seo_page_description: { _icontains: $query } }
						]
					}
				]
			}
		) {
			slug
			search_name
			grid_image {
				filename_disk
				description
			}
		}

		news_posts(
			filter: {
				_and: [
					{ visibility: { _nin: ["draft", "archived"] } },
					{
						_or: [
							{ post_title: { _icontains: $query } }
							{ seo_page_description: { _icontains: $query } }
							{ topics: { news_topics_id: { name: { _icontains: $query } } } }
						]
					}
				]
			}
		) {
			slug
			post_title
			published_date
			grid_image {
				filename_disk
				description
			}
		}

		team(
			filter: {
				_and: [
					{ visibility: { _nin: ["draft", "archived"] } },
					{ has_profile_page: { _eq: true } },
					{
						_or: [
							{ name: { _icontains: $query } }
							{ seo_page_description: { _icontains: $query } }
							{ full_title: { _icontains: $query } }
							{ short_title: { _icontains: $query } }
							{ bio: { _icontains: $query } }
						]
					}
				]
			}
		) {
			slug
			name
			headshot {
				filename_disk
				description
			}
		}
	}
`;
