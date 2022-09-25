<script lang="ts">
	import type { PageData } from '.svelte-kit/types/src/routes/posts/$types';
	export let data: PageData;
	import edjsParser from 'editorjs-parser';
	const parser = new edjsParser();
	const parsedData = data && data.content && parser.parse(data.content);
</script>

<section>
	testttttt Title {data.title}
	<div class="salut">
		{@html parsedData}
	</div>
	<p>sal</p>
</section>

<style>
	.salut {
		width: 100%;
	}
	:global(.salut .paragraph) {
		background-color: red;
	}
	:global(.salut .fig-img, .salut .embed) {
		margin: 0 auto;
		display: flex;
	}
	:global(.salut .fig-img img) {
		width: 100%;
		background-color: red;
		margin: 0 auto;
	}
	@media only screen and (min-width: 1000px) {
		:global(.salut .fig-img img) {
			width: 40%;
			margin: 0 auto;
		}
	}
	/* :global(.salut .fig-img img) {
		width: 100%;
	} */
</style>
