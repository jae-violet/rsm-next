<script lang="ts" context="module">
	export enum EntryType {
		Project = "Project",
		Article = "Article"
	}
</script>

<script lang="ts">
	import Section from "./Section.svelte";
	import DottedArrow from "./DottedArrow.svelte";
	import DottedArrowHover from "./DottedArrowHover.svelte";
	import { cmsClient } from "$lib/cms";
	import { afterNavigate } from "$app/navigation";
	import {
		getNewsFiltersFromUrl,
		getProjectFiltersFromUrl,
		makeGraphqlNewsFilters,
		makeGraphqlProjectFilters,
		makeNewsFilterUrlParams,
		makeProjectFilterUrlParams
	} from "$lib/cms/filters";
	import { page } from "$app/stores";

	export let project: boolean = false;
	export let entryType: EntryType;
	export let currentSlug: string;

	let loaded: boolean;
	let nextSlug: string;
	let nextTitle: string;

	let serviceFilterSlugs: Set<string> = new Set();
	let marketFilterSlugs: Set<string> = new Set();
	let topicFilterSlugs: Set<string> = new Set();

	function makeUrlParams(): string {
		if (entryType === EntryType.Project) {
			return makeProjectFilterUrlParams(serviceFilterSlugs, marketFilterSlugs);
		} else if (entryType === EntryType.Article) {
			return makeNewsFilterUrlParams(topicFilterSlugs);
		} else {
			throw new Error(`Invalid entryType: ${entryType}`);
		}
	}

	function makeNextUrl(): string {
		if (entryType === EntryType.Project) {
			return `/work/${nextSlug}${makeUrlParams()}`;
		} else if (entryType === EntryType.Article) {
			return `/news/${nextSlug}${makeUrlParams()}`;
		} else {
			throw new Error(`Invalid entryType: ${entryType}`);
		}
	}

	afterNavigate(async () => {
		loaded = false;

		if (entryType === EntryType.Project) {
			let urlProjectFilters = getProjectFiltersFromUrl($page.url.searchParams);
			serviceFilterSlugs = urlProjectFilters.serviceFilterSlugs;
			marketFilterSlugs = urlProjectFilters.marketFilterSlugs;

			const projectsRes = await cmsClient.NextProject({
				filter: makeGraphqlProjectFilters(serviceFilterSlugs, marketFilterSlugs)
			});

			const currentProjectIndex = projectsRes.projects.findIndex(
				(project) => project.slug === currentSlug
			);
			let nextProject;
			if (currentProjectIndex < projectsRes.projects.length - 1) {
				nextProject = projectsRes.projects[currentProjectIndex + 1];
			} else {
				// wrap around to the first project
				nextProject = projectsRes.projects[0];
			}

			nextSlug = nextProject.slug ?? "";
			nextTitle = nextProject.project_title ?? "";
		} else if (entryType === EntryType.Article) {
			let urlNewsFilters = getNewsFiltersFromUrl($page.url.searchParams);
			topicFilterSlugs = urlNewsFilters.topicFilterSlugs;

			const newsRes = await cmsClient.News({ filter: makeGraphqlNewsFilters(topicFilterSlugs) });

			const currentArticleIndex = newsRes.news_posts.findIndex(
				(article) => article.slug === currentSlug
			);
			let nextArticle;
			if (currentArticleIndex < newsRes.news_posts.length - 1) {
				nextArticle = newsRes.news_posts[currentArticleIndex + 1];
			} else {
				// wrap around to the first article
				nextArticle = newsRes.news_posts[0];
			}

			nextSlug = nextArticle.slug ?? "";
			nextTitle = nextArticle.post_title ?? "";
		}

		loaded = true;
	});
</script>

<Section 
	project={project}
	nextEntry
	span_columns=1
	col_units="whole"
	col_start=1
	span_rows=1
>
	<h3 class="caps">Next {entryType}</h3>
	{#if loaded}
		<DottedArrowHover href={makeNextUrl()}>
			<h4 class="xxxl">{nextTitle}</h4>
			<p>View {entryType} <DottedArrow /></p>
		</DottedArrowHover>
	{:else}
		<h4 class="xxxl">Loading next {entryType.toLowerCase()}…</h4>
	{/if}
</Section>

<style lang="scss">
	h3 {
		font-size: var(--FONT-SIZE-MD);
		font-weight: 400;
		line-height: 1;
		margin-bottom: 0.667em;
	}
	.next-project-link {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
