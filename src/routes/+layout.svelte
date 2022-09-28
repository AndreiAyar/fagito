<script lang="ts">
	import { AppShell, AppBar } from '@brainandbones/skeleton';
	import '../theme.postcss'; // <--
	import '../app.postcss';
	import '@brainandbones/skeleton/styles/all.css'; // <--

	import '@brainandbones/skeleton/styles/elements/buttons.css';
	import '@brainandbones/skeleton/styles/forms.css';
	import '@brainandbones/skeleton/styles/typography.css';
	import '@brainandbones/skeleton/styles/all.css';
	import '@brainandbones/skeleton/themes/theme-skeleton.css';
	import logo from '$lib/assets/logo.png';

	import type { PageData } from './$types';
	import Auth from './components/Auth/Auth.svelte';

	import { navigating } from '$app/stores';

	import { loading } from '../store';
	import Search from './components/Search/Search.svelte';

	export let data: PageData;
	$: $loading = !!$navigating;
</script>

<AppShell>
	{#if $loading}
		<div
			class="absolute w-full top-0 h-full backdrop-blur-lg z-[100] flex items-center justify-center"
		>
			<img
				src="https://cdn.dribbble.com/users/160117/screenshots/3197970/media/1f5c05158cafb49ecca277b87cedcae0.gif"
				alt="Loading!"
			/>
		</div>
	{/if}
	<svelte:fragment slot="header">
		<AppBar padding="px-7 py-2">
			<svelte:fragment slot="lead"
				><a href="/"><img class="w-36" alt="Fagito branding" src={logo} /></a></svelte:fragment
			>
			<Search/>
			<svelte:fragment slot="trail">
				<Auth {data} />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="mt-2" />
	<slot />
	<svelte:fragment slot="pageFooter">Footer</svelte:fragment>
</AppShell>
