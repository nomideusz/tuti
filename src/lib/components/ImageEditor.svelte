<script>
  import { currentUser } from '$lib/stores';
  import { resizeImage, classNames, getDimensions, is_safari, nanoid } from '$lib/util';
  import uploadAsset from '$lib/uploadAsset';

  export let src;
  export let alt;
  export let uploadPrompt = undefined;
  export let maxWidth;
  export let maxHeight;
  export let quality;
  export let imagesList = [];
  export let isPlaceholder = false;

  let className = '';

  export { className as class };

  function onKeyDown(e) {
    // Trigger save
    if (is_cropping && e.key === 'Escape') {
      cancelCropping();
    } else if (is_cropping && e.key === 'Enter') {
      uploadImage();
    }
  }

  let fileInput; // for uploading an image
  let progress = undefined; // file upload progress
  let overlayEl;
  let w, h;

  // Cropper stuff
  let newSrc;
  let is_cropping = false;
  let scale = 1;

  function cancelCropping() {
    is_cropping = false;
    newSrc = undefined;
    fileInput.value = null;
    scale = 1;
  }

  async function uploadImage() {
    const file = fileInput.files[0];
    const content_type = is_safari() ? 'image/jpeg' : 'image/webp';

    // We convert all uploads to the WEBP image format
    const extension = is_safari() ? 'jpg' : 'webp';
    const path = [['images', nanoid()].join('/'), extension].join('.');
    const resizedBlob = await resizeImage(file, maxWidth, maxHeight, quality, content_type);
    const resizedFile = new File([resizedBlob], `${file.name.split('.')[0]}.${extension}`, {
      type: content_type
    });
    const { width, height } = await getDimensions(resizedFile);

    progress = 0;
    try {
      if ($currentUser) {
        await uploadAsset(resizedFile, path, width, height, p => {
          progress = p;
        });
        imagesList.push({
          id: nanoid(), // generuj nowe id dla obrazu
          src: `/assets/${path}`,
          w: width,
          h: height
        });
        if (!isPlaceholder) {
          src = `/assets/${path}`;
        }
      } else {
        if (!isPlaceholder) {
          src = URL.createObjectURL(resizedFile);
        }
      }
      progress = undefined;
      imagesList = imagesList;
    } catch (err) {
      console.error(err);
      alert('An error occured. Please try again');
      progress = undefined;
    }
    cancelCropping();
    fileInput.value = null;
  }
</script>

<div
  bind:this={overlayEl}
  class={classNames(
    is_cropping
      ? 'z-40 bg-black text-white font-bold fixed inset-0 bg-opacity-80 text-center p-6'
      : 'hidden'
  )}
  on:dblclick={cancelCropping}
>
  {#if is_safari()}
    <span class="text-[#EF174C]">ATTENTION:</span> Use Google Chrome, Firefox, oder Microsoft Edge for
    optimized image quality and size.
  {:else}
    Confirm with ENTER. Cancel with ESC.
  {/if}
</div>

<div class={classNames('relative')} on:dblclick={uploadImage}>
  <img
    on:mousedown={() => fileInput.click()}
    class={className +
      ' cursor-pointer outline-[2px] hover:outline-dashed outline-[#EF174C] -outline-offset-[2px]'}
    {src}
    {alt}
    title={uploadPrompt}
  />
</div>

<input
  class="w-px h-px opacity-0 fixed -top-40"
  type="file"
  accept="image/*"
  name="imagefile"
  bind:this={fileInput}
  on:change={uploadImage}
/>

<svelte:window on:keydown={onKeyDown} />
