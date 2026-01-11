<script lang="ts" context="module">
	import type { ImageAsset } from "$lib/cms";
	import type { LayoutFields } from "./index.svelte";

	export type PageBlockFeaturedPageData = LayoutFields & {
		media_position?: string | null;
		background_image?: ImageAsset;
		background_image_mobile?: ImageAsset;
		youtube_id?: string | null;
		vimeo_id?: string | null;
        small_subheading?: string | null;
        large_primary_heading?: string | null;
        large_heading_w_line_breaks?: string | null;
        rich_text?: string | null;
        cta_text?: string | null;
        cta_link?: string | null;
	};
</script>

<script lang="ts">
	import { assetUrl } from "$lib/cms/assets";
	import { AnimateTrigger, animate, fadeScroll, fadeMoveScroll, slideLeft, secondaryHeading, mainParagraph } from "$lib/animate";
	import Section from "$lib/components/Section.svelte";
	import DottedArrow from "$lib/components/DottedArrow.svelte";
	import DottedArrowHover from "$lib/components/DottedArrowHover.svelte";
	export let data: PageBlockFeaturedPageData;
	export let order: number;
	export let project: boolean = false;

	const parallaxScroll = { trigger: AnimateTrigger.WhileScrollingInView, animClass: "parallax" };
</script>

<Section 
	project={project}
	featuredPage
	order={order}
	span_columns={data.span_columns ?? 1}
	col_units={data.col_units ?? "whole"}
	col_start={data.col_start ?? 1}
    padding_left={data.padding_left ?? "none"}
    padding_right={data.padding_right ?? "none"}
	span_rows={data.span_rows ?? 1}
	padding_top={data.padding_top ?? "default"}
	anchor_id={data.anchor_id ?? ""}
>
	{#if data.youtube_id || data.vimeo_id}
		<div class="grid-col-2 col-gap-0 media-{data.media_position}">
			<DottedArrowHover href={data.cta_link ?? ""}>
				<article class="padding-md">
					{#if data.small_subheading}
						<h4 class="md" use:animate={slideLeft}>{data.small_subheading}</h4>
					{/if}
					<div>
						{#if data.large_heading_w_line_breaks}
							<h3 class="xxl" use:animate={secondaryHeading}>{data.large_heading_w_line_breaks}</h3>
						{:else if data.large_primary_heading}
							<h3 class="xxl" use:animate={secondaryHeading}>{data.large_primary_heading}</h3>
						{/if}
						{#if data.rich_text}
							<div use:animate={mainParagraph}>{@html data.rich_text}</div>
						{/if}
						{#if data.cta_text && data.cta_link}
							<p use:animate={fadeMoveScroll}>{data.cta_text} <DottedArrow /></p>
						{/if}
					</div>
				</article>
			</DottedArrowHover>
			<figure class="video" use:animate={slideLeft}>
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
			<article class="featured-page-info media-{data.media_position} {data.heading_only ? 'heading-only' : ''}" data-theme={data.white_text ? "light" : "dark"}>
				{#if data.small_subheading}
					<h4 class="md" use:animate={fadeScroll}>{data.small_subheading}</h4>
				{/if}
				<div>
					{#if data.large_heading_w_line_breaks}
						<h3 class="xxl" use:animate={secondaryHeading}>{data.large_heading_w_line_breaks}</h3>
					{:else if data.large_primary_heading}
						<h3 class='xxl' use:animate={fadeScroll}>{data.large_primary_heading}</h3>
					{/if}
					{#if data.rich_text}
						<div use:animate={fadeScroll}>{@html data.rich_text}</div>
					{/if}
					{#if data.cta_text && data.cta_link}
						<p use:animate={fadeScroll}>{data.cta_text} <DottedArrow /></p>
					{/if}
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
		div.grid-col-2.media-left > a.dotted-arrow {
			order: 2;

			> article.padding-md {
				padding-right: 0;
				padding-left: calc(var(--GRID-CELL) * 2);

				@media (max-width: 31.25em) {
					padding-right: 0;
					padding-left: 0;
				}
			}
		}

		a.dotted-arrow article.featured-page-info {
			&.heading-only:not(.media-left) {
				p:last-child:not(:only-child) {
					justify-content: flex-start;
				}

			}
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
			white-space: pre-line;
		}

		&.padding-md {
			padding-right: calc(var(--GRID-CELL) * 2);

			@media (max-width: 31.25em) {
				padding-right: 0;
			}
		}

		&.featured-page-info {
			position: relative;
			z-index: 1;
			width: calc(100% / 3);
			min-height: calc(100% - var(--GRID-CELL) * 1.5);
			padding: var(--GRID-CELL) var(--GRID-CELL) calc(var(--GRID-CELL) * 0.5);

			&.media-left {
				margin-left: calc(100% * 2 / 3 - var(--GRID-CELL) * 2);
			}

			@media (max-width: 62.5em) {
				width: calc(100% * 5 / 12);
				&.media-left {
					margin-left: calc(100% * 7 / 12 - var(--GRID-CELL) * 2);
				}
			}
			@media (max-width: 46.875em) {
				width: 50%;
				&.media-left {
					margin-left: calc(50% - var(--GRID-CELL) * 2);
				}
			}
			@media (max-width: 31.25em) {
				font-size: var(--FONT-SIZE-SM);
				width: calc(50% - var(--GRID-CELL));
				&.media-left {
					margin-left: calc(50% - var(--GRID-CELL));
				}
			}
			
			&[data-theme="light"] {
				color: #FFF;

				h4 {
					color: #FFF;
				}
			}

			&.heading-only {
				padding-top: calc(var(--GRID-CELL) * 10);
				min-height: 0px;

				&.media-left {
					text-align: right;
				}
			}
		}
	}
	:global(.parallax) {
		animation: parallax var(--move-duration, 1s) var(--move-timing, ease) forwards;
	}

	@keyframes parallax {
		0% {
			transform: translateY(-66%);
		}
		100% {
			transform: translateY(0%);
		}
	}
</style>
