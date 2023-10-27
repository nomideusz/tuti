<script>
  import { onMount } from 'svelte';
  import { fetchJSON } from '$lib/util';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import RichText from '$lib/components/RichText.svelte';
  import Logo from './Logo.svelte';

  export let contact;
  export let counter;
  let count;

  onMount(async () => {
    if (counter) {
      const result = await fetchJSON('GET', `/api/counter?c=${counter}`);
      count = result.count;
    }
  });
</script>
<footer class="bg-accent text-white pt-12 pb-8">

    <div class="container">
      <Logo color="white" />
      <div class="py-12 sm:py-24">
        <div class="max-w-screen-md mx-auto px-6 md:text-xl">
          <div class="prose md:prose-xl pb-12 sm:pb-24">
            <RichText multiLine bind:content={contact} />
          </div>
        </div>
      </div>
        
      {#if count}
        <div class="flex justify-center py-4">
          <div class="text-xs font-normal flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{count}</span>
          </div>
        </div>
      {/if}
    </div>

</footer>