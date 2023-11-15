<script>
  import '../app.css';
  import { Modals, closeModal } from 'svelte-modals';
  import { browser } from '$app/environment';
  import '$lib/i18n';
  import { locale, waitLocale } from 'svelte-i18n';
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';
  locale.set('en');
  export async function load() {
    if (browser) {
      locale.set(window.navigator.language);
    }
    await waitLocale();
  }
  // import { Svane } from '@shipbit/svane';
  // import { browser } from '$app/environment';
</script>

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
<GoogleAnalytics properties={['G-8R12WG9TGW']} />
