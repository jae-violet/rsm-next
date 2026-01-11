<script lang="ts" context="module">
	export type PageBlockCtaData = {
		heading_size?: string | null;
		text_size?: string | null;
		text_alignment?: string | null;
		heading?: string | null;
		text?: string | null;
		link?: string | null;
	};
</script>

<script lang="ts">
	import Section from "$lib/components/Section.svelte";
	import DottedArrow from "$lib/components/DottedArrow.svelte";
	import DottedArrowHover from "$lib/components/DottedArrowHover.svelte";
	import { animate, fadeMoveScroll } from "$lib/animate";
	export let data: PageBlockCtaData;
	export let order: number;
	export let project: boolean = false;
</script>

<Section 
	project={project}
	cta
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
	{#if data.heading}
		<h3 class="{data.heading_size}
				   {data.text_alignment === "left" ? 'text-align-left' : 'text-align-right'}"
			use:animate={fadeMoveScroll}
		>
			{data.heading}
		</h3>
	{/if}
	<DottedArrowHover
		href={data.link}
		text_alignment={data.text_alignment ?? "right"}
		has_heading={data.heading ? true : false}
		animFadeMoveScroll
	>
		<p class="{data.text_size}
				  {data.heading ? 'font-weight-400' : ''}"
		>
			{data.text} <DottedArrow />
		</p>
	</DottedArrowHover>
</Section>

<style lang="scss">
	@media (max-width: 62.5em) {
		.text-align-right {
			text-align: left;
		}

		:global {
			section.cta .has-heading.flex-justify-end {
				justify-content: unset !important;
			}
		}
	}
</style>