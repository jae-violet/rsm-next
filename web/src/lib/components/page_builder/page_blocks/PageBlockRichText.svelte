<script lang="ts" context="module">
	export type PageBlockRichTextData = {
		content?: string | null;
		text_size?: string | null;
		text_alignment?: string | null;
	};
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import { afterNavigate } from "$app/navigation";
	import Section from "$lib/components/Section.svelte";
	import { animate, fadeMoveScroll } from "$lib/animate";
	export let data: PageBlockRichTextData;
	export let order: number;
	export let project: boolean = false;

	let root: HTMLElement;

	let addClasses = () => {
		let firstChild = root.firstChild;

		if (firstChild.tagName.toLowerCase() === "h1" || 
			firstChild.tagName.toLowerCase() === "h2" || 
			firstChild.tagName.toLowerCase() === "h3" || 
			firstChild.tagName.toLowerCase() === "h4" || 
			firstChild.tagName.toLowerCase() === "h5" || 
			firstChild.tagName.toLowerCase() === "h6") {
			root.parentElement.classList.add("initial-heading")
		}

		let lastChild = root.lastChild;

		if (lastChild.tagName.toLowerCase() === "h1" || 
			lastChild.tagName.toLowerCase() === "h2" || 
			lastChild.tagName.toLowerCase() === "h3" || 
			lastChild.tagName.toLowerCase() === "h4" || 
			lastChild.tagName.toLowerCase() === "h5" || 
			lastChild.tagName.toLowerCase() === "h6") {
			root.parentElement.classList.add("terminal-heading")
		}
	}

	onMount(() => {
		addClasses();
	});
	afterNavigate(() => {
		addClasses();
	});
</script>

<Section 
	project={project}
	richText
	order={order}
	span_columns={data.span_columns ?? 4}
	col_units={data.col_units ?? "sixth"}
	col_start={data.col_start ?? 2}
	padding_left={data.padding_left ?? "none"}
	padding_right={data.padding_right ?? "none"}
	span_rows={data.span_rows ?? 1}
	padding_top={data.padding_top ?? "default"}
	anchor_id={data.anchor_id ?? ""}
>
	<article 
		class="rich-text {data.text_size} align-{data.text_alignment}"
		bind:this={root}
		use:animate={fadeMoveScroll}
	>
		{@html data.content}
	</article>
</Section>

<style lang="scss">
	article {
		&.align-left {
			text-align: left;
		}

		&.align-center {
			text-align: center;
		}

		&.align-right {
			text-align: right;

			@media (max-width: 46.875em) {
				text-align: left;
			}
		}
	}
</style>
