<script>
  import bgRealisations from '$lib/images/originals/400px_bg_realisations.jpg?format=avif';
  import bgRealisationsMobile from '$lib/images/originals/400px_bg_realisations.jpg?rotate=90&format=avif';
  import { isEditing } from '$lib/stores.js';
  import SecondaryButton from '$lib/components/SecondaryButton.svelte';
  import { flip } from 'svelte/animate';
  import { quintOut } from 'svelte/easing';
  import { openModal, closeAllModals } from 'svelte-modals';

  import ConfirmModal from '$lib/components/ConfirmModal.svelte';
  // import { realisations } from '$lib/stores';

  import Realisation from '$lib/components/Realisation.svelte';
  export let realisations;

  let lastId = realisations.length > 0 ? Math.max(...realisations.map(r => r.id)) : 0;

  function addRealisation() {
    lastId++; // increment the lastId

    realisations.push({
      title: 'TYTUŁ REALIZACJI',
      images: [],
      id: lastId
    });
    realisations = realisations; // trigger update
  }
  function handleDelete(index) {
    openModal(ConfirmModal, {
      title: 'Are you absolutely sure?',
      labels: {
        cancel: 'No',
        confirm: 'Yes'
      },
      onConfirm: () => {
        closeAllModals();
        deleteRealisation(index);
      }
    });
  }
  function deleteRealisation(index) {
    realisations.splice(index, 1);
    realisations = realisations; // trigger update
  }

  function moveRealisation(index, direction) {
    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < realisations.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }
    // Remove item from original position
    const element = realisations.splice(index, 1)[0];
    // Insert at new position
    realisations.splice(toIndex, 0, element);
    realisations = realisations; // trigger update
  }

  function updateImageOrder(event, index) {
    const updatedImages = event.detail.images;
    realisations[index].images = updatedImages;
    realisations = [...realisations]; // to trigger svelte reactivity
  }
</script>

<div
  class="flex items-center heading-wrapper h-fit w-full lg:w-[17.5dvw] text-primary bg-no-repeat bg-cover bg-left py-[7.7dvw] mr-[50px]"
  style="--bg-img: url({bgRealisations}); --bg-img-mobile: url({bgRealisationsMobile})"
>
  <h2 class="mx-auto uppercase font-bold tracking-[0.2em] text-[8dvw] lg:text-[5.5dvw]">
    Realizacje
  </h2>
</div>

<div class="px-[6dvi] lg:w-[76dvw] xl:max-w-screen-2xl pt-8 sm:pt-12 lg:pt-16">
  {#each realisations as realisation, i (realisation)}
    <div animate:flip={{ duration: 500, easing: quintOut }}>
      <Realisation
        bind:realisation
        firstEntry={i === 0}
        lastEntry={i === realisations.length - 1}
        on:delete={() => handleDelete(i)}
        on:up={() => moveRealisation(i, 'up')}
        on:down={() => moveRealisation(i, 'down')}
        on:updateImages={event => updateImageOrder(event, i)}
        on:deleteItems
      />
    </div>
  {/each}

  {#if $isEditing}
    <div class="text-center mb-8 pb-8 border-b border-gray-100">
      <SecondaryButton on:click={addRealisation}>Dodaj nową Realizację</SecondaryButton>
    </div>
  {/if}
</div>

<style>
  @media (min-width: 960px) {
    .heading-wrapper {
      background-image: var(--bg-img);
    }
    .heading-wrapper h2 {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
    }
  }

  @media (max-width: 959px) {
    .heading-wrapper {
      background-image: var(--bg-img-mobile);
    }
  }
</style>
