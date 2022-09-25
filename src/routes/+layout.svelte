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
	let searchVal: string;
	export let data: PageData;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar padding="px-7 py-2 ">
			<svelte:fragment slot="lead"
				><a href="/"><img class="w-36" alt="Fagito branding" src={logo} /></a></svelte:fragment
			>
			<div class="max-w-2xl flex items-center">
				<input type="text" placeholder="Type to search..." />
			</div>
			<svelte:fragment slot="trail">
				<Auth {data} />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="mt-2" />
	<slot />
	<svelte:fragment slot="pageFooter">Footer</svelte:fragment>
</AppShell>
