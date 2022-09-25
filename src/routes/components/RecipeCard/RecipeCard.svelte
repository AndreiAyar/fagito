<script lang="ts">
	import { Avatar } from '@brainandbones/skeleton';
	import '@brainandbones/skeleton/styles/elements/cards.css';
</script>

<!-- slotHeader="-mt-4 -mx-4"
slotBody="space-y-4"
slotFooter="flex justify-start items-center space-x-4"
class="cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-xl overflow-hidden" -->
<div>
	<div
		class="card cursor-pointer transition-transform hover:-translate-y-1  shadow-[5px_5px] shadow-primary-300 dark:shadow-purple-900 hover:shadow-[5px_5px] hover:dark:shadow-purple-400 hover:shadow-primary-400 overflow-hidden"
	>
		<header class="relative">
			<div
				class="bg-gray-100 rounded-3xl font-semibold min-w-[120px]  h-12 p-2.5 flex justify-between items-center absolute -bottom-4 right-2"
			>
				<Avatar class="w-10 h-10" src="https://i.pravatar.cc/" />
				<div class="text-gray-900">Andrei</div>
			</div>
			<img alt="Header" class=" min-h-[200px] object-cover " src="https://source.unsplash.com/random/1280x540?skeleton" />
		</header>
		<div class="card-body mt-2">Detalii despre reteta...</div>
		<hr class="mx-2" />
		<footer class="card-footer flex">
			Footer despreDa asdasdasd asdas<br />
			asdasdasd
		</footer>
	</div>
</div>
