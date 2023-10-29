<script>
  import '../app.css';
  import { Modals, closeModal } from 'svelte-modals';
  // import { Svane } from '@shipbit/svane';
  // import { browser } from '$app/environment';
</script>

<Modals>
  <div
    slot="backdrop"
    class="fixed inset-0 z-50 overflow-y-auto text-black"
    on:click={closeModal}
  />
</Modals>
<!-- {#if import.meta.env.DEV && browser}
  <Svane />
{/if} -->
<slot />
