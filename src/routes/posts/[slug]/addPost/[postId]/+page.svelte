<script lang="ts">
	import EditorJS, { type OutputData } from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import List from '@editorjs/list';
	import Embed from '@editorjs/embed';
	import ImageTool from '@editorjs/image';
	import edjsParser from 'editorjs-parser';
	import Table from '@editorjs/table';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import GroceryWidget from '$root/routes/components/GroceryWidget/GroceryWidget.svelte';

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
						byFile: 'api/image-upload' // Your backend file uploader endpoint
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

	const parser = new edjsParser();
	let outputData: OutputData;
	let postTitle: string = "Draft";
	$: parsedData = outputData && parser.parse(outputData);
	const addPost = async (payload:{isDraft:boolean}) => {
		const data = new FormData();
		outputData = await editor.save();
		const postData = {
			content:JSON.stringify(outputData),
			title:postTitle.toLowerCase().split(' ').join('-'),
			isDraft: payload.isDraft
		}
		data.append('postData',JSON.stringify(postData))
		let resp = await fetch('?/addPost', {
			method: 'POST',
			body: data
		});
		let ads = await resp.json();
		if (resp.status === 200 && !ads.data.isDraft) {
			goto(`/posts/${ads.data.slug}`);
		}
	};
	onMount(async () => {
		let interval = setInterval(async () => {
			outputData = await editor.save();
		}, 5000);
		await editor.isReady;
		editor.blocks.render({
			time: 1663781476472,
			blocks: [{ id: 'jBlHs0y2Zk', data: { text: 'da da' }, type: 'paragraph' }],
			version: '2.25.0'
		});
		await addPost({isDraft:true})
		return () => clearInterval(interval);
	});

</script>

<section class="w-full ">
	Sal!
	<input bind:value={postTitle} />
	<div
		class="w-[55%] transition-all ease-linear m-auto bg-primary-300 dark:bg-purple-600 rounded-3xl shadow-inner flex items-center align-center justify-center"
	>
		<div
			id="editorjs"
			class="bg-white min-h-[700px] dark:bg-slate-900 m-10 w-full rounded-md shadow-2xl dark:text-white "
		/>
	</div>
	<GroceryWidget />
	<!-- {#if parsedData}
		{@html parsedData}
	{/if} -->
	<button on:click={addPost}>AddPost</button>
</section>
