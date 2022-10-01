<script lang="ts">
	import { page } from '$app/stores';
	import type { PostType } from '$root/types';
	import { ListBox, ListBoxItem } from '@brainandbones/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import Pagination from '../components/Pagination/Pagination.svelte';
	import RecipeCard from '../components/RecipeCard/RecipeCard.svelte';
	import type { PageData } from './$types';
	interface PostsType extends PageData {
		posts:PostType[]
	}
	export let data: PostsType;
	$: currentPage = $page.url.searchParams.get('page') as any;
	$: currentAuthor = $page.url.searchParams.get('author') as any;
	let filterHidden:boolean = true;
	const storeSingleAutohr: Writable<number> = writable(-1);
	$:data, filterHidden = true
</script>

<div class="container m-auto text-center">
	<div class={`flex justify-center h-20  mb-10 sm:mb-0 mt-4 sm:flex-row flex-col`}>
		<div class="flex flex-col">
			<div  class="mt-5 bg-blue-400 h-10 text-center cursor-pointer flex items-center justify-center  p-2 rounded-lg" on:click={()=>filterHidden = !filterHidden}>Filter authors</div>
			<div class="w-40 z-10 {filterHidden ? 'hidden' : 'block'}">
				{#if data.authorsWithPosts}
				<ListBox selected={storeSingleAutohr} class="h-[300px] dark:bg-purple-500 overflow-y-scroll rounded-lg p-2" label="Select author"> 
				   <ListBoxItem value={-1}>All authors</ListBoxItem>
				{#each data.authorsWithPosts as author}
				<ListBoxItem value={author.id}>{author.username}</ListBoxItem>
				{/each}
			   </ListBox>
		   
				{/if}
			   <a class="btn bg-purple-900 rounded-lg mt-1" href={`/posts?page=${!currentPage ? 1 : currentPage}${$storeSingleAutohr < 0 ? '': `&author=${$storeSingleAutohr}`}`}>Apply filter</a>
		   
			</div>
		</div>
	
		<a class="btn bg-blue-500 rounded-lg p-2 m-4 " href="/addPost"
		>Add a post if you want to share your great recepies 😊 !</a
	>
	</div>

	{#if !data.posts.length}
		<div>Nothing here 😊</div>
	{/if}
	<div class="grid lg:grid-cols-3 gap-4 mx-20 ">
		{#if data && data.posts}
			{#each data.posts as post}
				<RecipeCard {post} />
			{/each}
		{/if}
	</div>
	<Pagination currentPage={+currentPage} range={data.totalPages} to={'/posts?page='} additionalParam={[{name:'author', value:currentAuthor}]} />
</div>
