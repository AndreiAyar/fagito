<script lang="ts">
	import { neededGroceriesList, checkedGroceriesFromList } from '$root/store';
	export let postId: string;
	const onGrocerySelect = (id: number) => {
		// @ts-ignore: Unreachable code error
		const idx = $checkedGroceriesFromList.findIndex((el) => el.id === id && el.postId === postId);
		if (idx === -1) {
			// @ts-ignore: Unreachable code error
			$checkedGroceriesFromList = [...$checkedGroceriesFromList, { id, postId }];
		}
		if (idx !== -1) {
			$checkedGroceriesFromList.splice(idx, 1);
			$checkedGroceriesFromList = $checkedGroceriesFromList;
		}
	};
	const calculatePrice = (neededQuantity: number, itemPrice: number, quantity: number) => {
		const finalPrice: number = +((neededQuantity * itemPrice) / quantity).toFixed(2);
		if (isNaN(finalPrice)) return 0;
		return finalPrice;
	};
	const isChecked = (id) => {
		if ($checkedGroceriesFromList) {
			return (
				// @ts-ignore: Unreachable code error
				$checkedGroceriesFromList.findIndex((el) => el.id === id && el.postId === postId) !== -1
			);
		}
	};
	let closed: boolean = true;
	$: console.log(' $checkedGroceriesFromList', $checkedGroceriesFromList);
</script>

<div
	class="cursor-pointer absolute -top-6 left-[50%] -translate-x-[50%] bg-primary-200 dark:bg-purple-400 p-1 rounded-lg text-center"
	on:click={() => (closed = !closed)}
>
	{closed ? 'Open list' : 'Close list'}
</div>
<div
	class={`${
		closed ? 'translate-x-[-1000px] absolute opacity-0' : 'absolute'
	} transition-all ease-in-out duration-150 top-20 sm:top-14 dark:bg-purple-800 min-w-[350px] bg-primary-300 p-2 max-h-[300px] overflow-y-auto rounded-b-lg shadow-lg left-[50%] -translate-x-[50%]`}
>
	{#if $neededGroceriesList}
		{#each $neededGroceriesList as postGrocery (postGrocery.id)}
			<div title={postGrocery.grocery.title} class="flex relative gap-2  px-2 py-4">
				<img
					alt={postGrocery.grocery.title}
					class="w-12 rounded-lg"
					src={postGrocery.grocery.imageSrc}
				/>
				<div class="flex-1 w-[50%] max-w-[300px] lg:max-w-[450px]">
					<p class="overflow-hidden overflow-ellipsis whitespace-nowrap">
						{postGrocery.grocery.title}
					</p>
				</div>
				<div class="absolute flex  top-10 left-16 gap-2 px-[5px]">
					<p class="bg-green-400 top-8 left-16 px-[5px] rounded-lg">
						{postGrocery.grocery.lastPrice} RON
					</p>
					<p class="bg-blue-400 top-8 left-16 px-[5px] rounded-lg">
						Portion:{calculatePrice(
							postGrocery.neededQuantity,
							postGrocery.grocery.lastPrice || 1,
							postGrocery.quantity
						)} RON
					</p>
				</div>

				<input
					on:click={() => onGrocerySelect(postGrocery.groceryId)}
					checked={isChecked(postGrocery.groceryId)}
					class="p-2 mt-2"
					type="checkbox"
				/>
			</div>
		{/each}
	{/if}
</div>
