<script lang="ts" context="module">
	import type { ImageAsset } from "$lib/cms";
	import { assetUrl } from "$lib/cms/assets";

	export type TeamMember = {
		slug?: string | null;
		banner_grid_image_color?: ImageAsset;
		banner_grid_image_sort?: number;
		has_profile_page?: boolean | null;
	};
</script>

<script lang="ts">
	export let teamMembers: TeamMember[];
	export let link: Boolean = false;
</script>

<div class="team-grid">
	{#each teamMembers.filter(member => !!member.banner_grid_image_sort).slice(0, 24).sort((a, b) => (b.banner_grid_image_sort ?? 0) - (a.banner_grid_image_sort ?? 0)) as member, i}
		{#if link}
			<a href={member.slug && member.has_profile_page ? `/team/${member.slug}` : "/team"}>
				<img
					src={assetUrl(member.banner_grid_image_color?.filename_disk)}
					alt={member.banner_grid_image_color?.description}
				/>
			</a>
		{:else}
			<img
				src={assetUrl(member.banner_grid_image_color?.filename_disk)}
				alt={member.banner_grid_image_color?.description}
			/>
		{/if}
	{/each}
</div>

<style lang="scss">
	.team-grid {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		grid-template-rows: auto;
		grid-gap: 0;

		@media (max-width: 62.5em) {
			grid-template-columns: repeat(6, 1fr);
		}
		@media (max-width: 31.25em) {
			grid-template-columns: repeat(4, 1fr);
		}

		img {
			width: 100%;
			height: auto;
			aspect-ratio: 7 / 5;
			object-fit: cover;
			filter: grayscale(100%);
			transition: filter 0.3s ease;

			&:hover {
				filter: grayscale(0%);
			}
		}

		> a > img {
			height: 100%;
		}
	}
</style>
