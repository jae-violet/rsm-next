<script lang="ts" context="module">
	import type { ProjectsGridData } from "$lib/components/ProjectsGrid.svelte";
	import type { LayoutFields } from "./index.svelte";

    export type LayoutBlockProjectsGridData = LayoutFields & ProjectsGridData;
</script>

<script lang="ts">
	import Section from "$lib/components/Section.svelte";
	import ProjectsGrid from "$lib/components/ProjectsGrid.svelte";

    export let data: LayoutBlockProjectsGridData;
    export let order: number;
</script>

<Section 
	projectsGrid
	order={order}
	span_columns={data.span_columns}
	col_units={data.col_units}
	col_start={data.col_start}
	span_rows={data.span_rows}
>
	<ProjectsGrid {data} />
</Section>

<style lang="scss">
	
</style>