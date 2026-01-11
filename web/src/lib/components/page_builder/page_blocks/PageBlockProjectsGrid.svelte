<script lang="ts" context="module">
	import type { ProjectsGridData } from "$lib/components/ProjectsGrid.svelte";
	import type { LayoutFields } from "./index.svelte";

    export type PageBlockProjectsGridData = LayoutFields & ProjectsGridData;
</script>

<script lang="ts">
	import Section from "$lib/components/Section.svelte";
	import ProjectsGrid from "$lib/components/ProjectsGrid.svelte";

    export let data: PageBlockProjectsGridData;
    export let order: number;
    export let project: boolean = false;
</script>

<Section 
	project={project}
	projectsGrid
	order={order}
	span_columns={data.span_columns ?? 1}
	col_units={data.col_units ?? "whole"}
	col_start={data.col_start ?? 1}
    padding_left={data.padding_left ?? "none"}
    padding_right={data.padding_right ?? "none"}
	span_rows={data.span_rows ?? 1}
	padding_top={data.padding_top ?? "default"}
	anchor_id={data.anchor_id ?? ""}
>
	<ProjectsGrid {data} />
</Section>

<style lang="scss">
	
</style>