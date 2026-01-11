<script lang="ts">
	export let title: string;
	export let description: string =
		"RSM Design is a passionate team of designers, architects, and storytellers working at the intersection of graphics and architecture. Our projects ignite collaborations around the world, each bringing its own unique challenges. RSM Design embraces each new opportunity using creativity.";
	export let noindex: boolean = false;
	export let slug: string | null = "";
</script>

<svelte:head>
	<title>{title}&ensp;·&ensp;RSM Design</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
	{#if slug}
		<link rel="canonical" href="https://rsmdesign.com/{slug}" />
	{/if}
	<slot />
</svelte:head>
