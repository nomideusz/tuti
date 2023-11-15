<script>
  import PlainText from './PlainText.svelte';
  import { classNames } from '$lib/util';
  import { createEventDispatcher } from 'svelte';
  import { isEditing } from '$lib/stores.js';
  import { onMount } from 'svelte';
  import { loadBp } from '$lib/load-bp';
  import Image from './Image.svelte';
  import 'bigger-picture/css';
  import { flip } from 'svelte/animate';
  import { openModal, closeAllModals } from 'svelte-modals';

  import ConfirmModal from '$lib/components/ConfirmModal.svelte';
  import { dndzone, SOURCES, TRIGGERS } from 'svelte-dnd-action';

  const dispatch = createEventDispatcher();
  let placeholder = '/images/person-placeholder.jpg';
  let items = [];
  let dragDisabled = true;
  let bp = null;

  $: if (realisation) {
    items = realisation.images;
  }

  const flipDurationMs = 300;

  function handleDndConsider(event) {
    const {
      items: newItems,
      info: { source, trigger }
    } = event.detail;
    items = newItems;
    // Ensure dragging is stopped on drag finish via keyboard
    if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
      dragDisabled = true;
    }
  }

  function handleDndFinalize(event) {
    const {
      items: newItems,
      info: { source }
    } = event.detail;
    items = newItems;
    // Ensure dragging is stopped on drag finish via pointer (mouse, touch)
    if (source === SOURCES.POINTER) {
      dragDisabled = true;
    }
    // Emit an event to notify the parent to update the main `realisations` array.
    dispatch('updateImages', { id: realisation.id, images: [...items] });
  }
  function startDrag(event) {
    // preventing default to prevent lag on touch devices (because of the browser checking for screen scrolling)
    event.preventDefault();
    dragDisabled = false;
  }
  function handleKeyDown(event) {
    if ((event.key === 'Enter' || event.key === ' ') && dragDisabled) dragDisabled = false;
  }
  function handleDelete(index, src) {
    openModal(ConfirmModal, {
      title: 'Are you absolutely sure?',
      labels: {
        cancel: 'No',
        confirm: 'Yes'
      },
      onConfirm: () => {
        closeAllModals();
        deleteItem(index, src);
      }
    });
  }
  function deleteItem(index, src) {
    items.splice(index, 1);
    let id = src.split('/assets/').join('');
    const itemsToDelete = [id]; // lista id do usunięcia
    dispatch('deleteItems', { itemsToDelete });
    items = items; // trigger update
  }

  const actions = [
    { a: 'delete', d: 'M6 18L18 6M6 6l12 12' },
    { a: 'up', d: 'M4.5 15.75l7.5-7.5 7.5 7.5' },
    { a: 'down', d: 'M19.5 8.25l-7.5 7.5-7.5-7.5' }
  ];

  export let realisation;
  export let firstEntry = false;
  export let lastEntry = false;
  async function openBiggerPicture(realisation, event) {
    event.preventDefault();
    const items = realisation.images.map(image => ({
      img: image.src,
      thumb: image.src,
      width: image.w,
      height: image.h,
      caption: realisation.title,
      element: image.src
    }));
    bp.open({
      items,
      scale: 1,
      intro: 'fadeup',
      noClose: false,
      inline: false
    });
  }
  onMount(async () => {
    bp = await loadBp();
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- <div class="cursor-pointer overflow-hidden relative group">
    <Img
      on:click={event => openBiggerPicture(realisation, event)}
      on:touchend={event => openBiggerPicture(realisation, event)}
      alt={realisation.title}
      class="object-cover aspect-video w-full group-hover:scale-110 transition duration-300 ease-in-out"
      src={realisation.images[0]}
    />
  </div> -->

<div
  class={classNames(
    firstEntry
      ? 'sm:mx-12 mb-8 sm:mb-12 md:mb-16 relative'
      : 'sm:mx-12 mb-8 sm:mb-12 md:mb-16 relative'
  )}
>
  <h3 class="uppercase text-sm md:text-base xl:text-lg mb-1 {isEditing ? '' : ''}">
    <PlainText bind:content={realisation.title} />
  </h3>

  {#if $isEditing}
    <div class="flex">
      <section
        class="flex flex-wrap gap-3 grow"
        use:dndzone={{ items, dragDisabled, flipDurationMs }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
      >
        {#each items as image, i (image.id)}
          <div class="ring-2 ring-white" animate:flip={{ duration: flipDurationMs }}>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <div
              tabindex={dragDisabled ? 0 : -1}
              aria-label="drag-handle"
              class="h-8 pt-1 pl-1 pb-1 {dragDisabled ? 'link-bg' : 'bg-accent'}"
              style={dragDisabled ? 'cursor: grab' : 'cursor: grabbing'}
              on:mousedown={startDrag}
              on:touchstart={startDrag}
              on:keydown={handleKeyDown}
            >
              <button
                class="w-6 h-6 flex justify-center items-center rounded-full link-bg-invert link"
                on:click={handleDelete(i, image.src)}
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
            </div>
            <div class="w-64 h-64 grid justify-center place-content-center">
              <Image
                class="max-h-64 p-4"
                bind:src={image.src}
                alt={realisation.title}
                imagesList={items}
                isPlaceholder={false}
              />
            </div>
          </div>
        {/each}
      </section>
      <div class="space-y-3 flex flex-col ml-5">
        {#each actions as action}
          <button
            class="w-6 h-6 flex justify-center items-center rounded-full link-bg-invert link {firstEntry &&
            action.a === 'up'
              ? 'opacity-20'
              : ''} {lastEntry && action.a === 'down' ? 'opacity-20' : ''}"
            on:click={() => dispatch(action.a)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d={action.d} />
            </svg>
          </button>
        {/each}
      </div>
    </div>
    <div class="flex justify-center py-4 mx-auto">
      <!-- Placeholder image without dnd -->
      {#each [{ id: 'placeholder', src: placeholder }] as image (image.id)}
        <Image
          class="rounded-full w-auto h-20"
          bind:src={image.src}
          alt="Nowe zdjęcie"
          bind:imagesList={items}
          isPlaceholder={true}
        />
      {/each}
    </div>
  {:else if items[0]}
    <div
      class="cursor-pointer overflow-hidden relative group"
      on:click={event => openBiggerPicture(realisation, event)}
    >
      <Image
        class="object-cover aspect-video w-full group-hover:scale-110 transition duration-300 ease-in-out"
        alt={realisation.title}
        imagesList={items}
        isPlaceholder={false}
        src={items[0].src}
      />
    </div>
  {/if}
</div>
