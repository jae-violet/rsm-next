<script lang="ts" context="module">
	import type { LayoutFields } from "./index.svelte";

	export type LayoutBlockVideoData = LayoutFields & {
		youtube_id?: string | null;
		vimeo_id?: string | null;
	};
</script>

<script lang="ts">
	import Section from "$lib/components/Section.svelte";
	export let data: LayoutBlockVideoData;
	export let order: number;
</script>

<Section 
	video
	order={order}
	span_columns={data.span_columns}
	col_units={data.col_units}
	col_start={data.col_start}
	span_rows={data.span_rows}
>
	<figure class="video">
		{#if data.youtube_id}
			<iframe
				title="Video"
				src="https://www.youtube.com/embed/{data.youtube_id}"
				width="100%"
				height="100%"
				frameborder="0"
				allow="autoplay; fullscreen"
				allowfullscreen
				loading="lazy"
			/>
		{:else}
			<iframe
				title="Video"
				src="https://player.vimeo.com/video/{data.vimeo_id}"
				width="100%"
				height="100%"
				frameborder="0"
				allow="autoplay; fullscreen"
				allowfullscreen
				loading="lazy"
			/>
		{/if}
	</figure>
	
</Section>

<style lang="scss">
</style>