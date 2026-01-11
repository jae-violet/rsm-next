<script lang="ts" context="module">
	export type PageBlockCtaListWithSliderData = LayoutFields & {
		list_items?: CtaListWithSliderItem[] | null;
		layout?: string | null;
		list_position?: string | null;
	};

	export type CtaListWithSliderItem = {
		linkUrl?: string | null;
		linkText?: string | null;
		image?: ImageAssetRelation | null;
	};
</script>

<script lang="ts">
	import type { LayoutFields } from "../layout_blocks/index.svelte";
	import PageBlockCarousel from "./PageBlockCarousel.svelte";
	import PageBlockCtaList from "./PageBlockCtaList.svelte";
	import type { ImageAssetRelation } from "$lib/cms";

	export let data: PageBlockAccordionWithSliderData;
	export let project: boolean = false;

	export let order: number;

	let order_list: number;
	let order_list_md: number;
	let order_slider: number;
	let order_slider_md: number;

	if (data.list_position === "left") {
		order_list = order - 1;
		order_list_md = order;
		order_slider = order;
		order_slider_md = order - 1;
	} else {
		order_list = order;
		order_list_md = order + 1;
		order_slider = order - 1;
		order_slider_md = order;
	}


	let currentlyHoveredItem: number;
	
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
	<PageBlockCtaList 
		order={order_list} 
		order_md={order_list_md}
		span_columns_md_override={2}
		padding_top_override=true
		anchor_id={data.anchor_id ?? ""}
		bind:currentlyHoveredItem 
		data={{
			span_columns: span_columns_1,
			col_units: col_units,
			col_start: data.list_position === "left" ? 1 : span_columns_2 + 1,
			padding_right: data.list_position === "left" ? "lg" : "none",
			span_rows: 1,
			padding_top: data.padding_top ?? "xl",
			items: data.list_items
		}} 
		{project} 
	/>
	<PageBlockCarousel 
		order={order_slider} 
		order_md={order_slider_md}
		span_columns_md_override={2}
		bind:current={currentlyHoveredItem} 
		data={{
			span_columns: span_columns_2,
			col_units: col_units,
			col_start: data.list_position === "left" ? span_columns_1 + 1 : 1,
			padding_right: data.list_position === "left" ? "none" : "lg",
			span_rows: 1,
			padding_top: data.padding_top ?? "xl",
			images: data.list_items?.map(item => ({ directus_files_id: item.image })),
			show_arrows: true,
			show_indexes: true,
			animation: null,
			animation_duration_ms: 200
		}} 
		{project} 
	/>
</template>

<style lang="scss">
	
</style>
