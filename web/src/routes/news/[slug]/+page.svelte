<script lang="ts">
	import { assetUrl } from "$lib/cms/assets";
	import type { PageData } from "./$types";
	import PageBlocks from "$lib/components/page_builder/page_blocks/index.svelte";
	import NextEntry, { EntryType } from "$lib/components/NextEntry.svelte";
	import SeoHead from "$lib/components/SeoHead.svelte";
	import { formatDate } from "$lib/format";

	export let data: PageData;
</script>

<SeoHead
	title={data.news_post.post_title ?? ""}
	description={data.news_post.seo_page_description ?? undefined}
	noindex={data.news_post.visibility === "draft"}
/>

<template>
	<div class="news-intro">
		<article>
			<p class="kicker">
				<strong>{formatDate(data.news_post.published_date, { fullMonth: true })}</strong>&emsp;
			</p>
			<h1 class="xxxl">{data.news_post.post_title ?? "News Post"}</h1>
			<figure class="hero-image">
				<img
					src={assetUrl(data.news_post.hero_image?.filename_disk)}
					alt={data.news_post.hero_image?.description}
					class={data.news_post.hero_image_crop_attachment === "left"
						? "position-left"
						: data.news_post.hero_image_crop_attachment === "center_left"
						? "position-center-left"
						: data.news_post.hero_image_crop_attachment === "center"
						? ""
						: data.news_post.hero_image_crop_attachment === "center_right"
						? "position-center-right"
						: data.news_post.hero_image_crop_attachment === "right"
						? "position-right"
						: ""}
				/>
			</figure>
		</article>
	</div>
	{#if data.news_post.page_content}
		<PageBlocks content={data.news_post.page_content} news />
	{/if}
	<div class="container">
		<NextEntry currentSlug={data.news_post.slug ?? ""} entryType={EntryType.Article} />
	</div>
</template>

<style lang="scss">
	.news-intro {
		grid-column: main;
		margin-top: calc(var(--HEADER-HEIGHT) + var(--GRID-CELL));
		display: flex;
		flex-direction: column;

		article {
			margin-bottom: calc(var(--GRID-CELL) * 3);
			p.kicker {
				text-transform: uppercase;
				letter-spacing: 0.05em;
				margin-bottom: 0.25em;
			}
			h1 {
				width: 80%;
				margin-bottom: 0.5em;
			}
			figure.hero-image {
				margin: 0;
				padding: 0;
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}
	}

	:global(.rich-text h2) {
		font-size: var(--FONT-SIZE-XL);
		text-transform: capitalize;
		letter-spacing: 0.015em;
	}
</style>
