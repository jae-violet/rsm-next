import { gql } from "graphql-request";
import type { PageServerLoad } from "./$types";
import { cmsClient } from "$lib/cms";
import { error } from "@sveltejs/kit";

export const _query = gql`
	query Service($slug: String!) {
		services(filter: { slug: { _eq: $slug }, visibility: { _neq: "archived" } }) {
			slug
			visibility
			name
			short_name
			medium_name
			view_more_name
			overview
			hero_images {
				directus_files_id {
					filename_disk
					title
					description
				}
			}
			grid_image {
				filename_disk
				title
				description
			}
			seo_page_description
			sub_services
			team_leaders {
				team_id {
					full_title
					short_title
					slug
					name
				}
			}
			featured_projects {
				projects_id {
					slug
					project_title
					location
					grid_image {
						filename_disk
						title
						description
					}
				}
			}
			related_articles {
				news_posts_id {
					slug
					post_title
					grid_image {
						filename_disk
						title
						description
					}
					published_date
					article_preview
					topics {
						news_topics_id {
							name
						}
					}
				}
			}
			use_page_blocks
			page_content {
				item {
					__typename
					... on page_block_accordion {
						span_columns
						col_units
						col_start
						padding_left
						padding_right
						span_rows
						padding_top
						anchor_id
						first_item_open
						one_at_a_time
						items
					}
					... on page_block_accordion_with_slider {
						padding_top
						anchor_id
						layout
						accordion_position
						slider_items {
							heading
							rich_text
							cta_text
							cta_link
							image {
								filename_disk
								title
								description
							}
						}
					}
					... on page_block_before_after_swiper {
						span_columns
						col_units
						col_start
						padding_left
						padding_right
						span_rows
						padding_top
						anchor_id
						images {
							directus_files_id {
								filename_disk
								title
								description
							}
						}
						swiper_start_position
					}
					... on page_block_blockquote {
						span_columns
						col_units
						col_start
						padding_left
						padding_right
						span_rows
						padding_top
						anchor_id
						attribution
						body
						citation
						font_size
					}
					... on page_block_cards {
						span_columns
						col_units
						col_start
						padding_left
						padding_right
						span_rows
						padding_top
						anchor_id
						cards_per_row
						row_divider_color
						card_padding_horizontal
						card_padding_vertical
						callout_size
						text_size
						text_padding
						text_alignment
						image_mask
						image_padding
						image_hover_effect
						cta_alignment
						card_items {
							image {
								filename_disk
								title
								description
							}
							callout
							callout_size_override
							rich_text
							cta_text
							cta_link
							cta_alignment_override
						}
					}
					... on page_block_carousel {
						id
						span_columns
						col_units
						col_start
						padding_left
						padding_right
						span_rows
						padding_top
						anchor_id
						images_per_slide
						animation
						animation_duration_ms
						autoplay
						autoplay_interval
						show_indexes
						show_arrows
						images {
							directus_files_id {
								filename_disk
								title
								description
							}
						}
					}
					... on page_block_cta {
						span_columns
						col_units
						col_start
						padding_left
						padding_right
						span_rows
						padding_top
						anchor_id
						heading_size
						heading
						text_size
						text_alignment
						link
						text
					}
					... on page_block_cta_list {
						span_columns
						col_units
						col_start
						padding_left
						padding_right
						span_rows
						padding_top
						anchor_id
						items
					}
					... on page_block_cta_list_with_slider {
						padding_top
						anchor_id
						layout
						list_position
						list_items {
							linkUrl
							linkText
							image {
								filename_disk
								title
								description
							}
						}
					}
					... on page_block_featured_page {
						span_columns
						col_units
						col_start
						span_rows
						padding_top
						anchor_id
						media_position
						background_image {
							filename_disk
							title
							description
						}
						background_image_mobile {
							filename_disk
							title
							description
						}
						youtube_id
						vimeo_id
						small_subheading
						large_primary_heading
						rich_text
						cta_text
						cta_link
						heading_only
						white_text
					}
					... on page_block_heading {
						span_columns
						col_units
						col_start
						padding_left
						padding_right
						span_rows
						row_alignment
						padding_top
						anchor_id
						type
						primary_heading
						small_heading
						large_heading
						superscript_text
					}
					... on page_block_image_row {
						span_columns
						col_units
						col_start
						padding_left
						padding_right
						span_rows
						padding_top
						anchor_id
						layout
						caption
						images {
							directus_files_id {
								title
								description
								filename_disk
							}
						}
						emptyColumn
						fullBleedColumns
					}
					... on page_block_list {
						span_columns
						col_units
						col_start
						padding_left
						padding_right
						span_rows
						padding_top
						anchor_id
						link_hover_effect
						heading_size
						text_size
						text_alignment
						section_heading
						items
						list_columns
						view_more_text
						view_more_link
					}
					... on page_block_projects_grid {
						padding_top
						anchor_id
						num_projects
						load_functionality
						grid_type
						show_filters
					}
					... on page_block_rich_text {
						span_columns
						col_units
						col_start
						padding_left
						padding_right
						span_rows
						padding_top
						anchor_id
						text_size
						content
					}
					... on page_block_spacer {
						id
					}
					... on page_block_video {
						span_columns
						col_units
						col_start
						padding_left
						padding_right
						span_rows
						padding_top
						anchor_id
						vimeo_id
						youtube_id
						native_video {
							id
							title
							type
							filename_disk
						}
						enable_autoplay
						enable_looping
						enable_controls
					}
					... on page_block_testimonial_carousel {
						heading
						testimonials {
							item {
								...on testimonials {
									quote_attribution
									quote_attribution_job_title
									company_name
									quote
									banner_image {
										title
										description
										filename_disk
									}
									associated_project {
										slug
										project_title
										location
									}
								}
							}
						}
					}
					... on page_block_advanced_project_grid {
						heading
						heading_size
						cta_text
						cta_link
						projects_per_row
						limit_posts_to
						grid_style
						filter_projects
						results_logic
						market_filters {
							markets_id {
								name
							}
						}
						service_filters {
							services_id {
								name
							}
						}
					}
				}
			}
		}
	}
`;

export const load: PageServerLoad = async ({ params }) => {
	const res = await cmsClient.Service({ slug: params.slug });

	if (res.services.length === 0) {
		throw error(404);
	}

	const featuredProjects =
		res.services[0].featured_projects?.map((p) => p?.projects_id ?? {}) ?? [];

	const projectsLimit = 9;
	const projectsFilter = {
		slug: {
			// filter out featured projects so they don't show up twice
			_nin: featuredProjects.length > 0 ? featuredProjects.map((p) => p.slug ?? "") : [""]
		},
		visibility: { _in: ["visible", "visibleExceptWorkPage"] },
		services: {
			services_id: {
				slug: { _eq: params.slug }
			}
		}
	};
	const projectsRes = await cmsClient.Projects({
		limit: projectsLimit,
		filter: projectsFilter
	});

	return {
		service: res.services[0],
		featuredProjects,
		projects: projectsRes.projects,
		totalProjectsCount: projectsRes.projects_aggregated?.[0].count?.id ?? 0,
		projectsLimit,
		projectsFilter
	};
};
