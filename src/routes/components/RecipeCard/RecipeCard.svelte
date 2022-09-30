<script lang="ts">
	import type { PostType } from '$root/types';
	import { Avatar } from '@brainandbones/skeleton';
	import '@brainandbones/skeleton/styles/elements/cards.css';
	export let post:PostType;
	import chef from '$lib/assets/chef.svg';
</script>

<a href={`/posts/${post.slug}`} style="text-decoration:none !important" class="text-white">
	<div
		class="card cursor-pointer h-[440px] transition-transform hover:-translate-y-1  shadow-[5px_5px] shadow-primary-300 dark:shadow-purple-900 hover:shadow-[5px_5px] hover:dark:shadow-purple-400 hover:shadow-primary-400 overflow-hidden"
	>

		<header class="relative">
			<div
				class="bg-gray-100 rounded-3xl font-semibold min-w-[145px] justify-center h-12 p-2.5 flex   gap-2 items-center absolute -bottom-4 right-2"
			>
				<Avatar
					class="w-10 h-10"
					initials={`${post.author.username
						.split(' ')
						.map((n) => n[0])
						.join('')}`}
				/>
				<div class="text-gray-900 text-center">{post.author.username}</div>
			</div>
			<img alt="Header" class="w-full h-[300px] object-cover" src={post.imageSrc || chef} />
		</header>
		<div class="card-body mt-2 font-bold capitalize text-left">{post.title}</div>
		<hr class="mx-2" />
		<footer class="card-footer flex">
			{post.description}
		</footer>
		{#if post && post.isDraft}
		<div class="absolute ml-2 bg-yellow-500 p-1 rounded-lg">Draft</div>
		{/if}
	</div>
</a>
