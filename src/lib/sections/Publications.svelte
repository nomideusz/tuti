<script>
  import PlainText from '$lib/components/PlainText.svelte';
  import { currentUser, isEditing } from '$lib/stores.js';
  import bgPublications from '$lib/images/originals/480px_bg_publications.jpg?format=avif';
  import bgPublicationlgobile from '$lib/images/originals/480px_bg_publications.jpg?rotate=270&format=avif';
  import Publication from '$lib/components/Publication.svelte';
  import SecondaryButton from '$lib/components/SecondaryButton.svelte';
  import { flip } from 'svelte/animate';
  import { quintOut } from 'svelte/easing';
  import { _ } from 'svelte-i18n';
  let w;
  let h;
  export let publications, publHeading;

  function addPublication() {
    publications.push({
      magazineTitle: 'TYTUŁ CZASOPILGA',
      articleTitle: '&bdquo;TYTUŁ ARTYKUŁU&rdquo;',
      articleDate: 'MM/YYYY'
    });
    publications = publications; // trigger update
  }

  function deletePublication(index) {
    publications.splice(index, 1);
    publications = publications; // trigger update
  }

  function movePublication(index, direction) {
    let toIndex;
    if (direction === 'up' && index > 0) {
      toIndex = index - 1;
    } else if (direction === 'down' && index < publications.length - 1) {
      toIndex = index + 1;
    } else {
      return; // operation not possible
    }
    // Remove item from original position
    const element = publications.splice(index, 1)[0];
    // Insert at new position
    publications.splice(toIndex, 0, element);
    publications = publications; // trigger update
  }
</script>

<div
  bind:clientWidth={w}
  bind:clientHeight={h}
  class="lg:absolute lg:right-0 flex justify-center items-center heading-wrapper h-fit w-full lg:w-[17.5dvw] text-white bg-no-repeat bg-cover bg-[center_top] py-[7.7dvw]"
  style="--bg-img: url({bgPublications}); --bg-img-mobile: url({bgPublicationlgobile})"
>
  <h2 class="uppercase font-bold tracking-[0.2em] text-[8dvw] lg:text-[5.5dvw]">
    {$_('publications')}
  </h2>
</div>
<article
  class="mx-auto px-[6dvi] grid content-center lg:pr-[19dvw] xl:max-w-screen-2xl py-4"
  style="min-height: {h}px;"
>
  <h3 class="text-sm sm:text-base lg:text-lg mb-2 md:mb-5">
    <PlainText bind:content={publHeading} />
  </h3>

  <ul
    class="text-[2.7dvw] lg:text-[1.7dvw] xl:text-[1.25dvw] lg:leading-[3dvw] xl:leading-[2.4dvw]"
  >
    {#each publications as publication, i (publication)}
      <li animate:flip={{ duration: 500, easing: quintOut }}>
        <Publication
          bind:publication
          firstEntry={i === 0}
          lastEntry={i === publication.length - 1}
          on:delete={() => deletePublication(i)}
          on:up={() => movePublication(i, 'up')}
          on:down={() => movePublication(i, 'down')}
        />
      </li>
    {/each}
  </ul>
  {#if $isEditing}
    <div class="text-center pb-12 border-b border-gray-100">
      <SecondaryButton on:click={addPublication}>{$_('button.addPublication')}</SecondaryButton>
    </div>
  {/if}
</article>

<style>
  @media (min-width: 960px) {
    .heading-wrapper {
      background-image: var(--bg-img);
    }
    .heading-wrapper h2 {
      writing-mode: vertical-rl;
      /* transform: rotate(180deg); */
    }
  }

  @media (max-width: 959px) {
    .heading-wrapper {
      background-image: var(--bg-img-mobile);
    }
  }
</style>
