<script lang="ts" context="module">
    export type PageBlockCtaListData = LayoutFields & {
				heading?: string | null;
        items?: { linkUrl: string, linkText: string }[] | null;
    };
</script>

<script lang="ts">
	import DottedArrow from "$lib/components/DottedArrow.svelte";
	import DottedArrowHover from "$lib/components/DottedArrowHover.svelte";
	import Section from "$lib/components/Section.svelte";
	import type { LayoutFields } from "../layout_blocks/index.svelte";
	import { animate, fadeMoveScroll } from "$lib/animate";

    export let data: PageBlockCtaListData;
	export let order: number;
	export let order_md: number | null;
	export let project: boolean = false;
	export let span_columns_md_override: number | null;
	export let padding_top_override: boolean = false;

    export let currentlyHoveredItem: number = 0;
</script>

<Section 
	cta
	project={project}
	order={order}
	order_md={order_md}
	span_columns={data.span_columns ?? 1}
	span_columns_md_override={span_columns_md_override}
	col_units={data.col_units ?? "whole"}
	col_start={data.col_start ?? 1}
	padding_left={data.padding_left ?? "none"}
	padding_right={data.padding_right ?? "none"}
	span_rows={data.span_rows ?? 1}
	padding_top={data.padding_top ?? "default"}
	padding_top_override={padding_top_override}
	anchor_id={data.anchor_id ?? ""}
>
		{#if data.heading}
				<h2 class="xxxl fadeMove ctaList__heading">{data.heading}</h2>
		{/if}
    {#each data.items ?? [] as item, i}
        <DottedArrowHover
            href={item.linkUrl}
            bottom_aligned
            list_item
            animFadeMoveScroll
            on:mouseenter={() => currentlyHoveredItem = i}
        >
            <p>{item.linkText}</p>
            <DottedArrow />
        </DottedArrowHover>
    {/each}
</Section>

<style lang="scss">
		.ctaList__heading {
			padding-top: var(--SPACE-MD);
			margin-bottom: var(--GRID-CELL);
		}
    p {
    	white-space: pre-line;
    }
</style>