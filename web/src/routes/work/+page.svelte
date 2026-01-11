<script lang="ts">
	import ProjectsGrid, {
		ProjectsGridType,
		ProjectsLoadFunctionality,
		setProjectGridContext
	} from "$lib/components/ProjectsGrid.svelte";
	import SeoHead from "$lib/components/SeoHead.svelte";
	import type { PageData } from "./$types";
	import PageBlocksV3 from "$lib/components/page_builder/page_blocks_v3/index.svelte";

	export let data: PageData;

	const usePageBlocksV3: boolean = false;

	setProjectGridContext({
		projects: data.projects,
		totalProjectsCount: data.totalProjectsCount,
		filter: { visibility: { _eq: "visible" } },
		filters: data.filters
	});
</script>

<SeoHead
	title="Experiential & Wayfinding Design Work"
	description="Working at the intersection of graphics and architecture, we provide branding, experiential, and wayfinding signage design in all markets."
/>

<template>
	{#if usePageBlocksV3}
		{#if data.page_blocks_v3}
			<!--<PageBlocksV3 blocks={data.page_blocks_v3} />-->
		{:else}
			<div class="container">Page Blocks v3 selected, but no blocks added.</div>
		{/if}
	{:else}
		<div class="container">
			<section class="projects-grid-container">
				<ProjectsGrid
					data={{
						grid_type: ProjectsGridType.Dynamic,
						load_functionality: ProjectsLoadFunctionality.InfiniteScroll,
						num_projects: data.projectsLimit,
						show_filters: true
					}}
				/>
			</section>
		</div>
	{/if}
</template>

<style lang="scss">
	.container {
		margin-top: calc(var(--HEADER-HEIGHT) + var(--GRID-CELL));
	}
	section.projects-grid-container {
		position: relative;
		grid-column: whole;
	}
</style>
