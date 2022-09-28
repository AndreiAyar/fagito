<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { vendorBranding } from '$root/routes/components/GroceryCard/utils';
	import { neededGroceriesList } from '$root/store';
	import type { PageData } from '.svelte-kit/types/src/routes/posts/$types';
	export let data: PageData;
	import edjsParser from 'editorjs-parser';
	import { onMount } from 'svelte';
	import ProductsNeeded from '../components/ProductsNeeded.svelte';
	const parser = new edjsParser();
	const parsedData = data && data.content && parser.parse(data.content);
	export let form: Action;

	const mainVendors = () => {
		let vendors = [];
		if (data && data.postGroceries) {
			data.postGroceries.forEach((grocery) => {
				const { vendorId } = grocery;
				const idx = vendors.findIndex((el) => el.vendorId === vendorId);
				if (idx === -1) {
					const imageSrc = vendorBranding[vendorId].imagePath;
					vendors.push({ vendorId, imageSrc });
				}
			});
		}
		return vendors;
	};
	mainVendors();
	onMount(() => {
		if ($neededGroceriesList) {
			$neededGroceriesList = data.postGroceries;
		}
	});
</script>

<section class="w-full m-auto">
	<h1 class="text-center mb-10">
		{data.title}
	</h1>

	<div
		class="main-post relative overflow-visible dark:bg-slate-800 w-[70%] shadow-2xl m-auto rounded-lg"
	>
		<div
			class="w-[calc(100%+2rem)] -left-5 flex items-center justify-center font-semibold  absolute bg-primary-200 shadow-md dark:bg-purple-400 rounded-lg h-20 sm:h-14"
		>
			{#if data.totalPrice}
				<div class="flex w-full items-center justify-evenly flex-col sm:flex-row">
					<div>
						Total Price:{data.totalPrice} RON
					</div>
					<div class="flex items-center gap-4">
						Main vendors:
						{#each mainVendors() as mainVendor}
							<img
								class="w-12 object-contain bg-primary-400 border-gray-200 dark:border-gray-800 dark:bg-purple-700 p-1 text-white rounded-lg"
								alt={mainVendor.title}
								src={mainVendor.imageSrc}
							/>
						{/each}
					</div>
				</div>{/if}
		</div>
		<div>
			<ProductsNeeded postId={data.postId} />
		</div>
		<div class="pt-12 pb-14">
			{@html parsedData}
		</div>
	</div>
	<div class="flex items-center flex-col justify-center">
		{#if form && form.message}
		<p class="bg-orange-600 px-1 py-1 mt-1 rounded-lg">{form.message}</p>
		{/if}
		<form
		method="POST"
		action="?/editPost"
		use:enhance={({ form, data, cancel }) => {
			return async ({ result }) => {
				await applyAction(result);
				if (result.data.success) {
					goto('/addPost');
				}
				return result;
			};
		}}
	>
		<input type="hidden" id="postId" name="postId" value={data.postId} />
		<button class="btn bg-blue-300 rounded-lg mt-2" type="submit">Edit post</button>
	</form>
	
	</div>
	
</section>

<style>
	:global(.main-post h1, h2, h3, h4, h5, h6) {
		text-align: center;
		padding: 20px;
	}
	:global(.main-post .paragraph) {
		margin: 0 auto;
		max-width: 896px;
		line-height: 1.8;
		padding: 10px;
	}
	/* :global(.main-post .paragraph:nth-child(2n+0)) {
		//background-color: yellow;
	 
	} */

	:global(.main-post .fig-img, .mainpost .embed) {
		margin: 0 auto;
		display: flex;
		padding: 10px;
	}
	:global(.main-post .fig-img) {
		justify-content: center;
		font-style: italic;
		align-items: center;
		display: flex;
		flex-direction: column;
	}
	:global(.main-post .fig-img img) {
		width: 100%;
		display: flex;
		flex-direction: column;
		/* //background-color: red; */
		margin: 0 auto;
	}
	@media only screen and (min-width: 1000px) {
		:global(.main-post .fig-img img) {
			width: 40%;
			margin: 0 auto;
		}
	}
	/* :global(.salut .fig-img img) {
		width: 100%;
	} */
</style>
