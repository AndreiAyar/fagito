<script lang="ts">
	import { page } from '$app/stores';
import type { PageData } from './$types';
	export let data: PageData;
 
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if !data.user}
	<a href="/login">Login</a>
{:else}
	Welcome {data.user}
{/if}

<a href="/register">Register</a>

<a href="/groceries">Groceries</a>
