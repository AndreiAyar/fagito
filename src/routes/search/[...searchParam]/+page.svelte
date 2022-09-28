<script lang="ts">
	import { page } from '$app/stores';
	import GroceryCard from '$root/routes/components/GroceryCard/GroceryCard.svelte';
	import RecipeCard from '$root/routes/components/RecipeCard/RecipeCard.svelte';
	import type { PageData } from '.svelte-kit/types/src/routes/$types';
	import { fade } from 'svelte/transition';
	import { availableCategories } from './utils';

	export let data: PageData;
	let searchData, searchTerm: string;
	$: ({ searchData, searchTerm } = data);
 
</script>

<div class="container flex flex-col  m-auto ">
	<div class="p-20">Result for: <strong>{searchTerm}</strong></div>
	<h2>{searchData.result.length ===0 ? 'No results found.' : ''}</h2>
	<div class="flex flex-wrap justify-center gap-4">
		{#if searchData && searchData.category === availableCategories.GROCERIES_TYPE}
			{#if searchData?.result}
				{#each searchData.result as grocery (grocery.id + '' + grocery.updatedAt)}
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
			{/if}
		{/if}

		{#if searchData && searchData.category === availableCategories.RECIPES_TYPE}
		{#if searchData?.result}
			{#each searchData.result as post (post.id + '' + post.updatedAt)}
				<div class="w-[20%] min-w-[256px]" in:fade={{ duration: 500 }}>
					<RecipeCard {post} />
				</div>
			{/each}
		{/if}
	{/if}
	</div>
</div>
