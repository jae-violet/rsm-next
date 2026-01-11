<script lang="ts" context="module">
	export type CardRowData = {
		hero_media_type?: string | null;
		hero_image?: ImageAssetRelation | null;
		hero_video_source?: string | null;
		hero_video_vimeo?: string | null;
		hero_video_youtube?: string | null;
		hero_headline?: string | null;
	}
</script>

<script lang="ts">
	import type { ImageAssetRelation } from "$lib/cms";
	import { assetUrl } from "$lib/cms/assets";
	import { animate, AnimateTrigger } from "$lib/animate";

	export let data: CardRowData;
	export let project: boolean = false;
</script>

<section class="hero">
	{#if data.hero_media_type === "Video"}
		{#if data.hero_video_source === "vimeo"}
			<iframe
				title="Video"
				src={`https://player.vimeo.com/video/${data.hero_video_vimeo}?background=1`}
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
				src={`https://www.youtube.com/embed/${data.hero_video_youtube}`}
				width="100%"
				height="100%"
				frameborder="0"
				allow="autoplay; fullscreen"
				allowfullscreen
				loading="lazy"
			/>
		{/if}
	{:else}
		<img
			src={assetUrl(data.hero_image?.filename_disk)}
			alt={data.hero_image?.description}
		/>
	{/if}
	<div class="hero-scrim-top" />
	<div class="hero-scrim-bottom" />
	<div class="hero-details"
		 use:animate={ { trigger: AnimateTrigger.WhileScrollingInView, animClass: "hero-title" } }
	>
		<div class="title">
			<h3>[Project Location]</h3>
			<h1> <!--use:animate={ { trigger: AnimateTrigger.WhileScrollingInView, 
								animClass: "fade" } }
			>-->
				[Project Title]
			</h1>
			<h2>[Project headline] Lorem ipsum dolor sit amet consectetur adipiscing elit</h2>
		</div>
	</div>
</section>

<style lang="scss">
	.hero {
		grid-column: viewport;
		width: 100%;
		position: relative;

		iframe {
			width: 100%;
			height: 100vh;
			position: sticky;
			top: 0;
		}

		img {
			width: 100%;
			height: 100vh;
			object-fit: cover;
			position: sticky;
			top: 0;
		}

		.hero-scrim-top {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 38.2vh;
			background: linear-gradient(rgba(26,24,24,0.38), transparent);
			mix-blend-mode: hard-light;
		}

		.hero-scrim-bottom {
			position: relative;
			width: 100%;
			height: 150vh;
			background: linear-gradient(transparent 0%, white 50%, white 100%);
		}

		.hero-details {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			display: grid;
			grid-template-columns: var(--GRID-WRAPPER);

			> .title {
				grid-column: eighth-start 1 / eighth-end 7;
				height: 100vh;
				padding-top: calc(var(--GRID-CELL) * 2);
				position: sticky;
				top: 0;
			}

			&.hero-title {
				> .title > h1 {
					animation: hero ease;
				}
			}

			@keyframes hero {
				0% {
					font-size: var(--FONT-SIZE-XXXL);
					font-weight: 400;
				}
				100% {
					font-size: var(--FONT-SIZE-LG);
					font-weight: 700;
				}
			}
		}
	}
</style>