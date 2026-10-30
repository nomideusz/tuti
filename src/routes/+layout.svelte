<script>
  import '../app.css';
  import { Modals } from 'svelte-modals';
  import { browser } from '$app/env';
  import '#lib/i18n';
  import { locale, waitLocale } from 'svelte-i18n';
  import Analytics from '#lib/components/Analytics.svelte';
  if (browser) {
    console.log(window.navigator.language);
    const lang = window.navigator.language === 'pl' ? 'pl' : 'en';
    locale.set(lang);
  }
  export async function load() {
    if (browser) {
      locale.set(window.navigator.language);
    }
    await waitLocale();
  }
  // import { Svane } from '@shipbit/svane';
  // import { browser } from '$app/env';
</script>

<Modals>
  {#snippet backdrop({ close })}
    <div
      class="fixed inset-0 z-50 overflow-y-auto text-black"
      on:click={() => close()}
      on:keypress={() => close()}
      role="button"
      tabindex="0"
    ></div>
  {/snippet}
</Modals>
<!-- {#if import.meta.env.DEV && browser}
  <Svane />
{/if} -->
<Analytics />
<slot />
