<script>
  import { closeModal } from 'svelte-modals';

  // provided by <Modals />
  export let isOpen;
  export let title;
  export let onConfirm;
  export let labels = { cancel: 'Cancel', confirm: 'OK' };
</script>

{#if isOpen}
  <div
    role="dialog"
    class="modal fixed inset-0 left-0 right-0 top-0 bottom-0 z-50 overflow-y-auto text-black"
  >
    <div class="contents">
      <h2>{title}</h2>
      <div class="flex justify-between mt-6">
        <button class="border px-4 py-2" type="button" on:click={closeModal}>
          {labels?.cancel}
        </button>
        <button class="border text-accent px-4 py-2" type="button" on:click={onConfirm}>
          {labels?.confirm}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 32px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }

  h2 {
    text-align: center;
    font-size: 24px;
  }
</style>
