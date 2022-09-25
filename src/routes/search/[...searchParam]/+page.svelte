<script lang="ts">
	import { page } from '$app/stores';
	import GroceryCard from '$root/routes/components/GroceryCard/GroceryCard.svelte';
	import type { PageData } from '.svelte-kit/types/src/routes/$types';
	import { fade } from 'svelte/transition';

	export let data: PageData;
	let searchResult, searchTerm: string;
	$: ({ searchResult, searchTerm } = data);
</script>

<div class="container flex flex-col  m-auto ">
	<div class="p-20">Caut:{searchTerm}</div>
	<div class="flex flex-wrap justify-center gap-4">
		{#if searchResult?.length}
			{#each searchResult as grocery (grocery.id + '' + grocery.updatedAt)}
				<div class="w-[20%] min-w-[256px]" in:fade={{ duration: 500 }}>
					<GroceryCard
						title={grocery.title}
						vendorTitle={grocery.vendor.title}
						vendorId={grocery.vendorId}
						price={(grocery.lastPrice)}
						url={grocery.url}
						imageSrc={grocery.imageSrc}
					/>
				</div>
			{/each}
		{/if}
	</div>
</div>
