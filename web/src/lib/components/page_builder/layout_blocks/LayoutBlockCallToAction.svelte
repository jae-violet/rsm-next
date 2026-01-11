<script lang="ts" context="module">
	import type { LayoutFields } from "./index.svelte";

	export type LayoutBlockCallToActionData = LayoutFields & {
		heading?: string | null;
        cta_text?: string | null;
		cta_link?: string | null;
	};
</script>

<script lang="ts">
	import Section from "$lib/components/Section.svelte";
	import DottedArrow from "$lib/components/DottedArrow.svelte";
	import DottedArrowHover from "$lib/components/DottedArrowHover.svelte";
	export let data: LayoutBlockCallToActionData;
	export let order: number;
</script>

<Section 
	cta
	order={order}
	span_columns={data.span_columns}
	col_units={data.col_units}
	col_start={data.col_start}
	span_rows={data.span_rows}
>
	<DottedArrowHover
		text_alignment="right"
		href={data.cta_link}
	>
		{#if data.heading}
			<h4 class="xxxl heading">{data.heading}</h4>
		{/if}
		<p>{data.cta_text} <DottedArrow /></p>
	</DottedArrowHover>
</Section>

<style lang="scss">
	
</style>