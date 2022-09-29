<script lang="ts">
	import type { Prisma } from "@prisma/client";


	export let author:Prisma.UserCreateManyInput;
</script>
<!--   -->
<a href={`/posts?page=1&author=${author.id}`} > 
	<div class="mt-20 cursor-pointer transition-transform hover:-translate-y-1">
	<div
		class="w-[200px] h-[160px] rounded-3xl bg-primary-400 dark:bg-purple-900 shadow-xl "
	>
		<div class="relative object-contain h-[90px]">
			<div
				class="absolute bg-white rounded-full  w-28 h-28  -top-10 left-11 flex justify-center shadow-lg "
			>
				<img
					class="w-28 rounded-full  object-contain"
					alt="Food"
					src={`https://i.pravatar.cc/${250*(author.id || 1)}`}
				/>
			</div>
		</div>

		<div
	 
			class="text-white text-center p-1 w-[95%] pl-4 font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap "
		>
			{author.username}
		</div>

		<div class="text-white font-bold flex items-center px-4 justify-center">
			<!-- <div>RON{grocery.lastPrice}</div> -->
			<div class="text-2xl">👉</div>
		</div>
	</div>
</div>
 
</a>
 
