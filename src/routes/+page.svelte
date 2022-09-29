<script lang="ts">
	import type { PageData } from '.svelte-kit/types/src/routes/groceries/$types';
	import Banner from './components/Banner/Banner.svelte';
	import LatestProduct from './components/LatestProduct/LatestProduct.svelte';
	import MostAuthors from './components/MostPostsAuthors/MostAuthors.svelte';
	import Pagination from './components/Pagination/Pagination.svelte';
	import RecipeCard from './components/RecipeCard/RecipeCard.svelte';
	// let currentPage = 1;
	export let data:PageData;
	// const setCurrentPage = (n:number):void => {
	// 	currentPage = n
	// 	console.log('cc',currentPage)
	// }
</script>

<div>
	<div class="m-auto pb-20">
		<div id="latest-products" class="m-auto">
			<Banner />
		</div>
	</div>
	<div class="m-auto dark:bg-surface-900  pb-8 my-8">
		<div id="latest-recipes" class="container m-auto">
			<h1 class="text-center p-4">Latest Recepies From Our Users</h1>
			<p class="text-gray-600 max-w-3xl p-4 m-auto">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
				viverra.
			</p>
			<div class="grid lg:grid-cols-3 gap-4 mx-20">
				{#if data.latesPosts}
				{#each data.latesPosts as post}
				<RecipeCard  {post} />
				{/each}
				{/if}
				<!-- <RecipeCard />
				<RecipeCard />
				<RecipeCard />
				<RecipeCard />
				<RecipeCard />
				<RecipeCard /> -->
			</div>
		</div>
	</div>

	<div class="m-auto bg-surface-200/40 dark:bg-surface-800 pt-12 pb-20 my-8">
		<div id="latest-products" class="container m-auto">
			<h1 class="text-center p-4">Latest Added Products</h1>
			<p class="text-gray-600 max-w-3xl  m-auto">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
				viverra.
			</p>
			<div class="flex gap-14 justify-center flex-wrap ">
				{#if data.latesGroceries}
				{#each data.latesGroceries as grocery}
				<LatestProduct {grocery} />
				{/each}
				{/if}
				<!-- <LatestProduct hotDiscount /> -->
				<!-- <LatestProduct />
				<LatestProduct />
				<LatestProduct />
				<LatestProduct /> -->
			</div>
		</div>
	</div>

	<div class="m-auto  pt-12 pb-20 my-8">
		<div id="latest-products" class="container m-auto">
			<h1 class="text-center p-4">Latest Added Products</h1>
			<p class="text-gray-600 max-w-3xl  m-auto">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo
				viverra.
			</p>
			<div class="flex gap-14 justify-center flex-wrap ">
				{#if data.authorsWithMostPosts}
				{#each data.authorsWithMostPosts as author}
			    	<MostAuthors {author}/>
				{/each}
				{/if}
				
				<!-- <MostAuthors/> -->
				<!-- <LatestProduct hotDiscount />
				<LatestProduct />
				<LatestProduct />
				<LatestProduct />
				<LatestProduct /> -->
			</div>
		</div>
	</div>
	<!-- <Pagination currentPage={currentPage} range={20} onChange={setCurrentPage}/> -->
</div>
