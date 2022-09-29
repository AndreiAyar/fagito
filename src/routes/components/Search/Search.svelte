<script lang="ts">
	import { clickOutside } from '$root/lib/clickOutside';
	import type { SearchResult } from '$root/types';
	let searchData: SearchResult[];
	let searchValue: string;
	let controller: AbortController;
	let hideSearch: boolean = false;
	let timer: ReturnType<typeof setTimeout>;
	export let table:string;
    export let onClick:Function;
 
	const searchResultType: { [key: string]: string } = {
		['post']: 'posts',
		['grocery']: 'grocery'
	};
	const debounce = (cb: Function) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			cb();
		}, 100);
	};
	const resetSearch = () => {
		if (!searchValue || searchValue.length < 3) {
			searchData = [];
			return;
		}
	};
	$: handleSearch = async () => {
		if (controller) {
			controller.abort();
		}
		controller = new AbortController();
		if (!searchValue || searchValue.length < 3) return;
		try {
			const data = new FormData();
			data.append('search', searchValue);
			if(table){
				data.append('searchTable',table)
			}
			const response = await fetch('http://127.0.0.1:5173/api/search', {
				method: 'POST',
				body: data,
				signal: controller.signal
			});
			let result = await response.json();
			console.log('result', result);
			if (result && result.foundEntries.length) {
				searchData = result.foundEntries;
			}
		} catch (error) {
			console.log('Abort Request: ' + error);
		}
	};
	function handleClickOutside() {
		hideSearch = true;
	}
	function handleOnClick(payload) {
		onClick(payload);
		hideSearch= true;
	}
    $:searchValue, resetSearch();
</script>

<div use:clickOutside on:click_outside={handleClickOutside} class="relative max-w-2xl">
	<form class="max-w-2xl flex items-center" on:submit|preventDefault={() => debounce(handleSearch)}>
		<input
			name="search"
			id="search"
			type="text"
			bind:value={searchValue}
			on:input={() => debounce(handleSearch)}
			on:click={() => (hideSearch = false)}
			placeholder="Type to search..."
		/>
	</form>
	{#if searchData && searchData.length && !hideSearch}
		<div class="absolute z-50 bg-primary-100 dark:bg-purple-900 w-full overflow-y-scroll max-h-96">
			{#each searchData as searchResult, index (searchResult.title + index)}
				<div class="flex hover:bg-primary-200 dark:hover:bg-purple-800" on:click={()=>handleOnClick(searchResult)}>
					<a
						class="flex items-center p-2 gap-2"
						href={onClick ? "":`/${searchResultType[searchResult.table_name]}/${searchResult.slug}`}
					>
						<img class="w-10 rounded-md" src={searchResult.imageSrc} alt={searchResult.title} />
						<p class="text-left">
							{searchResult.title}
							<span class="capitalize font-bold">({searchResult.table_name})</span>
						</p>
					</a>
				</div>
			{/each}
		</div>
	{/if}
</div>
