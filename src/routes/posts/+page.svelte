<script lang="ts">
	import { page } from '$app/stores';
	import Pagination from '../components/Pagination/Pagination.svelte';
	import RecipeCard from '../components/RecipeCard/RecipeCard.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	$: currentPage = $page.url.searchParams.get('page') as number;
	$: console.log('cdata', data.posts);
</script>

<div class="container m-auto text-center">
	<a class="btn bg-blue-500 rounded-lg p-2 m-4 " href="/addPost"
		>Add a post if you want to share your great recepies 😊 !</a
	>
	{#if !data.posts.length}
		<div>Nothing here 😊</div>
	{/if}
	<div class="grid lg:grid-cols-3 gap-4 mx-20 ">
		{#if data && data.posts}
			{#each data.posts as post}
				<RecipeCard {post} />
				<!-- <a href={`/posts/${post.slug}`}>{post.title}</a> -->
			{/each}
		{/if}
	</div>
	<Pagination currentPage={+currentPage} range={data.totalPages} to={'/posts?page='} />
</div>
