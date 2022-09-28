<script lang="ts">
	import { postGroceries } from '$root/store';
	import { Tooltip } from '@brainandbones/skeleton';
	import { fly } from 'svelte/transition';
	import Search from '../Search/Search.svelte';

	let hidden: Boolean = false;

	const calculatePrice = (neededQuantity: number, itemPrice: number, quantity: number) => {
		const finalPrice: number = +((neededQuantity * itemPrice) / quantity).toFixed(2);
		if (isNaN(finalPrice)) return 0;
		return finalPrice;
	};
	const removeRecepyItem = (removeId: number) => {
		$postGroceries = $postGroceries.filter((el) => +el.id !== removeId);
	};
	const addGrocery = (payload) => {
		const idx = $postGroceries.findIndex((el) => el.groceryId === +payload.id);
		if (idx !== -1) return;
		$postGroceries = [
			...$postGroceries,
			{
				...payload,
				quantity: 0,
				quantityUnit: 'grams',
				neededQuantityUnit: 'grams',
				neededQuantity: 0
			}
		];
	};
	$: totalPrice = $postGroceries.reduce((acc, el) => {
		const price =  +((el.neededQuantity * el.lastPrice) / el.quantity).toFixed(2)
		return (isNaN(price) ? 0 : price)  + acc;
	}, 0);
</script>

<div
	class={`sticky bottom-[50%] ml-auto mr-1 ${hidden ? 'w-[100px]' : 'w-[800px]'} h-40 rounded-lg`}
>
	{#if hidden}<div
			in:fly={{ y: 200, duration: 300 }}
			class="cursor-pointer bg-primary-200 rounded-full p-5 dark:bg-purple-600 text-center text-white  shadow-lg"
			on:click={() => (hidden = !hidden)}
		>
			Reveal
		</div>
	{/if}

	<div
		class={`transition ease-linear duration-200 ${
			hidden ? 'transform-gpu translate-x-[200px] translate-y-[50px]' : ''
		} flex items-center justify-center bg-primary-200 flex-col dark:bg-purple-600 shadow-xl h-96 w-full rounded-lg`}
	>
		{#if !hidden}<div
				class="cursor-pointer bg-primary-400 dark:bg-purple-500 text-center text-white rounded-xl p-1 shadow-lg w-24 absolute -top-4 "
				on:click={() => (hidden = !hidden)}
			>
				Hide me 😊
			</div>{/if}

		<div
			class="bg-white mt-8 dark:bg-slate-900 overflow-y-auto overflow-x-hidden w-[88%] h-[85%] shadow-lg rounded-lg"
		>
			<table class="table-fixed w-full">
				<tr class="text-sm sticky top-0 z-50 bg-white dark:bg-slate-900">
					<th>Product name</th>
					<th class="w-24">Act. QTY <span class="italic">(gr.)</span></th>
					<th class="w-24">Needed QTY <span class="italic">(gr.)</span></th>
					<th class="w-32">RON / portion</th>
				</tr>

				{#each $postGroceries as item}
					<tr class="text-sm text-center">
						<!-- <div class="flex items-center gap-10"> -->
						<td
							><div title={item.title} class="flex items-center gap-2 relative">
								<img alt={item.title} src={item.imageSrc} class="w-10 rounded-lg" />
								<div title={item.title} class="">
									<div class="flex flex-col items-start">
										<div class="w-[100%] text-left ">
											{item.title}
										</div>
										<span class="font-bold px-1 rounded-lg italic bg-primary-400"
											>{item.lastPrice}RON</span
										>
									</div>

									<div
										on:click={() => removeRecepyItem(+item.id)}
										class="cursor-pointer absolute -bottom-2 left-2.5 bg-red-700 px-2 rounded-2xl"
									>
										x
									</div>
								</div>
							</div></td
						>

						<td>
							<div>
								<input id={item.name} bind:value={item.quantity} type="number" min="1" max="9999" />
							</div>
						</td>
						<td>
							<div>
								<input
									id={item.name}
									bind:value={item.neededQuantity}
									type="number"
									min="1"
									max="9999"
								/>
							</div>
						</td>
						<td class="text-center ">
							<div class="font-semibold text-sm bg-green-400 p-1 rounded-lg mx-2 text-center">
								{calculatePrice(item.neededQuantity, item.lastPrice, item.quantity)} RON
							</div>
						</td>
					</tr>
					<!-- </div> -->
				{/each}
			</table>
		</div>
		<div class="w-[80%] p-2  text-center">
			<div class="flex items-center">
				<p class="bg-blue-300 w-32 rounded-lg p-1 mb-1 m-auto">Add Grocery 👇</p>
			
			</div>

			<Search table={'products'} onClick={addGrocery} />
			<p>Total Price: {totalPrice?.toFixed(2) || 0} RON</p>
			<!-- <div class="btn bg-blue-400 mx-2">
				Add grocery
			</div> -->
		</div>
	</div>
</div>

<style>
	td {
		padding: 10px 5px;
		width: 1150px;
	}
</style>
