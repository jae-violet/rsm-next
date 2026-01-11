<script lang="ts">
	import type { PageData } from "./$types";
	import PageBlocks from "$lib/components/page_builder/page_blocks/index.svelte";
	import { onMount } from "svelte";
	
	export let data: PageData;

	onMount(() => {
		console.log(data);
	});
</script>

<template>
	<div class="container">
		{#if data.sandbox.page_content}
			<PageBlocks content={data.sandbox.page_content} />
		{:else}
			<h2>This sandbox page is empty.</h2>
			<p>To add content visit the sandbox collection in Directus and add content blocks to your page.</p>
		{/if}
	</div>
</template>

<style lang="scss">
	.container {
		margin-top: calc(var(--HEADER-HEIGHT) + var(--GRID-CELL));
		
		@media (max-width: 31.25em) {
			margin-top: var(--HEADER-HEIGHT);
		}
	}
</style>
