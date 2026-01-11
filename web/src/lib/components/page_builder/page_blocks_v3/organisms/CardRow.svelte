<script lang="ts" context="module">
	export type CardRowData = {
		change_background_color?: boolean | null;
		section_background_color?: string | null;
		change_breadcrumbs?: boolean | null;
		section_anchor_text?: string | null;
		section_anchor_link?: string | null;
		section_padding_top?: string | null;
		section_padding_bottom?: string | null;
		columns_alignment?: string | null;
		columns?: CardColumnData[] | null;
	}
</script>

<script lang="ts">
	import CardColumn, { type CardColumnData } from "./CardColumn.svelte";
	import type { ProjectData } from "../index.svelte";

	export let data: CardRowData;
	export let projectData: ProjectData;

	let offsetDimensions: (number | string)[];

	let numCols: number = data.columns.length;
</script>

<section
	class={`padding-top-${data.section_padding_top}
			padding-bottom-${data.section_padding_bottom}`}
	style:--columns-alignment={data.columns_alignment}
>
	{#each data.columns as data, i}
		<CardColumn {data} 
					{projectData} 
					columns={{numCols: numCols, currCol: i+1}}
					bind:offsetDimensions 
		/>
	{/each}
</section>

<style lang="scss">
	section {
		grid-column: viewport;
		display: grid;
		grid-template-columns: subgrid;
		align-items: var(--columns-alignment);

		&.padding-top-sm {
			padding-top: var(--SPACE-SM);
		}
		&.padding-bottom-sm {
			padding-bottom: var(--SPACE-SM);
		}
		&.padding-top-md {
			padding-top: var(--SPACE-MD);
		}
		&.padding-bottom-md {
			padding-bottom: var(--SPACE-MD);
		}
		&.padding-top-lg {
			padding-top: var(--SPACE-LG);
		}
		&.padding-bottom-lg {
			padding-bottom: var(--SPACE-LG);
		}
		&.padding-top-xl {
			padding-top: var(--SPACE-XL);
		}
		&.padding-bottom-xl {
			padding-bottom: var(--SPACE-XL);
		}
		&.padding-top-xxl {
			padding-top: var(--SPACE-XXL);
		}
		&.padding-bottom-xxl {
			padding-bottom: var(--SPACE-XXL);
		}
		&.padding-top-xxxl {
			padding-top: var(--SPACE-XXXL);
		}
		&.padding-bottom-xxxl {
			padding-bottom: var(--SPACE-XXXL);
		}
	}
</style>