<script lang="ts">
	import type { PageData } from '.svelte-kit/types/src/routes/groceries/$types';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { fade, fly } from 'svelte/transition'
	import type { Action } from './$types';
	export let data: PageData;
	let loading = false;
	export let form: Action;
	$: groceries = data.groceries;
</script>

<section>
	<div>
		{#if loading}
			Loading...
		{/if}
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
						form.reset();
					}
				};
			}}
		>
			<input type="url" name="url" />
			<button type="submit" disabled={loading}>Apply!</button>
			{form?.message ?? '' }
			{#if form?.productExists}
				<p>Product Already exists!</p>
			{/if}
		</form>
	</div>

	<p>Available groceries:</p>
	<div>
		{#each groceries as grocery (grocery.id + '' + grocery.updatedAt)}
			<div style="background-color:#bde0fe; margin:5px; width:300px"  in:fade="{{ duration: 500 }}">
				{grocery.id} : {grocery.title}
				<p>{grocery.description}</p>
				<p>{grocery.url}</p>
			</div>
		{/each}
	</div>
</section>
