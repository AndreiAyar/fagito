<script lang="ts">
	import { applyAction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import food from '$lib/assets/cook.svg';
	import { validateEmail } from './utils/index';

	import type { Prisma } from '@prisma/client';
	import type { AccountCreationErrorType } from 'src/types';
	import type { Action } from './$types';

	export let accInputs: Prisma.UserCreateInput = {
		email: '',
		username: '',
		password: '',
		repeatPassword: ''
	};
	export let validationErrors: AccountCreationErrorType = {
		accountCreator: {
			...accInputs
		}
	};
	export let form: Action;
	async function handleSubmit(this: any, event: Event) {
		const data = new FormData(this);
		let formValid: boolean = true;
		const form = event.target as HTMLFormElement;

		const { email, username, password, repeatPassword } = accInputs;
		if (!username || username.length === 0 || username.length < 4) {
			validationErrors.accountCreator.username = 'Please enter a username of at least 4 characters';
			formValid = false;
		} else {
			validationErrors.accountCreator.username = '';
		}

		if (!validateEmail(email) || email.length === 0) {
			validationErrors.accountCreator.email = 'Invalid email';
			formValid = false;
		} else {
			validationErrors.accountCreator.email = '';
		}

		if (!password || password.length < 6) {
			validationErrors.accountCreator.password =
				'Please enter a password of at least 6 characters.';
			formValid = false;
		} else {
			validationErrors.accountCreator.password = '';
		}

		if (!repeatPassword || repeatPassword !== password) {
			validationErrors.accountCreator.repeatPassword = 'Passwords do not match.';
			formValid = false;
		} else {
			validationErrors.accountCreator.repeatPassword = '';
		}

		if (!formValid) {
			return;
		}
		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});
		const result = await response.json();

		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
			form.reset();
			setTimeout(() => {
				goto('/login');
			}, 3000);
		}

		applyAction(result);
	}
</script>

<section class="container m-auto ">
	<form
		method="POST"
		on:submit|preventDefault={handleSubmit}
		class="w-[450px] mx-auto mt-[200px] rounded-lg bg-primary-400 shadow-xl dark:bg-purple-500 p-10"
	>
		<label for="username">
			Username:
			<input
				minlength="4"
				required
				id="username"
				aria-label="Username"
				placeholder="Please enter a username"
				type="text"
				name="username"
				bind:value={accInputs.username}
			/>
			<span>{validationErrors.accountCreator.username}</span>
		</label>

		<label for="email">
			Email:
			<input
				required
				id="email"
				aria-label="Email"
				placeholder="Please enter an email"
				type="email"
				name="email"
				bind:value={accInputs.email}
			/>
			<span>{validationErrors.accountCreator.email}</span>
		</label>

		<label for="password">
			Password:
			<input
				required
				minlength="6"
				id="password"
				aria-label="Enter your password"
				placeholder="Please enter a password"
				type="password"
				name="password"
				bind:value={accInputs.password}
			/>
			<span>{validationErrors.accountCreator.password}</span>
		</label>

		<label for="password-repeat">
			Repeat password:
			<input
				required
				minlength="6"
				id="password-repeat"
				aria-label="Repeat your password"
				placeholder="Please repeat your password"
				type="password"
				name="password-repeat"
				bind:value={accInputs.repeatPassword}
			/>
			<span>{validationErrors.accountCreator.repeatPassword}</span>
		</label>
		{#if form && form?.success} <p class="bg-green-400 rounded-lg mb-2 p-2 text-center">Account Created</p> {/if}
		{#if form && form.message} <p class="bg-warning-500 rounded-lg mb-2 p-2">{form.message}</p> {/if}
		<button class="btn rounded-md 	bg-accent-300 btn-lg text-white">
			<span>Register</span>
			<span>🍔 </span></button
		>
	</form>
	<div>
		<img
			src={food}
			alt="Chef"
			class="absolute top-[70%] z-[-1] left-[30%] -translate-x-[50%] -translate-y-[50%]"
		/>
	</div>
</section>

<style>
	label {
		display: flex;
		flex-direction: column;
	}
	label span {
		color: rgb(138, 53, 53);
		font-style: italic;
	}
</style>
