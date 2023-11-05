<script>
  import { isEditing, currentUser, LINKS, activeLink } from '$lib/stores.js';
  export let showUserMenu;
  import { Hamburger } from 'svelte-hamburgers';
  export let isDynamic, open;
  import { locale } from 'svelte-i18n';
  import { fly } from 'svelte/transition';
  function switchLocale(newLocale) {
    $locale = newLocale;
  }
</script>

<div class="{isDynamic ? 'mx-auto' : ''} {isEditing ? '' : ''}" aria-label="Global">
  <div class="hidden overflow-hidden grow md:block">
    <div
      class="flex uppercase font-bold tracking-[0.2em]"
      style="font-size: clamp(0.85rem, calc(2.3dvw * 0.67), 1.5rem);"
    >
      {#if $currentUser}
        <button
          on:click={() => (showUserMenu = !showUserMenu)}
          title={$currentUser.name}
          class="absolute right-0 md:mt-12 mr-12"
        >
          <span
            class="inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </span>
        </button>
      {/if}
      <ul class="flex gap-[1.3dvw] ml-8">
        {#if isDynamic}
          <li><a href="#start">start</a></li>
        {/if}
        {#each LINKS as link}
          <li>
            <a href={link.url} aria-current={$activeLink === link.url} class="scrollactive-item"
              >{link.name}</a
            >
          </li>
        {/each}
        <!-- <li>
          {#if $locale === 'pl'}
            <button on:click={() => switchLocale('en')}>EN</button>
          {:else}
            <button on:click={() => switchLocale('pl')}>PL</button>
          {/if}
        </li> -->
      </ul>
    </div>
  </div>
  <div class="md:hidden absolute right-8 top-5">
    <Hamburger bind:open --padding="0" type="boring" --color="white" --active-color="white" />
  </div>

  <div class="md:hidden">
    {#if open}
      <ul
        class="text-center flex flex-col gap-7 mt-4 mb-6 uppercase font-bold text-xl tracking-[4px]"
      >
        {#if isDynamic}
          <li><a href="#start">start</a></li>
        {/if}
        {#each LINKS as link, i}
          <li transition:fly|global={{ y: -15, delay: 50 * i }}>
            <a href={link.url}>{link.name}</a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  li {
    cursor: pointer;
    width: max-content;
    margin: 0 auto;
  }
</style>
