<script lang="ts">
	import type { Action } from './$types';
	import { enhance } from '$app/forms';
	import chef from '$lib/assets/chef.svg';
	export let form: Action;
</script>

<section class="container m-auto flex">
	<form
		method="POST"
		class="w-[450px] mx-auto mt-[250px] rounded-lg bg-primary-400 shadow-xl dark:bg-purple-500 p-10"
		use:enhance
	>
		<label for="email" class="pt-10">
			Email:
			<input
				id="email"
				aria-label="Enter your email"
				placeholder="Enter your email"
				name="email"
				type="text"
				value={form?.email ?? ''}
			/>
		</label>
		<label for="passsword" class="pt-5">
			Password:
			<input
				id="password"
				aria-label="Enter your password"
				placeholder="Please enter your password"
				name="password"
				type="password"
			/>
		</label>
		{#if form && form.message} <p class="bg-warning-500 rounded-b-lg p-2">{form.message}</p> {/if}

		{#if form?.success}
			<p>Successfully logged in!</p>
		{/if}
		<button class="btn mt-2 bg-blue-300 rounded-lg" type="submit">Log in</button>
	</form>
	<div>
		<img
			src={chef}
			alt="Chef"
			class="absolute top-[50%] z-[-1] left-[50%] -translate-x-[50%] -translate-y-[50%]"
		/>
	</div>
</section>
