<script>
  import { isEditing } from '$lib/stores.js';
  import Img from '@zerodevx/svelte-img';

  export let src;
  export let placeholder;
  export let alt;
  export let uploadPrompt = undefined;
  export let maxWidth = 1920;
  export let maxHeight = 1920;
  export let quality = 0.7;
  export let imagesList = [];
  export let isPlaceholder;
  export let previewSrc;

  let className = '';

  let loaded = false;

  function handleImageLoad() {
    loaded = true;
  }

  export { className as class };
</script>

{#if $isEditing}
  {#await import('./ImageEditor.svelte')}
    <img class={className} src={previewSrc || src} {alt} />
  {:then ImageEditor}
    <ImageEditor.default
      class={className}
      bind:src
      bind:previewSrc
      {alt}
      {uploadPrompt}
      {maxWidth}
      {maxHeight}
      {quality}
      {isPlaceholder}
      bind:imagesList
    />
  {/await}
{:else}
  <img class={className} {src} {alt} />
{/if}

<!-- 
{#if $isEditing}
  {#await import('./ImageEditor.svelte')}
    <img class={className} src={previewSrc || src} {alt} />
  {:then ImageEditor}
    <ImageEditor.default
      class={className}
      bind:src
      bind:previewSrc
      {alt}
      {uploadPrompt}
      {maxWidth}
      {maxHeight}
      {quality}
    />
  {/await}
{:else}
  <div class="relative width={maxWidth} height={maxHeight}">
    <img width="100%" height="100%" src={placeholder} alt={alt} class="{className} absolute duration-1000 {loaded ? 'opacity-0' : 'opacity-100'}" />
    <Img width="100%" height="100%" {src} alt={alt} class="{className} absolute duration-1000 {loaded ? 'opacity-100' : 'opacity-0'}" on:load={handleImageLoad} />
  </div>
{/if} -->
