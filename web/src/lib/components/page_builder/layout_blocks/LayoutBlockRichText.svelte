<script lang="ts" context="module">
	import type { LayoutFields } from "./index.svelte";

	export type LayoutBlockRichTextData = LayoutFields & {
		content?: string | null
	};
</script>

<script lang="ts">
	import Section from "$lib/components/Section.svelte";
	export let data: LayoutBlockRichTextData;
	export let order: number;
</script>

<Section 
	richText
	order={order}
	span_columns={data.span_columns}
	col_units={data.col_units}
	col_start={data.col_start}
	span_rows={data.span_rows}
>
	<article class="rich-text">
		{@html data.content}
	</article>
</Section>

<style lang="scss">
	.rich-text {
		display: contents;
	}
</style>