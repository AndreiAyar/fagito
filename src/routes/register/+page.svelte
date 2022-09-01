<script lang="ts">
	import { validateEmail } from '$lib/utils';

	import type { Prisma } from '@prisma/client';
	import type { AccountCreationErrorType } from 'src/types';

	import type { PageData } from '../../../.svelte-kit/types/src/routes/login/$types';
	// export let data: PageData;
	export let success: string;
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

	const handleOnSubmit = async (e: Event) => {
		let formValid: boolean = true;
		const form = e.target as HTMLFormElement;

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

		const response = await fetch('/register', {
			method: 'post',
			headers: { accept: 'application/json' },
			body: new FormData(form)
		});
		if (response.ok) {
			success = 'Account created!';
		}
		if (!response.ok) {
			const { errors } = await response.json();
			success = errors.accountCreator;
			return;
		}
		form.reset();
	};
</script>

<section>
	<div>Welcome to Register</div>
	<form method="POST" on:submit|preventDefault={handleOnSubmit}>
		<label for="username">
			Username:
			<input
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
				id="email"
				aria-label="Email"
				placeholder="Please ender an email"
				type="text"
				name="email"
				bind:value={accInputs.email}
			/>
			<span>{validationErrors.accountCreator.email}</span>
		</label>

		<label for="password">
			Password:
			<input
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
				id="password-repeat"
				aria-label="Repeat your password"
				placeholder="Please repeat your password"
				type="password"
				name="password-repeat"
				bind:value={accInputs.repeatPassword}
			/>
			<span>{validationErrors.accountCreator.repeatPassword}</span>
		</label>
		{success ?? ''}
		<button type="submit">Register</button>
	</form>
</section>

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 300px;
		gap: 10px;
	}
	input {
		height: 25px;
	}
	label {
		display: flex;
		flex-direction: column;
	}
	label span {
		color: red;
		font-style: italic;
	}
</style>
