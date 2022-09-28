<script lang="ts">
	import type { PageData } from '.svelte-kit/types/src/routes/$types';
	import { Avatar, filter, Menu, Apollo, LightSwitch } from '@brainandbones/skeleton';
	export let data: PageData;
</script>

<div class="cursor-pointer flex items-center space-x-4">
	<ul class="flex gap-4 items-center">
		<LightSwitch />
		{#if data.username}
			<li>
				<a class="btn inline-block bg-yellow-500 text-white p-2 rounded-md " href="/addPost">{'Manage draft'}</a>
			</li>
		{/if}
		{#if !data.username}
			<li><a href="/login">Login</a></li>
			<li><a href="/register">Register</a></li>
		{/if}
		<li>
			<a href="/posts">Posts</a>
		</li>
		<li>
			<a href="/groceries">Groceries</a>
		</li>
	
	</ul>
	{#if data.username}
		<Menu select={false} open={false} origin="tr">
			<div
				class="flex items-center gap-5 bg-primary-400 dark:bg-purple-900 text-white font-semibold rounded-3xl pl-2 lg:pl-3 pr-2 py-1"
				slot="trigger"
			>
				<div class="lg:block hidden">{data.username}</div>
				<Avatar slot="trigger" src="https://i.pravatar.cc/" action={filter} actionParams="Apollo" />
			</div>
			<div slot="content" class="card w-[200px] shadow-xl overflow-hidden">
				<nav class="list-nav">
					<ul>
						<li><a href={'/'}>Account</a></li>
						<hr />
						<li><a href={'/logout'}>Log Out</a></li>
					</ul>
				</nav>
			</div>
		</Menu>{/if}
</div>
