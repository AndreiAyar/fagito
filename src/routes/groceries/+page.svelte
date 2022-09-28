<script lang="ts">
	import type { PageData } from '.svelte-kit/types/src/routes/groceries/$types';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import type { Action } from './$types';
	import GroceryCard from '../components/GroceryCard/GroceryCard.svelte';
	import Pagination from '../components/Pagination/Pagination.svelte';
	import { page } from '$app/stores';
	export let data: PageData;
	let loading = false;
	export let form: Action;
	$: groceries = data.groceries;
	$: totalPages = data.totalPages;
	$: currentPage = $page.url.searchParams.get('page') as number;
</script>

<section class="container m-auto text-center">
	<div class="w-[40%] text-center m-auto ">
		<h3 class="p-2">Want to increase our list ? Add a grocery 😊</h3>
		<form
			class=" flex gap-2 lg:flex-row flex-col"
			method="POST"
			use:enhance={({ form }) => {
				loading = true;
				return async ({ result }) => {
					loading = false;
					await invalidateAll();
					await applyAction(result);
					if (result.type === 'success') {
						form.reset();
					}
				};
			}}
		>
			<input type="url" name="url" class="mt-2" />
			<button class="btn bg-blue-400 rounded-lg shadow-lg mt-2" type="submit" disabled={loading}
				>Add your grocery!</button
			>
			<!-- {form?.message ?? ''} -->
			{#if form?.productExists}
				<p>Product Already exists!</p>
			{/if}
		</form>
	</div>
	{#if !groceries || !groceries.length}
		<h2>Nothing here 😊</h2>
	{:else}
		<p class="font-bold mb-4 mt-4">Available groceries:</p>
	{/if}

	<div class="container flex flex-wrap justify-center m-auto gap-4">
		{#if loading}
			<div class="w-[20%] min-w-[256px] space-y-4 h-full">
				<div class="placeholder-circle animate-pulse h-full round" />
				<div class="placeholder animate-pulse" />
				<div class="placeholder animate-pulse w-40" />
				<div class="placeholder animate-pulse w-32" />
				<div class="placeholder animate-pulse" />
			</div>
		{/if}

		{#each groceries as grocery (grocery.id + '' + grocery.updatedAt)}
			<div class="w-[20%] min-w-[256px]" in:fade={{ duration: 500 }}>
				<GroceryCard
					title={grocery.title}
					vendorTitle={grocery.vendor.title}
					vendorId={grocery.vendorId}
					price={grocery.lastPrice}
					url={grocery.url}
					imageSrc={grocery.imageSrc}
				/>
			</div>
		{/each}
	</div>
	<Pagination {currentPage} range={totalPages} to={'/groceries?page='} />
</section>

<style>
	.placeholder-circle {
		border-radius: 10px;
		margin: 2px;
	}
</style>
