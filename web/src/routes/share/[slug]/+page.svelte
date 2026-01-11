<script lang="ts">
	import type { PageData } from "./$types";
	import PageBlocks from "$lib/components/page_builder/page_blocks/index.svelte";
	import { onMount } from "svelte";
	
	export let data: PageData;
	let protectedPage: boolean = false;
	let showError: boolean = false;
	let usernameField: HTMLInputElement;
	let passwordField: HTMLInputElement;
	let hiddenPassword: boolean = true;

	let togglePassword = () => {
		hiddenPassword = !hiddenPassword;

		if (hiddenPassword) {
			passwordField.type = "password";
		} else {
			passwordField.type = "text";
		}
	};

	let checkCredentials = () => {
		if (usernameField.value === data.share.username && passwordField.value === data.share.password) {
			protectedPage = false;
			sessionStorage.setItem("passwordProtected", "false");
			showError = false;
		} else {
			protectedPage = true;
			showError = true;
		}
	};

	onMount(() => {
		if (data.share.enable_password_protection && sessionStorage.getItem("passwordProtected") !== "false") {
			protectedPage = true;
			sessionStorage.setItem("passwordProtected", "true");
		}
	});
</script>

{#if protectedPage}
	<div class="password-protected">
		{#if data.share.client_name || data.share.project_name}
			<div class="client-info">
				{#if data.share.client_name}
					<h3 class="client-name">{data.share.client_name}</h3>
				{/if}		
				{#if data.share.project_name}
					<h1 class="project-title">{data.share.project_name}</h1>
				{/if}
			</div>
		{/if}
		<div class="authentication">
			<h2>Enter project credentials</h2>
			<form on:submit|preventDefault={checkCredentials}>
				<div class="username">
					<input type="text" name="username" id="username" placeholder="Username" bind:this={usernameField} />
				</div>
				<div class="password">
					<input type="password" name="password" id="password" placeholder="Password" bind:this={passwordField} />
					<div class="view-password" on:click={togglePassword} on:keydown={togglePassword}>
						{#if hiddenPassword}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off">
								<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
								<path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
								<path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>
								<path d="m2 2 20 20"/>
							</svg>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye">
								<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
								<circle cx="12" cy="12" r="3"/>
							</svg>
						{/if}
					</div>
				</div>
				{#if showError}
					<span class="error-message">Incorrect username or password. Please try again.</span>
				{/if}
				<button type="submit" on:click={checkCredentials} on:keypress={checkCredentials}>View project</button>
			</form>
		</div>
	</div>
{:else}
	<template>
		<div class="container">
			{#if data.share.page_content}
				<PageBlocks content={data.share.page_content} />
			{:else}
				<h2>This share page is empty.</h2>
				<p>To add content visit the share collection in Directus and add content blocks to your page.</p>
			{/if}
		</div>
	</template>
{/if}

<style lang="scss">
	.password-protected {
		grid-column: container;
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		width: 100%;
		max-width: 640px;
		padding: 32px 0;
		margin: calc(var(--HEADER-HEIGHT) + var(--GRID-CELL)) 0 64px;

		@media (max-width: 31.25em) {
			max-width: 100%;
			margin: var(--HEADER-HEIGHT) auto 0;
		}

		.client-info {
			display: flex;
			flex-direction: column;
			padding-bottom: 12px;
			border-bottom: 1px solid var(--COLOR-MID-GRAY);
			margin-bottom: 32px;

			.client-name {
				font-size: var(--FONT-SIZE-MD);
				font-weight: 600;
				color: var(--COLOR-ORANGE);
			}

			.project-title {
				font-size: var(--FONT-SIZE-XL);
				font-weight: 600;
			}
		}

		.authentication {
			display: flex;
			flex-direction: column;
			padding: 0px;

			h2 {
				margin-bottom: 24px;
				text-align: left;
				width: 100%;
				font-size: var(--FONT-SIZE-MD);
				color: var(--COLOR-DIM-GRAY);
				font-weight: 400;
			}

			form {
				display: flex;
				flex-direction: column;
				gap: 32px;
				width: 100%;

				&.error {
					input {
						border-color: var(--COLOR-ORANGE);
					}
				}


				label {
					font-weight: 400;
				}

				.username,
				.password {
					display: flex;
					justify-content: space-between;
					position: relative;
					border-bottom: 1px solid var(--COLOR-MID-GRAY);

					&:has(input:focus),
					&:has(svg:focus) {
						color: #3898ec;
						border-color: #3898ec;
						outline: 0;

						svg {
							path: {
								stroke: #3898ec;
							}
						}
					}

					svg {
						path: {
							stroke: var(--COLOR-MID-GRAY);
						}

						&:hover {
							cursor: pointer;
						}
					}
				}

				input {
					width: 100%;
					max-width: 100%;
					padding: 0 0 0.25em;
					background-color: transparent;
					color: var(--COLOR-MID-GRAY);
					border: none;
					border-radius: 0;

					&:focus {
						color: #3898ec;
						border-color: #3898ec;
						outline: 0;
					}
				}

				button {
					align-self: flex-end;
					width: fit-content;
					background-color: var(--COLOR-ORANGE);
					transition: background-color 0.2s;
					padding: 9px 15px;
					color: white;
					border: none;
					border-radius: 0;
					text-decoration: none;
					cursor: pointer;

					&:hover {
						background-color: var(--COLOR-ORANGE-HOVER);
					}
				}

				.error,
				:global(.error) {
						color: var(--COLOR-ORANGE);
						border-bottom: 1px solid var(--COLOR-ORANGE);
						margin-bottom: 8px;

						&:focus {
							color: var(--COLOR-MID-GRAY);
						}
				}

				.error-message {
					font-size: 12px;
					color: var(--COLOR-ORANGE);
					font-weight: bold;
					margin-bottom: 2rem;
					display: block;
				}
			}
		}
	}

	.container {
		margin-top: calc(var(--HEADER-HEIGHT) + var(--GRID-CELL));
		
		@media (max-width: 31.25em) {
			margin-top: var(--HEADER-HEIGHT);
		}
	}
</style>
