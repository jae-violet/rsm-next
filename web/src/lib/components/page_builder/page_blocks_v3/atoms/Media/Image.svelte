<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { ImageAssetRelation } from "$lib/cms";
	import { assetUrl } from "$lib/cms/assets";

	export let source: ImageAssetRelation;
</script>

<template>
	<img
		src={assetUrl(source.filename_disk)}
		alt={source.description}
	/>
</template>

<style lang="scss">
	img {
		width: 100%;
	}
</style>