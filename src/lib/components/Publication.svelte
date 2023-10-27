<script>
  import PlainText from './PlainText.svelte';
  import { classNames } from '$lib/util';
  import { createEventDispatcher } from 'svelte';
  import { isEditing } from '$lib/stores.js';

  const dispatch = createEventDispatcher();

  export let publication;
  export let firstEntry = false;
  export let lastEntry = false;
</script>

<div class="flex flex-row-reverse items-center relative {$isEditing ? 'h-24' : 'h-fit'}">
  <div class="grow">
    <h4 class="inline-block mr-2"><PlainText bind:content={publication.magazineTitle} /></h4>
    <h4 class="inline-block mr-2 font-bold">
      <PlainText bind:content={publication.articleTitle} />
    </h4>
    <h4 class="inline-block"><PlainText bind:content={publication.articleDate} /></h4>
  </div>
  {#if $isEditing}
    <div class="flex flex-col mr-6">
      <button
        class="w-6 h-6 p-1 rounded-full bg-gray-900 hover:bg-gray-800 text-white"
        on:click={() => dispatch('delete')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button
        class={classNames(
          'w-6 h-6 p-1 rounded-full hover:bg-gray-100',
          firstEntry ? 'opacity-20' : ''
        )}
        on:click={() => dispatch('up')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
      <button
        class={classNames(
          'w-6 h-6 p-1 rounded-full hover:bg-gray-100',
          lastEntry ? 'opacity-20' : ''
        )}
        on:click={() => dispatch('down')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
    </div>
  {/if}
</div>
