<script lang="ts" context="module">
	import type { LayoutFields } from "./index.svelte";

	export type PageBlockCardsData = LayoutFields & {
		cards_per_row: number | null;
		row_divider_color: string | null;
		card_padding_horizontal: string | null;
		card_padding_vertical: string | null;
		callout_size: string | null;
		text_size: string | null;
		text_padding: string | null;
		text_alignment: string | null;
		image_mask: string | null;
		image_padding: string | null;
		image_hover_effect: string | null;
		cta_alignment: string | null;
		card_items?: CardItem[] | null;
	};

	export type CardItem = {
		image?: ImageAssetRelation | null;
		callout?: string | null;
		callout_size_override?: string | null;
		rich_text?: string | null;
		cta_text?: string | null;
		cta_link?: string | null;
	};
</script>

<script lang="ts">
	import Section from "$lib/components/Section.svelte";
	import DottedArrow from "$lib/components/DottedArrow.svelte";
	import DottedArrowHover from "$lib/components/DottedArrowHover.svelte";
	import type { ImageAssetRelation } from "$lib/cms";
	import { assetUrl } from "$lib/cms/assets";
	import { animate, fadeScroll, fadeMoveScroll } from "$lib/animate";

	export let data: PageBlockCardsData;
	export let order: number;
	export let project: boolean = false;

	$: console.log(data);
</script>

<Section 
	project={project}
	cards
	order={order}
	span_columns={data.span_columns ?? 1}
	col_units={data.col_units ?? "whole"}
	col_start={data.col_start ?? 1}
	padding_left={data.padding_left ?? "none"}
	padding_right={data.padding_right ?? "none"}
	span_rows={data.span_rows ?? 1}
	padding_top={data.padding_top ?? "default"}
	anchor_id={data.anchor_id ?? ""}
