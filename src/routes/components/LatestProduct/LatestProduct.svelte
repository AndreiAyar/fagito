<script lang="ts">
	export let hotDiscount: Boolean | undefined = undefined;
	$: hotDiscoutnClass = hotDiscount ? 'bg-gradient-to-r from-pink-500 to-yellow-500' : '';
</script>

<div class="mt-20 cursor-pointer transition-transform hover:-translate-y-1">
	<div
		class="w-[200px] h-[160px] rounded-3xl bg-primary-400 dark:bg-purple-900 shadow-xl {hotDiscoutnClass}"
	>
		<div class="relative object-contain h-[90px]">
			<div
				class="absolute bg-white rounded-full  w-28 h-28  -top-10 left-11 flex justify-center shadow-lg "
			>
				<img
					class="w-28 rounded-full  object-contain"
					alt="Food"
					src="https://svstore.s3.amazonaws.com/Auchan/lamai%2C-500g-LWCAmR9FRkatDQB6yGTUmA.jpg"
				/>
				{#if hotDiscoutnClass} <div class="absolute bottom-0 -right-5">🔥</div>{/if}
			</div>
		</div>

		<div
			class="text-white text-center p-1 font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap "
		>
			Carne de curcan
		</div>

		<div class="text-white font-bold flex items-center gap-5 justify-evenly">
			<div>RON50</div>
			<div class="text-2xl">👉</div>
		</div>
	</div>
</div>
