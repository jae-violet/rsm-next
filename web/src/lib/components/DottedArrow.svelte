<script lang="ts">
	import { getDottedArrowContext } from "./DottedArrowHover.svelte";

	/**
	 * The character to use for each dot.
	 */
	export let dot = "·";

	/**
	 * The character to use for spacing between each dot.
	 */
	export let space = "&hairsp;";

	let currentDots = getDottedArrowContext().currentDots;
</script>

<template>
	<span>
		<span>
			{#each { length: $currentDots } as _}
				{@html dot + space}
			{/each}
		</span>
		<span>›</span>
	</span>
</template>

<style lang="scss">
	span {
		display: inline-flex;
		flex-grow: 0;
		flex-shrink: 0;

		> span {
			color: var(--COLOR-ORANGE);
			font-size: 200%;
			font-weight: 300;
			line-height: 0.618;

			&:first-of-type {
				margin-left: 0.25em;
			}
		}
	}
</style>