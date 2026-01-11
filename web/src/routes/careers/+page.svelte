<script lang="ts">
	import SeoHead from "$lib/components/SeoHead.svelte";
	import TeamGrid from "$lib/components/TeamGrid.svelte";
	import DottedArrow from "$lib/components/DottedArrow.svelte";
	import DottedArrowHover from "$lib/components/DottedArrowHover.svelte";
	import type { PageData } from "./$types";
	import PageBlocks from "$lib/components/page_builder/page_blocks/index.svelte";

	export let data: PageData;
</script>

<SeoHead
	title = {data?.careers_page?.seo_title ? data?.careers_page?.seo_title : "Careers"}
	description = {data?.careers_page?.seo_page_description ? data?.careers_page?.seo_page_description : "Explore Careers at RSM Design"}
/>

{#if data?.careers_page?.use_page_blocks}
	<PageBlocks content={data?.careers_page?.page_content} />
{:else}
	<template>
		<div class="container">
			<section class="team-grid-section">
				<TeamGrid teamMembers={data.team.filter((member) => !!member.banner_grid_image_color)} link />
			</section>
			<section class="careers-overview-section">
				<h1 class="xxxl">Fearlessly Authentic</h1>
				<p>The studio is a passionate team of designers from diverse creative backgrounds including graphic design, architecture, interior design, industrial design, and branding. Our design studio is dedicated to innovation where intellectual questioning and creative debate are encouraged. Challenging ourselves to discover each project’s unique spirit, we create narratives for places that engage people with their environment.</p>
			</section>
			<section class="current-openings-section">
				<h2 class="md gray">Current openings</h2>
				{#each data.careers as career}
					<article>
						<h3 class="xxl">
							<a href="/careers/{career.slug}">{career.name}</a>
						</h3>
						{#if career.seo_page_description}
							<p>{career.seo_page_description}</p>
						{/if}
					</article>
				{/each}
			</section>

			<section class="cta-section">
				<DottedArrowHover href="/work" text_alignment="right">
					<p>View Our Work <DottedArrow /></p>
				</DottedArrowHover>
			</section>
		</div>
	</template>
{/if}

<style lang="scss">
	section.team-grid-section {
		grid-column: whole;
	}
	section.careers-overview-section {
		margin-top: calc(var(--GRID-CELL) * 2);
		grid-column: third-start 1 / span 2 third-end;

		> h1 {
			margin-bottom: var(--GRID-CELL);
		}
	}
	section.current-openings-section {
		margin-top: calc(var(--GRID-CELL) * 2);
		grid-column: third-start 1 / span 2 third-end;

		> article {
			&:not(:first-of-type) {
				margin-top: calc(var(--GRID-CELL) * 1.5);
			}
		}
	}
	section.cta-section {
		grid-column: whole;
		margin-top: calc(var(--GRID-CELL) * 3);
	}
</style>