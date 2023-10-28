<script>
  import RichText from '$lib/components/RichText.svelte';
  import PlainText from '$lib/components/PlainText.svelte';
  import removeWidows from '$lib/scripts/removeWidows';
  import bgWorkshop from '$lib/images/originals/1200px_bg_workshop.jpg?format=avif';

  export let workshop;
</script>

<div class="flex">
  <div
    class="flex justify-center items-center h-fit w-full lg:w-fit lg:h-[17.5dvw] text-white bg-no-repeat bg-cover bg-left p-[7.7dvw]"
    style="background-image: url('{bgWorkshop}');"
  >
    <h2 class="uppercase font-bold tracking-[0.2em] text-[8dvw] lg:text-[5.5dvw]">Pracownia</h2>
  </div>
</div>
<div class="mx-auto px-[6dvi] xl:max-w-screen-2xl py-4 lg:py-8">
  <article
    use:removeWidows
    class="xl:columns-2 text-left gap-9 xl:gap-10 prose prose-sm lg:prose-lg prose-p:text-sm sm:prose-p:text-base lg:prose-p:text-lg prose-em:tracking-widest prose-em:not-italic prose-em:font-rounded text-white hyphens-auto max-w-none"
  >
    <RichText multiLine bind:content={workshop} />
  </article>
</div>

<style>
  article {
    orphans: 2;
    widows: 3;
  }
</style>
