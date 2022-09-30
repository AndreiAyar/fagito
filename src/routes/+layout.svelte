<script lang="ts">
	import { AppShell, AppBar, ProgressRadial } from '@brainandbones/skeleton';
	import '../theme.postcss'; // <--
	import '../app.postcss';
	import '@brainandbones/skeleton/styles/all.css';

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
	const date = new Date();
	$: $loading = !!$navigating;
</script>

<AppShell>
	{#if $loading}
		<div
			class="absolute w-full top-0 h-full backdrop-blur-lg z-[100] flex items-center justify-center"
		>
			<div>
				<ProgressRadial class="w-32 m-auto mb-2" stroke={30} />
			</div>
		</div>
	{/if}
	<svelte:fragment slot="header">
		<AppBar padding="px-7 py-2">
			<svelte:fragment slot="lead"
				><a href="/"><img class="w-36" alt="Fagito branding :)" src={logo} /></a></svelte:fragment
			>
			<Search />
			<svelte:fragment slot="trail">
				<Auth {data} />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="mt-2" />
	<slot />
	<svelte:fragment slot="pageFooter"
		><div class="bg-primary-400 p-2 mt-14 text-center text-surface-50 dark:bg-purple-900">
			&copy; Copyright {date.getFullYear()}, Fagito
		</div></svelte:fragment
	>
</AppShell>
