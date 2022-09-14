<script lang="ts">
	import type { Action, PageData } from './$types';
	import { enhance } from '$app/forms'
	export let form: Action;
	export let data:PageData
</script>

<section>
	<div>Please login</div>
	{#if data && data?.user }
		Welcome { data?.user }
	{/if}
	<form method="POST"  use:enhance>
		<label for="email">
			<input
				id="email"
				aria-label="Enter your email"
				placeholder="Enter your email"
				name="email"
				type="text"
				value={form?.email ?? ''}
			/>
		</label>
		<label for="passsword">
			<input
				id="password"
				aria-label="Enter your password"
				placeholder="Please enter your password"
				name="password"
				type="password"
			/>
		</label>
		<p>{form?.message ?? ''}</p>
		{#if form?.success}
			<!-- this message is ephemeral; it exists because the page was rendered in
       response to a form submission. it will vanish if the user reloads -->
			<p>Successfully logged in!</p>
		{/if}
		<button type="submit">Log in</button>
	</form>
</section>
