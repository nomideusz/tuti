<script>
  import { classNames } from '$lib/util';
  import PrimaryButton from './PrimaryButton.svelte';
</script>

<div class={classNames('py-12 sm:py-24 border-t-2 border-gray-100')}>
  <div
    class="max-w-screen-md mx-auto px-6 flex flex-col sm:flex-row space-y-6 sm:space-x-8 sm:space-y-0"
  >
    <div class="avatar">
      <div class="w-56 h-64 rounded" />
    </div>

    <div>
      <h2 class="text-3xl md:text-5xl font-bold text-accent">Blog</h2>
      <div class="mt-4 md:text-xl" />
    </div>
  </div>
</div>
