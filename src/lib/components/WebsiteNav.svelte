<script>
  import { classNames } from '$lib/util';
  import NotEditable from './NotEditable.svelte';
  import Navbar from './Navbar.svelte';
  import LogoSaw from '$lib/components/LogoSaw.svelte';
  import { isEditing, LINKS } from '$lib/stores.js';
  import { windowScrollStore } from 'svelte-legos';
  import { windowSizeStore } from 'svelte-legos';
  import { onMount } from 'svelte';

  const size = windowSizeStore();
  const position = windowScrollStore();
  const SCROLL_BUFFER = 200;

  $: y = $position.y;
  let lastScrollPosition = 0; // Pozycja przewijania przy ostatniej aktualizacji
  let isActive = true;
  let isDynamic = false;

  function onScroll(e) {
    const newScrollPosition = y;

    // Jeśli jesteśmy na pierwszej stronie
    if (newScrollPosition < $size.height) {
      isActive = true;
      isDynamic = false;
    } else {
      if (
        newScrollPosition < lastScrollPosition ||
        newScrollPosition - $size.height < SCROLL_BUFFER
      ) {
        isActive = true;
        isDynamic = true;
      } else {
        isActive = false;
        open = false;
      }
    }

    lastScrollPosition = newScrollPosition;
  }

  onMount(() => {
    onScroll();
  });

  let open;

  // TODO: Replace with a globally managed context menu implementation (only one active)
  export let showUserMenu = undefined;

  function onKeyDown(e) {
    // Close modals
    if (e.key === 'Escape') {
      showUserMenu = false;
    }
    // Turn on editing
    if (e.key === 'e' && e.metaKey) {
      $isEditing = true;
      console.log('Editing enabled');
    }
  }
</script>

<NotEditable>
  <header
    class="
      {$isEditing ? 'hidden' : 'navBar absolute mx-auto z-50 w-full px-[6dvi]'}
      {isActive && !$isEditing ? 'active' : ''}
      {isDynamic && !$isEditing ? 'dynamic hidden md:block' : 'pt-4 md:pt-10 xl:pt-12'}  {y >=
      $size.height && y < $size.height + SCROLL_BUFFER
      ? 'hidden'
      : ''}"
    style={y < $size.height ? '' : 'position: fixed; width:100%;'}
  >
    <div class="md:flex justify-between items-start">
      <!-- LOGO -->
      <a
        class="flex flex-col justify-start leading-none text-center text-primary {isDynamic
          ? 'hidden'
          : ''}"
        href="#start"
        title="Tutitutu. Architektura wnętrz."
      >
        <span
          class="block align-top uppercase text-primary tracking-[0.05em] font-rounded"
          style="font-size: clamp(2.4rem, calc(1.8dvw * 2), 3.52rem);">tutitutu</span
        >
        <span
          class="block align-top text-primary tracking-[0.13em]"
          style="font-size: clamp(0.912rem, calc(1.8dvw * 0.76), 1.34rem);"
          >architektura wnętrz</span
        >
      </a>
      <!-- END LOGO -->

      <Navbar {isDynamic} bind:showUserMenu bind:open />
    </div>
    <div
      class="hidden md:flex justify-end mr-2 -mt-8 {isDynamic || $isEditing
        ? 'hidden md:hidden'
        : ''}"
    >
      <LogoSaw />
    </div>
  </header>
</NotEditable>

<svelte:window on:keydown={onKeyDown} on:scroll={onScroll} />

<style>
  li {
    cursor: pointer;
    width: max-content;
    margin: 0 auto;
  }
  .navBar.dynamic {
    @apply py-2 border-b-2 border-b-white bg-primary bg-cover opacity-90;
  }
</style>
