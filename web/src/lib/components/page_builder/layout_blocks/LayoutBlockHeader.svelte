<script lang="ts" context="module">
	import type { LayoutFields } from "./index.svelte";

	export type LayoutBlockHeaderData = LayoutFields & {
		type?: string | null;
		small_heading?: string | null;
		large_heading?: string | null;
        primary_heading?: string | null;
	};
</script>

<script lang="ts">
	import { animate, fadeMoveScroll } from "$lib/animate";
	import Section from "$lib/components/Section.svelte";
    export let data: LayoutBlockHeaderData;
    export let order: number;
</script>

<Section 
	header
	order={order}
	span_columns={data.span_columns}
	col_units={data.col_units}
	col_start={data.col_start}
	span_rows={data.span_rows}
>
	{#if data.type === "page"}
		{#if data.primary_heading === "large"}
			{#if data.small_heading}
				<h2 class="md" use:animate={fadeMoveScroll}>{data.small_heading}</h2>
			{/if}
			{#if data.large_heading}
				<h1 class="xxxl" use:animate={fadeMoveScroll}>{data.large_heading}</h1>
			{/if}
		{:else}
			{#if data.small_heading}
				<h1 class="md" use:animate={fadeMoveScroll}>{data.small_heading}</h1>
			{/if}
			{#if data.large_heading}
				<h2 class="xxxl" use:animate={fadeMoveScroll}>{data.large_heading}</h2>
			{/if}
		{/if}
	{:else}
		{#if data.primary_heading === "large"}
			{#if data.small_heading}
				<h3 class="md" use:animate={fadeMoveScroll}>{data.small_heading}</h3>
			{/if}
			{#if data.large_heading}
				<h2 class="xxxl" use:animate={fadeMoveScroll}>{data.large_heading}</h2>
			{/if}
		{:else}
			{#if data.small_heading}
				<h2 class="md" use:animate={fadeMoveScroll}>{data.small_heading}</h2>
			{/if}
			{#if data.large_heading}
				<h3 class="xxxl" use:animate={fadeMoveScroll}>{data.large_heading}</h3>
			{/if}
		{/if}
	{/if}
</Section>

<style lang="scss">
	.xxxl {
		white-space: pre-line;
	}
	.md {
		color: var(--COLOR-MID-GRAY);
	}
</style>