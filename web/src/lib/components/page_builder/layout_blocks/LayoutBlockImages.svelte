<script lang="ts" context="module">
	import type { ImageAsset } from "$lib/cms";
	import type { LayoutFields } from "./index.svelte";

	export type LayoutBlockImagesData = LayoutFields & {
		show_controls?: boolean | null;
		images?: ({
			image?: ImageAsset;
			rich_text? : string | null;
		} | null)[] | null;
	};
</script>

<script lang="ts">
	import { assetUrl } from "$lib/cms/assets";
	import Section from "$lib/components/Section.svelte";
	import Slideshow from "$lib/components/Slideshow.svelte";
	import { fade } from "svelte/transition";
	export let data: LayoutBlockImagesData;
	export let order: number;
</script>

<Section 
	images
	order={order}
	span_columns={data.span_columns ?? undefined}
	col_units={data.col_units ?? undefined}
	col_start={data.col_start ?? undefined}
	span_rows={data.span_rows ?? undefined}
>
	<Slideshow interval={5000} items={data?.images ?? []} let:item>
		<figure in:fade={{ delay: 300 }} out:fade={{ delay: 600 }}>
			<img
				src={assetUrl(item.image?.filename_disk)}
				alt={item.image?.description}
			/>
			<figcaption>
				{@html item.rich_text}
			</figcaption>
		</figure>
	</Slideshow>
</Section>

<style lang="scss">
	
</style>