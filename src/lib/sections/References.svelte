<script>
  import bgReferences from '$lib/images/originals/480px_bg_references.jpg?format=avif';
  import { FxReveal as Img } from '@zerodevx/svelte-img';
  import ref1 from '$lib/images/originals/ref1.jpg?as=real';
  import ref2 from '$lib/images/originals/ref2.jpg?as=real';
</script>

<div class="flex">
  <div
    class="flex justify-center items-center h-fit w-full lg:w-fit lg:h-[17.5dvw] text-white bg-no-repeat bg-cover bg-bottom p-[7.7dvw]"
    style="background-image: url('{bgReferences}');"
  >
    <h2 class="uppercase font-bold tracking-[0.2em] text-[8dvw] lg:text-[5.5dvw]">Referencje</h2>
  </div>
</div>
<div class="flex flex-col lg:flex-row gap-1 px-[6dvi] justify-end py-4 md:py-8">
  <Img src={ref1} alt="Referencje" class="w-full lg:w-[31dvw] aspect-[0.71]" />
  <Img src={ref2} alt="Referencje" class="w-full lg:w-[31dvw] aspect-[0.71]" />
</div>
