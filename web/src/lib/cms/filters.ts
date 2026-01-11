import type {
	News_Posts_Filter,
	News_Topics_Filter,
	Projects_Filter
} from "$lib/__generated__/graphql";

export function getProjectFiltersFromUrl(searchParams: URLSearchParams) {
	let serviceFilterSlugs = new Set<string>();
	let marketFilterSlugs = new Set<string>();

	let urlServiceFilterSlugs = searchParams.get("serviceFilter")?.split(".");
	let urlMarketFilterSlugs = searchParams.get("marketFilter")?.split(".");

	if (urlServiceFilterSlugs) {
		serviceFilterSlugs = new Set(urlServiceFilterSlugs);
	}
	if (urlMarketFilterSlugs) {
		marketFilterSlugs = new Set(urlMarketFilterSlugs);
	}

	return {
		serviceFilterSlugs,
		marketFilterSlugs,
		hasUrlFilter: urlServiceFilterSlugs || urlMarketFilterSlugs
	};
}

export function getNewsFiltersFromUrl(searchParams: URLSearchParams) {
	let topicFilterSlugs = new Set<string>();

	let urlTopicFilterSlugs = searchParams.get("topicFilter")?.split(".");

	if (urlTopicFilterSlugs) {
		topicFilterSlugs = new Set(urlTopicFilterSlugs);
	}

	return { topicFilterSlugs, hasUrlFilter: !!urlTopicFilterSlugs };
}

export function makeProjectFilterUrlParams(
	serviceFilterSlugs: Set<string>,
	marketFilterSlugs: Set<string>,
	initialParams?: URLSearchParams
): string {
	const searchParams = new URLSearchParams(initialParams);
	if (serviceFilterSlugs.size > 0) {
		searchParams.set("serviceFilter", Array.from(serviceFilterSlugs).join("."));
	} else {
		searchParams.delete("serviceFilter");
	}
	if (marketFilterSlugs.size > 0) {
		searchParams.set("marketFilter", Array.from(marketFilterSlugs).join("."));
	} else {
		searchParams.delete("marketFilter");
	}
	let search = searchParams.toString();
	if (search.length > 0) {
		return "?" + searchParams.toString();
	} else {
		return "";
	}
}

export function makeNewsFilterUrlParams(
	topicFilterSlugs: Set<string>,
	initialParams?: URLSearchParams
): string {
	const searchParams = new URLSearchParams(initialParams);
	if (topicFilterSlugs.size > 0) {
		searchParams.set("topicFilter", Array.from(topicFilterSlugs).join("."));
	} else {
		searchParams.delete("topicFilter");
	}
	let search = searchParams.toString();
	if (search.length > 0) {
		return "?" + searchParams.toString();
	} else {
		return "";
	}
}

/**
 * Converts lists of service and market slugs into a single "OR" filter object.
 *
 * Used for graphql queries.
 */
export function makeGraphqlProjectFilters(
	serviceFilterSlugs: string[] | Set<string>,
	marketFilterSlugs: string[] | Set<string>,
	searchText: string = ""
): Projects_Filter {
	const serviceFilters: Projects_Filter[] = Array.from(serviceFilterSlugs).map((slug) => ({
		services: {
			services_id: {
				slug: { _eq: slug }
			}
		}
	}));
	const marketFilters: Projects_Filter[] = Array.from(marketFilterSlugs).map((slug) => ({
		markets: {
			markets_id: {
				slug: { _eq: slug }
			}
		}
	}));
	const searchFilter: Projects_Filter = searchText
		? {
				_or: [
					{
						project_title: { _icontains: searchText }
					},
					{ project_description: { _icontains: searchText } },
					// TODO: Figure out why this causes search to fail
					//{ project_body: { _icontains: searchText } },
					{
						services: {
							services_id: {
								name: { _icontains: searchText }
							}
						}
					},
					{
						markets: {
							markets_id: {
								name: { _icontains: searchText }
							}
						}
					},
					{
						studio_locations: {
							studio_locations_id: {
								search_name: { _icontains: searchText }
							}
						}
					},
					{ location: { _icontains: searchText } }
				]
		  }
		: {};
	return {
		_and: [searchFilter, { _or: [...serviceFilters, ...marketFilters] }]
	};
}

export function makeGraphqlNewsFilters(
	topicFilterSlugs: string[] | Set<string>
): News_Posts_Filter {
	const topicFilters: News_Posts_Filter[] = Array.from(topicFilterSlugs).map((slug) => ({
		topics: {
			news_topics_id: {
				slug: { _eq: slug }
			}
		}
	}));
	return { _or: topicFilters };
}
