<script lang="ts" context="module">
	import type { ImageAsset } from "$lib/cms";
	import type { LayoutFields } from "./index.svelte";

	export type LayoutBlockFeaturedPageData = LayoutFields & {
		background_image?: ImageAsset;
		background_image_mobile?: ImageAsset;
		youtube_id?: string | null;
		vimeo_id?: string | null;
        small_subheading?: string | null;
        large_primary_heading?: string | null;
        rich_text?: string | null;
        cta_text?: string | null;
        cta_link?: string | null;
	};
</script>

<script lang="ts">
	import { assetUrl } from "$lib/cms/assets";
	import { AnimateTrigger, animate, fadeScroll } from "$lib/animate";
	import Section from "$lib/components/Section.svelte";
	import DottedArrow from "$lib/components/DottedArrow.svelte";
	import DottedArrowHover from "$lib/components/DottedArrowHover.svelte";
	export let data: LayoutBlockFeaturedPageData;
	export let order: number;

	const parallaxScroll = { trigger: AnimateTrigger.WhileScrollingInView, animClass: "parallax" };
</script>

<Section 
	featuredPage
	featuredPageVideo={data.youtube_id || data.vimeo_id}
	order={order}
	span_columns={data.span_columns}
	col_units={data.col_units}
	col_start={data.col_start}
	span_rows={data.span_rows}
>
	{#if data.youtube_id || data.vimeo_id}
		<div class="grid-col-2 col-gap-0">
			<DottedArrowHover href={data.cta_link}>
				<article class="padding-right-md featured-video-info">
					<h4 class="md">{data.small_subheading}</h4>
					<div>
						<h3 class="xxl">{data.large_primary_heading}</h3>
						{@html data.rich_text}
						<p>{data.cta_text} <DottedArrow /></p>
					</div>
				</article>
			</DottedArrowHover>
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
		</div>
	{:else}
		<DottedArrowHover href={data.cta_link}>
			<picture 
				class="featured-page" 
				style:--image-position-mobile={data.background_image_mobile ? '50% 0' : '0 0'}
			>
				{#if data.background_image_mobile}
					<source srcset={assetUrl(data.background_image_mobile.filename_disk)} media="(max-width: 31.25em)">
				{/if}
				<img src={assetUrl(data.background_image.filename_disk)}
					 alt={data.background_image.description}
					 use:animate={parallaxScroll}
					 role="presentation"
				/>
			</picture>
			<article class="featured-page-info">
				<h4 class="md">{data.small_subheading}</h4>
				<div>
					<h3 class="xxl">{data.large_primary_heading}</h3>
					{@html data.rich_text}
					<p>{data.cta_text} <DottedArrow /></p>
				</div>
			</article>
		</DottedArrowHover>
	{/if}
</Section>

<style lang="scss">
	:global {
		section.featuredPage > a.dotted-arrow {
			height: 100%;
		}
	}
	picture.featured-page {
		padding: 0;
		margin: 0;
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 100%;
		overflow: hidden;

		img {
			width: 100%;
			height: 166%;
			object-fit: cover;
			object-position: 0 0;

			@media (max-width: 31.25em) {
				object-position: var(--image-position-mobile);
			}
		}
	}
	article {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		h4 {
			color: var(--COLOR-ORANGE);
			margin-bottom: 1em;
		}
		h3 {
			margin-bottom: 0.5em;
		}

		&.padding-right-md {
			padding-right: calc(var(--GRID-CELL) * 2);

			@media (max-width: 31.25em) {
				padding-right: 0;
			}
		}

		&.featured-page-info {
			position: relative;
			z-index: 1;
			width: calc(100% / 3);
			@media (max-width: 62.5em) {
				width: calc(100% * 5 / 12);
			}
			@media (max-width: 46.875em) {
				width: 50%;
			}
			@media (max-width: 31.25em) {
				width: calc(50% - var(--GRID-CELL));
				font-size: var(--FONT-SIZE-SM);
			}
			min-height: calc(100% - var(--GRID-CELL) * 1.5);
			padding: var(--GRID-CELL) var(--GRID-CELL) calc(var(--GRID-CELL) * 0.5);
		}

		&.featured-video-info {
			//margin-bottom: var(--GRID-CELL);
		}
	}
	:global(.parallax) {
		// margin-top: -66%;
		animation: parallax var(--move-duration, 1s) var(--move-timing, ease) forwards;
	}

	@keyframes parallax {
		0% {
			// margin-top: -66%
			transform: translateY(-66%);
		}
		100% {
			// margin-top: 0;
			transform: translateY(0%);
		}
	}
</style>