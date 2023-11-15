<script>
  import '../app.css';
  import { Modals, closeModal } from 'svelte-modals';
  import { browser } from '$app/environment';
  import '$lib/i18n';
  import { locale, waitLocale } from 'svelte-i18n';
  import analytics from '../analytics';
  locale.set('en');
  export async function load() {
    if (browser) {
      locale.set(window.navigator.language);
    }
    await waitLocale();
  }
  // import { Svane } from '@shipbit/svane';
  // import { browser } from '$app/environment';
  analytics.page();
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8R12WG9TGW"></script>
</svelte:head>
<Modals>
  <div
    slot="backdrop"
    class="fixed inset-0 z-50 overflow-y-auto text-black"
    on:click={closeModal}
    on:keypress={closeModal}
    role="button"
    tabindex="0"
  />
</Modals>
<!-- {#if import.meta.env.DEV && browser}
  <Svane />
{/if} -->

<slot />
