<script lang="ts">
	import { page } from "$app/stores";
	import { cmsClient, type ImageAsset } from "$lib/cms";
	import { assetUrl } from "$lib/cms/assets";
	import SeoHead from "$lib/components/SeoHead.svelte";
	import { formatDate } from "$lib/format";
	import { onMount } from "svelte";

	type SearchResult = {
		title: string;
		subtitle: string;
		image: ImageAsset;
		link: string;
		class?: string;
	};

	let query = "";
	let loading = false;
	let error = "";
	let searchResults: SearchResult[] = [];

	async function search() {
		loading = true;
		try {
			const url = new URL($page.url);
			url.searchParams.set("query", query);
			history.replaceState(history.state, "", url);

			const res = await cmsClient.Search({ query });

			const results = [];

			// Projects
			for (const project of res.projects) {
				results.push({
					title: project.project_title ?? "",
					subtitle: `Project`,
					image: project.grid_image as ImageAsset,
					link: `/work/${project.slug}`
				});
			}

			// Markets
			for (const market of res.markets) {
				results.push({
					title: market.name ?? "",
					subtitle: `Market Overview`,
					image: market.grid_image as ImageAsset,
					link: `/markets/${market.slug}`
				});
			}

			// Services
			for (const service of res.services) {
				results.push({
					title: service.name ?? "",
					subtitle: `Service Overview`,
					image: service.grid_image as ImageAsset,
					link: `/services/${service.slug}`
				});
			}

			// Studio Locations
			for (const studioLocation of res.studio_locations) {
				results.push({
					title: studioLocation.search_name ?? "",
					subtitle: `Studio Location`,
					image: studioLocation.grid_image as ImageAsset,
					link: `/offices/${studioLocation.slug}`
				});
			}

			// Geographical Regions
			for (const geographicalRegion of res.geographical_regions) {
				results.push({
					title: geographicalRegion.search_name ?? "",
					subtitle: `Geographical Region`,
					image: geographicalRegion.grid_image as ImageAsset,
					link: `/regions/${geographicalRegion.slug}`
				});
			}

			// News Posts
			for (const newsPost of res.news_posts) {
				results.push({
					title: newsPost.post_title ?? "",
					subtitle: `News Post`,
					image: newsPost.grid_image as ImageAsset,
					link: `/news/${newsPost.slug}`
				});
			}

			// Team Members
			for (const teamMember of res.team) {
				results.push({
					title: teamMember.name ?? "",
					subtitle: `Team Member`,
					image: teamMember.headshot as ImageAsset,
					link: `/team/${teamMember.slug}`,
					class: "team"
				});
			}

			searchResults = results;
		} catch (err) {
			console.error(err);
			error = "We're sorry, an error occurred while searching. Please try again later.";
			searchResults = [];
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		if ($page.url.searchParams.has("query")) {
			query = $page.url.searchParams.get("query") ?? "";
			if (query) {
				search();
			}
		}
	});
</script>

<SeoHead
	title="Search"
	description="Find work produced by RSM’s team of designers working at the intersection of graphics and architecture with experience in branding and wayfinding. Our team works creates placemaking and environmental graphic design in retail, civic, mixed-use, and master plan residential community properties."
	slug="search"
/>

<template>
	<div class="container">
		<h1 class="md gray">Search Results For</h1>
		<form on:submit|preventDefault={search}>
			<input class="xxxl" placeholder="Find Work, Articles, Etc." bind:value={query} />
			<button class="reset" type="submit">›</button>
		</form>
		{#if loading}
			Loading...
		{:else}
			<section class="results grid-col-3">
				{#each searchResults as result}
					<a href={result.link} class={`result ${result.class ?? ""}`}>
						<figure>
							{#if result.image}
								<img src={assetUrl(result.image.filename_disk)} alt={result.image.description} />
							{/if}
							<figcaption>
								<p class="sm caps">{result.subtitle}</p>
								<h2 class="lg">{result.title}</h2>
							</figcaption>
						</figure>
					</a>
				{/each}
			</section>
		{/if}
	</div>
</template>

<style lang="scss">
	h1, form, section.results {
		grid-column: whole;
	}

	h1 {
		margin-top: var(--GRID-CELL);
	}

	form {
		margin-bottom: calc(var(--GRID-CELL) * 3);

		> input {
			z-index: 9999;
			width: 100%;
		}

		position: relative;

		> button {
			position: absolute;
			right: 0;
			bottom: 0;
			padding-left: calc(var(--GRID-CELL) * 2);
			font-size: var(--FONT-SIZE-XXXL);
			font-weight: 300;
			color: var(--COLOR-ORANGE);
		}
	}

	section.results {
		margin-bottom: calc(var(--GRID-CELL) * 3);
		a.result {
			> figure {
				margin: 0;
				padding: 0;

				> img {
					width: 100%;
					height: auto;
					aspect-ratio: 1 / 1;
					margin-bottom: 0.25em;
					transition: opacity 0.3s ease;
				}
				> figcaption {
					> p {
						margin-bottom: 0;
					}
				}
			}

			&:hover > figure > img {
				opacity: 0.618;
			}

			&.team {
				figure {
					> img {
						width: 100%;
						height: auto;
						aspect-ratio: 1 / 1;
						object-fit: cover;
						object-position: center top;
					}
				}
			}
		}
	}
</style>
