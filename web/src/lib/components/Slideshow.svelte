<script lang="ts">
	import { onMount } from "svelte";

	export let fullBleed: boolean = false;

	type T = $$Generic;

	export let items: T[];
	export let interval = 5000;

	let index = 0;

	$: currentItem = items[index];

	function next() {
		index += 1;
		if (index > items.length - 1) {
			index = 0;
		}
	}

	onMount(() => {
		const intervalId = setInterval(next, interval);

		return () => clearInterval(intervalId);
	});
</script>

<div class="slideshow" class:fullBleed>
	{#if currentItem}
		{#key index}
			<slot item={items[index]} />
		{/key}
	{/if}
</div>

<style lang="scss">
	.slideshow {
		position: relative;
		width: 100%;
		height: 100%;
		max-width: 100%;
		max-height: 850px;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		:global {
			a, figure {
				grid-row: 1;
				grid-column: 1;
				margin: 0;
				padding: 0;
				width: 100%;
				height: 100%;
			}
			a {
				color: white;

				figcaption {
					transition: opacity 0.3s ease;
				}

				&:hover figcaption {
					opacity: 0.618;
				}
			}
			figure {
				margin: 0;
				padding: 0;

				display: grid;
				grid-template-columns: 1fr;
				grid-template-rows: 1fr;

				overflow: hidden;

				img {
					grid-column: 1;
					grid-row: 1;
					width: 100%;
					max-width: 100%;
					// max-height: calc(100vh - var(--HEADER-HEIGHT));
					max-height: 850px;
					height: auto;
					object-fit: cover;

					&.position-left {
						object-position: 0% 50%;
					}
					&.position-center-left {
						object-position: 20% 50%;
					}
					&.position-center-right {
						object-position: 80% 50%;
					}
					&.position-right {
						object-position: 100% 50%;
					}
				}

				figcaption {
					grid-column: 1;
					grid-row: 1;
					align-self: end;
					justify-self: start;
					margin: 0 0 calc(var(--GRID-CELL) / 2) calc(var(--GRID-CELL) / 2);
					max-width: calc(100% - var(--GRID-CELL) * 2);
					position: relative;
					z-index: 1;

					&::after {
						content: "";
						position: absolute;
						z-index: -1;
						top: calc(var(--GRID-CELL) * -1 / 2);
						left: calc(var(--GRID-CELL) * -1 / 2);						
						width: calc(100% + var(--GRID-CELL));
						height: calc(100% + var(--GRID-CELL));
						background: rgba(0,0,0,0.25);
						filter: blur(1rem);
					}

					color: white;
					transition: opacity 0.3s ease;

					> h3 {
						font-size: var(--FONT-SIZE-MD);
						text-transform: uppercase;
						letter-spacing: 0.05em;
					}

					> p {
						margin-bottom: 0;
					}

					:global(a) {
						color: white;
						&:hover {
							opacity: 0.618;
						}
					}
				}
			}
		}

		&.fullBleed {
			height: 100vh;
			z-index: 8;

			:global {
				a, figure {
					position: absolute;
					top: 0;
					left: 0;
				}
				figure {
					display: grid;
					grid-template-columns: var(--GRID-WRAPPER);

					img {
						grid-column: viewport;
						height: 100%;
						max-height: unset;
					}

					figcaption {
						grid-column: container;
						margin: 0 0 calc(var(--GRID-CELL) * 2);

						@media (max-width: 62.5em) {
							margin-bottom: var(--GRID-CELL);
						}
					}
				}
			}
		}
	}
</style>