<script lang="ts">
	import { vendorBranding } from '$root/routes/components/GroceryCard/utils';
	import '@brainandbones/skeleton/styles/elements/cards.css';
	export let imageSrc: string;
	export let price: number;
	export let title: string;
	export let url: string;
	export let vendorTitle: string;
	export let slug:string;
	export let vendorId: number;
</script>

<!-- slotHeader="-mt-4 -mx-4"
slotBody="space-y-4"
slotFooter="flex justify-start items-center space-x-4"
class="cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-xl overflow-hidden" -->
<a href={`/grocery/${slug}`}>
	<div>
		<div
			class="h-[450px] relative card cursor-pointer transition-transform hover:-translate-y-1  shadow-[5px_5px] shadow-primary-300 dark:shadow-purple-900 hover:shadow-[5px_5px] hover:dark:shadow-purple-400 hover:shadow-primary-400 overflow-hidden"
		>
			<header class="relative">
				<img alt="Header" class="bg-white min-h-[200px] object-cover " src={imageSrc} />
				<div
					class="absolute -bottom-4 right-2 bg-primary-400 border-[5px] border-gray-200 dark:border-gray-800 dark:bg-purple-700 p-1 text-white rounded-lg"
				>
					<img
						class="w-20 h-6 object-contain"
						alt={vendorTitle}
						src={vendorBranding[vendorId].imagePath}
					/>
				</div>
			</header>
			<div class=" flex flex-col">
				<div class="card-body mt-2">{title}</div>
	
				<div class="absolute bottom-3 left-4 font-bold">
					{price.toFixed(2)} Lei
				</div>
				<div class="absolute bottom-2 right-4 font-bold text-3xl">
					<a href={url} target="_blank">👉</a>
				</div>
			</div>
		</div>
	</div>
	
</a>
