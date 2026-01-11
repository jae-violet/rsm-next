<script lang="ts" context="module">
	export type PageBlockAccordionData = LayoutFields & {
		items?: AccordionItem[] | null;
		first_item_open?: boolean | null;
		one_at_a_time?: boolean | null;
	};

	export type AccordionItem = {
		heading?: string | null;
		rich_text?: string | null;
		cta_text?: string | null;
		cta_link?: string | null;
		element?: Details;
	};
</script>

<script lang="ts">
	import Details from "$lib/components/Details.svelte";
	import Section from "$lib/components/Section.svelte";
	import { sineInOut } from "svelte/easing";
	import type { LayoutFields } from "../layout_blocks/index.svelte";
	import { animate, fadeMoveScroll } from "$lib/animate";

	export let data: PageBlockAccordionData;
	export let order: number;
	export let order_md: number | null;
	export let project: boolean = false;
	export let span_columns_md_override: number | null;
	export let padding_top_override: boolean = false;

	export let openIndex = 0;

	let openSetting = data.first_item_open ? true : false;

	function onToggle(toggleIndex: number, isOpen: boolean) {
		if (!data.one_at_a_time) return;

		if (isOpen) {
			openIndex = toggleIndex;
		}
	}

</script>

<Section
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
	{#each data.items ?? [] as item, i}
		<Details
			summary={item.heading ?? ""}
			defaultOpen={i === 0 ? openSetting : false}
			on:toggle={({ detail }) => onToggle(i, detail)}
			bind:this={item.element}
		>
			{@html item.rich_text}
		</Details>
	{/each}
</Section>

<style lang="scss">
</style>
