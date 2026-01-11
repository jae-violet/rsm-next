<script lang="ts" context="module">
	export type PageBlockAccordionWithSliderData = LayoutFields & {
		slider_items?: AccordionWithSliderItem[] | null;
		layout?: string | null;
		accordion_position?: string | null;
	};

	export type AccordionWithSliderItem = {
		heading?: string | null;
		rich_text?: string | null;
		cta_text?: string | null;
		cta_link?: string | null;
		image: ImageAssetRelation | null;
		element?: Details;
	};
</script>

<script lang="ts">
	import type { LayoutFields } from "../layout_blocks/index.svelte";
	import PageBlockCarousel from "./PageBlockCarousel.svelte";
	import PageBlockAccordion from "./PageBlockAccordion.svelte";
	import type { ImageAssetRelation } from "$lib/cms";

	export let data: PageBlockAccordionWithSliderData;
	export let project: boolean = false;

	export let order: number;

	let order_accordion: number;
	let order_accordion_md: number;
	let order_slider: number;
	let order_slider_md: number;

	if (data.accordion_position == "left") {
		order_accordion = order - 1;
		order_accordion_md = order;
		order_slider = order;
		order_slider_md = order - 1;
	} else {
		order_accordion = order;
		order_accordion_md = order;
		order_slider = order - 1;
		order_slider_md = order - 1;
	}


	let openIndex: number;
	
	let col_units = "half";
	let span_columns_1 = 1;
	let span_columns_2 = 1;

	if (data.layout === "oneToTwo") {
		col_units = "third";
		span_columns_2 = 2;
	} else if (data.layout === "twoToOne") {
		col_units = "third";
		span_columns_1 = 2;
	}
</script>

<template>
	<PageBlockAccordion 
		order={order_accordion} 
		order_md={order_accordion_md}
		span_columns_md_override=2 
		padding_top_override=true
		anchor_id={data.anchor_id ?? ""}
		bind:openIndex 
		data={{
			span_columns: span_columns_1,
			col_units: col_units,
			col_start: 1,
			padding_right: "lg",
			span_rows: 1,
			padding_top: data.padding_top ?? "xl",
			first_item_open: true,
			one_at_a_time: true,
			items: data.slider_items
		}} 
		{project} 
	/>
	<PageBlockCarousel 
		order={order_slider} 
		order_md={order_slider_md} 
		bind:current={openIndex} 
		data={{
			span_columns: span_columns_2,
			col_units: col_units,
			col_start: span_columns_1 + 1,
			span_rows: 1,
			padding_top: data.padding_top ?? "xl",
			images: data.slider_items?.map(item => ({ directus_files_id: item.image })),
			show_arrows: true,
			show_indexes: true,
			animation: "fade",
			animation_duration_ms: 200
		}} 
		{project} 
	/>
</template>

<style lang="scss">
</style>
