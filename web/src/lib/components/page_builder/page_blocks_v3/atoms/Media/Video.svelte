<script lang="ts" context="module">
</script>

<script lang="ts">
	export let source: string;
	export let vimeo: string | null;
	export let youtube: string | null;
</script>

<template>
	<figure class="video">
		{#if source === "youtube" && youtube}
			<iframe
				title="Video"
				src="https://www.youtube.com/embed/{youtube}"
				width="100%"
				height="100%"
				frameborder="0"
				allow="autoplay; fullscreen"
				allowfullscreen
				loading="lazy"
			/>
		{:else if source === "vimeo" && vimeo}
			<iframe
				title="Video"
				src="https://player.vimeo.com/video/{vimeo}"
				width="100%"
				height="100%"
				frameborder="0"
				allow="autoplay; fullscreen"
				allowfullscreen
				loading="lazy"
			/>
		{:else}
			No video link was provided
		{/if}
	</figure>
</template>

<style lang="scss">
</style>