<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from '.svelte-kit/types/src/routes/addPost/$types';
	import { onMount } from 'svelte';
    export let data:PageData;
	onMount(() => {
        if(data && data.postId){
            goto(`/addPost/${data.postId}`);
        }else{
            goto(`/addPost/new-post`);
        }
	});
</script>
