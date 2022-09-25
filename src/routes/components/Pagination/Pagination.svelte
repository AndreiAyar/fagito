<script lang="ts">
	let pagePattern: Array<number | string> = [];
	export let currentPage: number = 0;
	export let range: number = 0;
	export let onChange: Function;

	$: switch (range > 0) {
		case range < 7:
			pagePattern = [...new Array(range)].map((_, i) => i + 1);
			break;
		case currentPage < 4:
			pagePattern = [1, 2, 3, 4, 5, '...', range];
			break;
		case currentPage > range - 4:
			pagePattern = [1, '...', range - 4, range - 3, range - 2, range - 1, range];
			break;
		default:
			pagePattern = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', range];
	}
	function changeNumber(n: number | string) {
		if (typeof n === 'number' && n > 0 && n <= range) {
			onChange(n);
		}
	}
</script>

<div class="flex gap-2">
	Page:
	<button disabled={currentPage <= 1} on:click={() => changeNumber(currentPage - 1)}>
		{'<'}
	</button>
	<div class="flex gap-2">
		{#each pagePattern as pageLabel}
			<div
				class={`cursor-pointer ${currentPage === pageLabel ? 'text-blue-500' : 'text-black'}`}
				on:click={() => changeNumber(pageLabel)}
			>
				{pageLabel}
			</div>
		{/each}
	</div>
	<button disabled={currentPage >= range} on:click={() => changeNumber(currentPage + 1)}>
		{'>'}
	</button>
</div>
