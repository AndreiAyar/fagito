<script lang="ts">
	let pagePattern: Array<number | string> = [];
	export let currentPage: number = 0;
	export let range: number = 0;
	export let to: string;

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
			currentPage = n;
		}
	}
</script>

<div class="flex gap-2 items-center justify-center mt-4">
	<a
		style="color: blue !important;"
		class="hover:scale-110"
		href={currentPage <= 1 ? '' : to + (currentPage - 1)}
	>
		<button disabled={currentPage <= 1}> 👈 </button>
	</a>
	<div class="flex gap-2 items-center justify-center">
		{#each pagePattern as pageLabel}
			<a
				style="text-decoration: none !important;"
				class={`p-2 h-10 w-10 text-center shadow-md no-underline bg-primary-300  dark:bg-purple-300 rounded-lg  ${
					currentPage === pageLabel ? 'bg-yellow-400 dark:bg-yellow-400' : 'text-black'
				} `}
				on:click={() => changeNumber(pageLabel)}
				href={typeof pageLabel === 'number' ? to + pageLabel : ''}
			>
				<div class={`cursor-pointer ${currentPage === pageLabel ? 'text-white' : 'text-black'}`}>
					{pageLabel}
				</div>
			</a>
		{/each}
	</div>
	<a
		class="hover:scale-110"
		style="color: blue !important;"
		href={currentPage >= range ? '' : to + (currentPage + 1)}
	>
		<button disabled={currentPage >= range}> 👉 </button>
	</a>
</div>
