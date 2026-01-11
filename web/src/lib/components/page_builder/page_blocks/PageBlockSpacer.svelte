<script lang="ts">
	export let order: number;
</script>

<template>
	<div style:order={order} />
</template>

<style lang="scss">
	div {
		grid-column: whole;
		height: var(--SPACE-XL);
	}
</style>
