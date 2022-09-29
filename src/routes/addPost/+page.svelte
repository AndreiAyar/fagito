<script lang="ts">
	import EditorJS, { type OutputData } from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import List from '@editorjs/list';
	import Embed from '@editorjs/embed';
	import ImageTool from '@editorjs/image';
 
	import Table from '@editorjs/table';
	import { Upload } from 'upload-js';

	import { onMount } from 'svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import GroceryWidget from '$root/routes/components/GroceryWidget/GroceryWidget.svelte';
	import type { PageData } from '.svelte-kit/types/src/routes/addPost/[postId]/$types';
	import { loading, postGroceries } from '$root/store';
	import { STANDARD_BLOCKS_DATA } from './utils';
	import { ProgressRadial } from '@brainandbones/skeleton';
	import { clickOutside } from '$root/lib/clickOutside';

	const editor = new EditorJS({
		holder: 'editorjs',
		tools: {
			header: {
				class: Header,
				inlineToolbar: ['link']
			},
			list: {
				class: List,
				inlineToolbar: ['link', 'bold']
			},
			embed: {
				class: Embed,
				inlineToolbar: true,
				config: {
					services: {
						youtube: true,
						coub: true
					}
				}
			},
			image: {
				class: ImageTool,
				config: {
					endpoints: {
						byFile: 'http://127.0.0.1:5173/api/image-upload' // Your backend file uploader endpoint
					},
					additionalRequestHeaders: {
						Authorization: 'Bearer public_FW25av7a1N6cPLgUdHdUEZuikXZw'
					}
				}
			},
			table: {
				class: Table,
				inlineToolbar: true,
				config: {
					rows: 2,
					cols: 2
				}
			}
		}
	});

	export let data: PageData;
	let outputData: OutputData;
	let postTitle: string = data.draftContent?.title || '';
	let uploadedImage = data.draftContent?.imageSrc || null;
	let uploadingImage = false;
	let postDescription: string = data.draftContent?.description || null;
	let viewEditModal: boolean = false;
	let errorMessage: string;
	const addPost = async () => {
		loading.set(true);
		const formData = new FormData();
		const postData = {
			isDraft: true
		};
		formData.append('postData', JSON.stringify(postData));
		let resp = await fetch('?/addPost', {
			method: 'POST',
			body: formData
		});
		let requestData = await resp.json();
		if (requestData.type === 'invalid') {
			goto(`/`);
		}
		await invalidateAll();
		loading.set(false);
	};

	const updatePost = async (saveForLater: boolean) => {
		loading.set(true);
		errorMessage=''
		const formData = new FormData();
		outputData = await editor.save();
		if (!outputData || !postTitle || !uploadedImage || !postDescription) {
			errorMessage = 'Please fill all the fields!';
			loading.set(false);
			return;
		}
		const postData = {
			content: JSON.stringify(outputData),
			title: postTitle,
			description: postDescription,
			//Be sure to check if postId is of current logged in user
			postId: data.draftContent.id,
			isDraft: !!saveForLater,
			postGroceries: $postGroceries,
			uploadedImage
		};
		formData.append('postData', JSON.stringify(postData));
		const fss = new FormData();

		let resp = await fetch('?/updatePost', {
			method: 'POST',
			body: formData
		});
		let requestData = await resp.json();
		if (requestData.type === 'success' && requestData?.data?.slug && !requestData.data.isDraft) {
			goto(`/posts/${requestData.data.slug}`);
		}
		if (requestData.type === 'invalid') {
			goto(`/`);
		}
		loading.set(false);
	};

	onMount(async () => {
		loading.set(true);

		await editor.isReady;
		const blocksContent = data.draftContent?.content as unknown as OutputData;
		editor.blocks.render({
			blocks: blocksContent?.blocks || STANDARD_BLOCKS_DATA,
			version: '2.25.0'
		});
		if (!data.draftContent) {
			await addPost();
		}
		if (data && data.draftContent && data.draftContent.postGroceries) {
			$postGroceries = data.draftContent.postGroceries;
		}

		loading.set(false);
	});
	const upload = new Upload({ apiKey: 'public_FW25av7a1N6cPLgUdHdUEZuikXZw' });
	async function onFileSelected(event) {
		uploadingImage = true;
		const [file] = event.target.files;
		const { fileUrl } = await upload.uploadFile(file);
		uploadedImage = fileUrl;
		uploadingImage = false;
	}
	const handleClickOutside = () => {
		viewEditModal = false;
	};
