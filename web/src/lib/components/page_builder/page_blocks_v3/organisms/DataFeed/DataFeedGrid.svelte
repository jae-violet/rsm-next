<script lang="ts">
	import { assetUrl } from "$lib/cms/assets";
	
	export type dataFeedGridData = {
		feed_source?: string | null;
		feed_grid_columns?: number | null;
		feed_grid_style?: string | null;
	};

	export let data: dataFeedGridData;
	export let feedData: any[];
</script>

<template>
	{#each feedData as item}
		<a class="grid-item"
		   href="/work/{item.slug}"
		>
			<figure>
				<img src={assetUrl(item.grid_image?.filename_disk)}
					 alt={item.grid_image?.title}
				/>
				<figcaption>
					<h3 class="xl">{item.project_title}</h3>
					<p>{item.location}</p>
				</figcaption>
			</figure>
		</a>
		<!--<div class="column-container "
			 style:--grid-column-units={`${data.feed_grid_columns === 3 ? "sixth" : "eighth"}`}
		>
			Column
		</div>-->
	{/each}
</template>

<style lang="scss">
	.column-container {
		grid-column: var(--grid-column-units) / span 1;
	}

	a > figure > img {
			max-width: 100%;
	}

	a:nth-of-type(4n+1) {
		grid-column: eighth-start 1 / eighth-end 2;
	}
	a:nth-of-type(4n+2) {
		grid-column: eighth-start 3 / eighth-end 4;
	}
	a:nth-of-type(4n+3) {
		grid-column: eighth-start 5 / eighth-end 6;
	}
	a:nth-of-type(4n) {
		grid-column: eighth-start 7 / eighth-end 8;
	}
</style>