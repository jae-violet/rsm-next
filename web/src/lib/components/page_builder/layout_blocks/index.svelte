<script lang="ts" context="module">
	import type { LayoutBlockCallToActionData } from "./LayoutBlockCallToAction.svelte";
	import type { LayoutBlockFeaturedPageData } from "./LayoutBlockFeaturedPage.svelte";
	import type { LayoutBlockHeaderData } from "./LayoutBlockHeader.svelte";
	import type { LayoutBlockImagesData } from "./LayoutBlockImages.svelte";
	import type { LayoutBlockListData } from "./LayoutBlockList.svelte";
	import type { LayoutBlockRichTextData } from "./LayoutBlockRichText.svelte";
	import type { LayoutBlockProjectsGridData } from "./LayoutBlockProjectsGrid.svelte";
	import type { LayoutBlockVideoData } from "./LayoutBlockVideo.svelte";

	export type LayoutFields = {
		span_columns?: number | null;
		col_units?: string | null;
		col_start?: number | null;
		span_rows?: number | null;
		padding_left?: string | null;
		padding_right?: string | null;
	};

	export type LayoutBlock =
		| ({ __typename: "layout_block_header" } & LayoutBlockHeaderData)
		| ({ __typename: "layout_block_rich_text" } & LayoutBlockRichTextData)
		| ({ __typename: "layout_block_cta" } & LayoutBlockCallToActionData)
		| ({ __typename: "layout_block_list" } & LayoutBlockListData)
		| ({ __typename: "layout_block_images" } & LayoutBlockImagesData)
		| ({ __typename: "layout_block_featured_page" } & LayoutBlockFeaturedPageData)
		| ({ __typename: "layout_block_projects_grid" } & LayoutBlockProjectsGridData)
		| ({ __typename: "layout_block_video" } & LayoutBlockVideoData);
</script>

<script lang="ts">
	import LayoutBlockRichText from "./LayoutBlockRichText.svelte";
	import LayoutBlockHeader from "./LayoutBlockHeader.svelte";
	import LayoutBlockCallToAction from "./LayoutBlockCallToAction.svelte";
	import LayoutBlockList from "./LayoutBlockList.svelte";
	import LayoutBlockFeaturedPage from "./LayoutBlockFeaturedPage.svelte";
	import LayoutBlockImages from "./LayoutBlockImages.svelte";
	import LayoutBlockProjectsGrid from "./LayoutBlockProjectsGrid.svelte";
	import LayoutBlockVideo from "./LayoutBlockVideo.svelte";

	export let content: ({ item?: LayoutBlock | null } | null | undefined)[] | null | undefined;
</script>

<div class="container">
	{#each content?.map((c) => c?.item) ?? [] as block, i}
		{#if block?.__typename === "layout_block_header"}
			<LayoutBlockHeader data={block} order={(i + 1) * 2} />
		{:else if block?.__typename === "layout_block_rich_text"}
			<LayoutBlockRichText data={block} order={(i + 1) * 2} />
		{:else if block?.__typename === "layout_block_cta"}
			<LayoutBlockCallToAction data={block} order={(i + 1) * 2} />
		{:else if block?.__typename === "layout_block_list"}
			<LayoutBlockList data={block} order={(i + 1) * 2} />
		{:else if block?.__typename === "layout_block_images"}
			<LayoutBlockImages data={block} order={(i + 1) * 2} />
		{:else if block?.__typename === "layout_block_featured_page"}
			<LayoutBlockFeaturedPage data={block} order={(i + 1) * 2} />
		{:else if block?.__typename === "layout_block_projects_grid"}
			<LayoutBlockProjectsGrid data={block} order={(i + 1) * 2} />
		{:else if block?.__typename === "layout_block_video"}
			<LayoutBlockVideo data={block} order={(i + 1) * 2} />
		{/if}
	{/each}
</div>

<style lang="scss">
	div.container {
		margin-bottom: var(--GRID-CELL);
		:first-child {
			margin-top: var(--HEADER-HEIGHT);
		}
	}

	:global {
		section.featuredPage {
			margin-top: calc(var(--GRID-CELL) * 2);
		}
	}
</style>