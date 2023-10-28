<script>
  import WebsiteNav from '$lib/components/WebsiteNav.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import EditorToolbar from '$lib/components/tools/EditorToolbar.svelte';
  import { createEventDispatcher } from 'svelte';

  export let showUserMenu = false;
  const dispatch = createEventDispatcher();
</script>

<WebsiteNav bind:showUserMenu />
<EditorToolbar on:cancel={() => dispatch('cancel')} on:save={() => dispatch('save')} />

{#if showUserMenu}
  <Modal on:close={() => (showUserMenu = false)}>
    <div class="w-full text-center space-y-4 p-4 sm:p-6 bg-white text-primary opacity-80">
      <slot />
    </div>
  </Modal>
{/if}
