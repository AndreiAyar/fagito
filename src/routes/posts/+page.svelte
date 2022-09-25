<script lang="ts">
	import EditorJS, { type OutputData } from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import List from '@editorjs/list';
	import Embed from '@editorjs/embed';
	import ImageTool from '@editorjs/image';
	import edjsParser from 'editorjs-parser';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
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
			}
		}
	});

	const parser = new edjsParser();
	let outputData: OutputData;
	let postTitle: string;
	$: parsedData = outputData && parser.parse(outputData);
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

		return () => clearInterval(interval);
	});
	const addPost = async () => {
		console.log('adding');
		const data = new FormData();
		outputData = await editor.save();
		data.append('content', JSON.stringify(outputData));
		data.append('title', postTitle.toLowerCase().split(' ').join('-'));
		let resp = await fetch('?/addPost', {
			method: 'POST',
			body: data
		});
		let ads = await resp.json();
		console.log('resp', ads);
		if (resp.status === 200) {
			goto(`/posts/${ads.data.slug}`);
		}
	};
</script>

<section>
	Sal!
	<input bind:value={postTitle} />
	<div style="width:890px">
		<div id="editorjs" />
		<button>Save!</button>
	</div>
	{#if parsedData}
		{@html parsedData}
	{/if}
	<button on:click={addPost}>AddPost</button>
</section>
