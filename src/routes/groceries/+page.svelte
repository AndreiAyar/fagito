<script lang="ts">
	import type { PageData } from '.svelte-kit/types/src/routes/groceries/$types';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import type { Action } from './$types';
	import GroceryCard from '../components/GroceryCard/GroceryCard.svelte';
	export let data: PageData;
	let loading = false;
	export let form: Action;
	$: groceries = data.groceries;
</script>

<section>
	<div>
		Add Grocery:
		<form
			method="POST"
			use:enhance={({ form }) => {
				loading = true;
				return async ({ result }) => {
					loading = false;
					await invalidateAll();
					await applyAction(result);
					if (result.type === 'success') {
						console.log('res', result.type);
						form.reset();
					}
				};
			}}
		>
			<input type="url" name="url" />
			<button type="submit" disabled={loading}>Apply!</button>
			{form?.message ?? ''}
			{#if form?.productExists}
				<p>Product Already exists!</p>
			{/if}
		</form>
	</div>

	<p>Available groceries:</p>
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
</section>

<style>
	.placeholder-circle {
		border-radius: 10px;
		margin: 2px;
	}
</style>
