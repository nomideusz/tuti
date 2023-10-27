<script>
  import { goto } from '$app/navigation';
  import PrimaryButton from './PrimaryButton.svelte';
  import { currentUser } from '$lib/stores.js';
</script>

<div class="text-accent">
  <div class="py-4 text-center">Signed in as {$currentUser.name}</div>
  <PrimaryButton on:click={() => goto('/logout')}>Sign out</PrimaryButton>
</div>
