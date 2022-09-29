<script lang="ts">
	import { page } from '$app/stores';
	import type { PostType } from '$root/types';
	import { writable, type Writable } from 'svelte/store';
	import Pagination from '../components/Pagination/Pagination.svelte';
	import RecipeCard from '../components/RecipeCard/RecipeCard.svelte';
	import { TabGroup, Tab } from '@brainandbones/skeleton';
	import type { PageData } from './$types';
	let storeTab: Writable<string> = writable('a');
	interface PostsType extends PageData {
		posts: PostType[];
	}

	$: currentPage = $page.url.searchParams.get('page') as any;

	export let data: PostsType;
</script>

<TabGroup
	selected={storeTab}
	justify="justify-start md:justify-center"
	highlight="border-accent-500"
	color="text-accent-500"
>
	<Tab value="a">Manage your posts</Tab>
	<Tab value="b">Account management</Tab>
</TabGroup>
{#if $storeTab === 'a'}
	<div class="container m-auto text-center">
		<div class="grid lg:grid-cols-3 gap-4 mx-20 mt-4">
			{#if !data.posts.length}
				<div>Nothing here 😊</div>
			{/if}
			{#if data && data.posts}
				{#each data.posts as post}
					<RecipeCard {post} />
				{/each}
			{/if}
		</div>
		<Pagination currentPage={+currentPage} range={data.totalPages} to={'/account?page='} />
	</div>
{/if}
{#if $storeTab === 'b'}
	<section class="container m-auto ">
		<form
			method="POST"
			class="w-[450px] mx-auto mt-[200px] rounded-lg bg-primary-400 shadow-xl dark:bg-purple-500 p-10"
		>
	 

			<label for="email">
				Email:
				<input
					required
					id="email"
					aria-label="Email"
					placeholder="Please enter your email"
					type="email"
					name="email"
				/>
			</label>

			<label for="old-password">
				Old Password:
				<input
					required
					minlength="6"
					id="password"
					aria-label="Enter your last password"
					placeholder="Enter your last password"
					type="password"
					name="password"
				/>
			</label>

			<label for="new-password">
				New password:
				<input
					required
					minlength="6"
					id="new-password"
					aria-label="Enter your new password"
					placeholder="Repeat your new password"
					type="password"
					name="new-password"
				/>
			</label>
            <label for="new-password-repeat">
				Repeat password:
				<input
					required
					minlength="6"
					id="new-password-repeat"
					aria-label="Enter your new password"
					placeholder="Repeat your new password"
					type="password"
					name="new-password-repeat"
				/>
			</label>
			<button class="btn rounded-md 	bg-accent-300 btn-lg text-white">
				<span>Update account</span>
				<span>🍔 </span></button
			>
		</form>
	</section>{/if}