>
	<div 
		class="flex wrap space-between
			   padding-horiz-{data.card_padding_horizontal}
			   padding-vert-{data.card_padding_vertical}"
		style:--num-columns={data.cards_per_row}
	>
		{#each data.card_items ?? [] as card, i}
			<article
				class="rich-text
					   {data.text_size}
					   text-align-{data.text_alignment}
					   num-columns-{data.cards_per_row}
					   {i + 1 > data.cards_per_row ? 'next-row' : ''}
					  "
			>
				{#if card?.image}
					<figure class="image-padding-{data.image_padding}"
							use:animate={fadeScroll}
					>
						<img 
							class="hover-effect-{data.image_hover_effect}"
							src={assetUrl(card.image?.filename_disk)} 
							alt="" 
						/>
					</figure>
				{/if}
				{#if card?.callout}
					{#if card?.callout_size_override != 'none'}
						<h3 class="lowercase {card.callout_size_override}"
							use:animate={fadeMoveScroll}
						>
							{card.callout}
						</h3>
					{:else if data.callout_size != 'auto'}
						<h3 class="lowercase {data.callout_size}"
							use:animate={fadeMoveScroll}
						>
							{card.callout}
						</h3>
					{:else}
						<h3 class="lowercase
								   {data.cards_per_row <= 3 ? 'xxxl' : ''}
								   {data.cards_per_row === 4 ? 'lg' : ''}
								   {data.cards_per_row >= 5 ? 'md' : ''}"
							use:animate={fadeMoveScroll}
						>
							{card.callout}
						</h3>
					{/if}
				{/if}
				{#if card?.rich_text}
					<div class="card-body text-padding-{data.text_padding}" 
						 use:animate={fadeMoveScroll}>
						{@html card.rich_text}
					</div>
				{/if}
				{#if card?.cta_text}
					<DottedArrowHover
						href={card?.cta_link}
						text_alignment={card?.cta_alignment_override != 'none' ? card.cta_alignment_override : data.cta_alignment}
						animFadeMoveScroll
					>
						<p>{card.cta_text} <DottedArrow /></p>
					</DottedArrowHover>
				{/if}
			</article>
		{/each}
	</div>
</Section>

<style lang="scss">
	div.flex {
		--padding-horiz: 0;
		column-gap: var(--padding-horiz);
		--padding-vert: 0;
		row-gap: var(--padding-vert);

		// Card padding utility classes
		&.padding-horiz-sm {
			--padding-horiz: var(--SPACE-SM);
		}
		&.padding-horiz-md {
			--padding-horiz: var(--SPACE-MD);
		}
		&.padding-horiz-lg {
			--padding-horiz: var(--SPACE-LG);
		}
		&.padding-horiz-xl {
			--padding-horiz: var(--SPACE-XL);
		}
		&.padding-vert-sm {
			--padding-vert: var(--SPACE-SM);
		}
		&.padding-vert-md {
			--padding-vert: var(--SPACE-MD);
		}
		&.padding-vert-lg {
			--padding-vert: var(--SPACE-LG);
		}
		&.padding-vert-xl {
			--padding-vert: var(--SPACE-XL);
		}

		> article {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			flex: 0 0
				  calc((100% - (var(--padding-horiz) * 2) * (var(--num-columns) - 1)) / var(--num-columns));

			// Card width utility classes
			@media (max-width: 62.5em) {
				&.num-columns-3,
				&.num-columns-4,
				&.num-columns-5,
				&.num-columns-6 {
					--num-columns: 2;
				}
			}
			@media (max-width: 31.25em) {
				&.num-columns-2,
				&.num-columns-3,
				&.num-columns-4,
				&.num-columns-5,
				&.num-columns-6 {
					--num-columns: 1;
				}
			}

			// Text alignment utility class
			@media (max-width: 31.25em) {
				&.text-align-center {
					text-align: left;
				}
			}

			> h3.lowercase {
				&.xxxl {
					margin-bottom: 1.5rem;
				}
				&.xxl {
					margin: calc(var(--GRID-CELL) * 2 / 3) 0 0;
				}
				&.xl {
					margin: calc(var(--GRID-CELL) * 2 / 3) 0 calc(var(--GRID-CELL) / 4);
				}
				&.lg {
					margin: calc(var(--GRID-CELL) * 2 / 3) 0 0;
				}
				&.md {
					margin: calc(var(--GRID-CELL) / 2) 0 0;
				}
				&.sm {
					margin: calc(var(--GRID-CELL) / 3) 0 0;
				}
				&.xs {
					margin: calc(var(--GRID-CELL) / 4) 0 0;
				}
				&.xxs {
					margin: calc(var(--GRID-CELL) / 4) 0 0;
				}
			}

			:global(h4) {
				margin-bottom: 1rem;
			}

			div.card-body {
				margin: 0.5em 0 1em;

				&.text-padding-sm {
					padding: 0 var(--SPACE-SM);
				}
				&.text-padding-md {
					padding: 0 var(--SPACE-MD);
				}
				&.text-padding-lg {
					padding: 0 var(--SPACE-LG);
				}
				&.text-padding-xl {
					padding: 0 var(--SPACE-XL);
				}
			}

			> figure {
				&.image-padding-sm {
					padding: 0 var(--SPACE-SM);
					@media (max-width: 31.25em) {
						padding: 0 calc(var(--SPACE-SM) * 2) 0 0;
					}
				}
				&.image-padding-md {
					padding: 0 var(--SPACE-MD);
					@media (max-width: 31.25em) {
						padding: 0 calc(var(--SPACE-MD) * 2) 0 0;
					}
				}
				&.image-padding-lg {
					padding: 0 var(--SPACE-LG);
					@media (max-width: 31.25em) {
						padding: 0 calc(var(--SPACE-LG) * 2) 0 0;
					}
				}
				&.image-padding-xl {
					padding: 0 var(--SPACE-XL);
					@media (max-width: 31.25em) {
						padding: 0 calc(var(--SPACE-XL) * 2) 0 0;
					}
				}

				> img {
					transition: filter 0.3s ease;

					&.hover-effect-color-photo {
						filter: grayscale(100%);

						&:hover {
							filter: grayscale(0%);
						}
					}

					&.hover-effect-grayscale-photo {
						filter: grayscale(0%);

						&:hover {
							filter: grayscale(100%);
						}
					}

					&.hover-effect-color-graphic {
						filter: contrast(200%) grayscale(100%) brightness(120%);

						&:hover {
							filter: contrast(100%) grayscale(0%) brightness(100%);
						}
					}

					&.hover-effect-grayscale-graphic {
						filter: contrast(100%) grayscale(0%) brightness(100%);

						&:hover {
							filter: contrast(200%) grayscale(100%) brightness(120%);
						}
					}
				}
			}
		}
	}
</style>