</script>

<div />
<section class="w-full mt-14">
	<div class="w-[50%] m-auto text-center mb-4">
		<p
			class="dark:bg-purple-700 bg-primary-300 font-semibold rounded-t-lg z-30 w-[50%] inline-block p-2"
		>
			Enter your post tile:
		</p>
		<input
			type="text"
			class="-m-[2px] z-1"
			placeholder="Enter your post title"
			bind:value={postTitle}
		/>
	</div>
	<div
		on:click={() => (viewEditModal = !viewEditModal)}
		class="bg-purple-500 cursor-pointer w-40 text-center mx-auto mb-4 p-2 rounded-lg"
	>
		Content metadata
	</div>
	{#if viewEditModal}
		<div
			use:clickOutside
			on:click_outside={handleClickOutside}
			class=" z-[100] absolute backdrop-blur-sm w-full h-full m-auto "
		>
			<div
				class="w-[550px] relative m-auto h-auto min-h-[350px] shadow-lg rounded-lg bg-primary-200 dark:bg-purple-500"
			>
				<div
					on:click={() => (viewEditModal = !viewEditModal)}
					class="bg-slate-500 cursor-pointer pointer w-10 text-center rounded-lg absolute -top-2 -right-2 font-bold"
				>
					x
				</div>
				{#if uploadingImage} <ProgressRadial class="w-10 m-auto mb-2" stroke={20} />{/if}

				{#if uploadedImage}
					<div class="w-[400px] m-auto pb-2 text-center">
						<h2 class="p-2">Featured image:</h2>
						<img alt="Featured image" class="object-cover rounded-lg" src={uploadedImage} />
					</div>{/if}

				<div class="w-52 m-auto mb-4">
					<label for="file" class="btn mb-2 bg-blue-300">Upload featured image</label>
					<input hidden type="file" id="file" on:change={onFileSelected} />
				</div>
				<div class="w-[50%] m-auto pb-2">
					<textarea maxlength="50" type="text" bind:value={postDescription} />
				</div>
			</div>
		</div>
	{/if}

	<div
		class="w-[55%] transition-all ease-linear m-auto bg-primary-300 dark:bg-purple-600 rounded-3xl shadow-inner flex items-center align-center justify-center"
	>
		<div
			id="editorjs"
			class="bg-white min-h-[700px] dark:bg-slate-900 m-10 w-full rounded-md shadow-2xl dark:text-white "
		/>
	</div>

	<div
		class="w-[50%] mx-auto my-2 p-4 rounded-lg text-center h-auto shadow-lg bg-blue-200 text-white dark:bg-slate-700"
	>
		<div class="pb-4 ">Post control</div>
		<div class="pb-2 text-red-500">{errorMessage || ''}</div>
		<div class="flex items-center justify-center gap-10 ">
			<button
				class="btn bg-green-400 rounded-lg p-2"
				disabled={!loading}
				on:click={() => updatePost(false)}>AddPost</button
			>
			<button
				class="btn bg-blue-400 rounded-lg p2"
				disabled={!loading}
				on:click={() => updatePost(true)}
			>
				Save draft
			</button>
		</div>
	</div>
	<GroceryWidget />
</section>

<style>
	:global(.ce-popover, .ce-inline-toolbar) {
		color: black;
	}
	:global(.codex-editor) {
		z-index: 0;
	}
</style>
