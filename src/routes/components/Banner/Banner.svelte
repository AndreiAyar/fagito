<script lang="ts">
	import food from '$lib/assets/cook.svg';
	import chef from '$lib/assets/chef.svg';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	let searchValue: string;
	let searchIn:string;
</script>

<div
	class="flex justify-between items-center pt-20 lg:p-20 relative bg-surface-200/40 dark:bg-surface-800  w-full h-[450px]"
>
	<img
		alt="What to eat ? "
		class="w-[30%] z-[1] min-w-[300px] transform scale-x-[-1] object-contain absolute -left-[20%] lg:left-[1%] -bottom-0 mt-auto "
		src={chef}
	/>
	<!-- 
	<img
		alt="What to eat ? "
		class="w-[600px] object-contain absolute left-[50] -bottom-1 mt-auto "
		src={kitchen}
	/> -->

	<form
	method="GET"
	use:enhance={({ cancel }) => {
		const searchTerm = searchValue.split('/').join(' ')
		cancel();
		goto(`/search/${searchTerm}/cat/${searchIn}`)
	  }}
		class="w-[50%] z-10 min-w-[450px] mx-auto mb-auto mt-20 h-10 flex gap-[1px] bg-primary-300 dark:bg-purple-900 dark:hover:bg-purple-400 hover:bg-primary-400 shadow-[5px_5px] shadow-primary-300 dark:shadow-purple-900 hover:shadow-[5px_5px] hover:dark:shadow-purple-400 hover:shadow-primary-400"
	>
		<div class="w-[60%]">
			<input
		     	required
				name="searchValue"
				type="text"
				bind:value={searchValue}
				placeholder="Caut mai specific.."
			/>
		</div>

		<div class="w-[20%] min-w-[150px]">
			<select id="cars" name="searchIn" required bind:value={searchIn}>
				<option value="" selected disabled hidden>Choose here</option>
				<option value="post">Recipe</option>
				<option value="groceries">Products</option>
			</select>
		</div>
		<button class="btn w-[20%] ml-0 dark:bg-purple-700 bg-primary-200">Search now</button>
	</form>

	<img
		alt="What to eat ? "
		class="w-[20%]  min-w-[200px]  object-contain ml-auto  absolute right-[1%] -bottom-0 mt-auto"
		src={food}
	/>
</div>

<style>
	/* input{background-color: transparent!important;} */
	input,
	select {
		border-radius: 0;
		border: 0;
		outline: none;
	}
	input:focus,
	select:focus {
		box-shadow: none;
	}
</style>
