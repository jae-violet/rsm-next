<script lang="ts">
	import { onMount } from "svelte";

	onMount(() => {
		(globalThis as any).hbspt.forms.create({
			target: ".contact-form",
			region: "na1",
			portalId: "8650991",
			formId: "d6c9df29-b04b-4940-801c-e32db3bcc605"
		});
	})
</script>

<template>
	<div class="contact-form">

		<script>
			hbspt.forms.create({
				region: "na1",
				portalId: "8650991",
				formId: "d6c9df29-b04b-4940-801c-e32db3bcc605"
			});
		</script>
	</div>
</template>

<style lang="scss">
	.contact-form {
		display: contents;

		:global {
			form {
				width: 60%;
				display: grid;
				column-gap: calc(var(--GRID-CELL) / 2);
				grid-template-columns: 1fr 1fr;

				@media (max-width: 62.5em) {
					grid-template-columns: 1fr;
				}

				> div {
					grid-column: span 1;
					width: 100%;

					&.hs-submit {
						grid-column: 1;
						margin-top: var(--GRID-CELL)
					}
				}

				label {
					font-weight: 400;
				}
				input,
				select,
				textarea {
					width: 100%;
					max-width: 100%;
					margin-bottom: 2em;
					padding: 0 0 0.25em;
					background-color: transparent;
					color: var(--COLOR-MID-GRAY);
					border: none;
					border-bottom: 1px solid var(--COLOR-MID-GRAY);
					border-radius: 0;

					&:focus {
						border-color: #3898ec;
						outline: 0;
					}
				}
				select {
					-moz-appearance: none; /* Firefox */
					-webkit-appearance: none; /* Safari and Chrome */
					appearance: none;

					> option {
						background-color: #2c2a2a;
						color: white;
					}
				}
				input[type=checkbox] {
					margin-right: 0.5em;
					width: 12px;
					height: 12px;
					background-color: var(--COLOR-MID-GRAY);
					border: 1px solid var(--COLOR-MID-GRAY);
					border-radius: 0;
					margin-bottom: 0;
				}
				textarea {
					margin: 0.25em 0 1em 0;
					border: 1px solid var(--COLOR-MID-GRAY);
					padding: 0.5em 0;
				}
				.hs_recaptcha {
					margin-bottom: 2em;
				}
				input[type=submit] {
					width: auto;
					background-color: var(--COLOR-DIM-GRAY);
					transition: background-color 0.2s;
					padding: 9px 15px;
					color: white;
					border: none;
					border-radius: 0;
					text-decoration: none;
					cursor: pointer;

					&:hover {
						background-color: #a2a4a7;
					}
				}
				.hs-error-msgs {
					margin: -1.75em 0 2em 0;
					color: var(--COLOR-ORANGE);
					font-style: italic;
				}
			}
		}
	}
</style>