<script context="module">
  import { page } from '$app/stores';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
  export function load({ error, status }) {
    return {
      props: {
        title: `${status}: ${error.message}`
      }
    };
  }
  export let title;
  let showUserMenu = false;
</script>

<html lang="en" class="h-screen w-full bg-accent">
  <body class="flex h-full">
    <div class="max-w-[50rem] flex flex-col mx-auto w-full h-full">
      <header class="mb-auto flex justify-center z-50 w-full py-4">
        <WebsiteHeader bind:showUserMenu />
      </header>

      <div class="text-center py-10 px-4 sm:px-6 lg:px-8">
        <h1 class="block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white">
          {$page.status}
        </h1>
        <p class="mt-3 text-gray-600 dark:text-gray-400">{$page.error.message}</p>
        <p class="text-gray-600 dark:text-gray-400">Sorry, we couldn't find your page.</p>
        <div class="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
          <a
            class="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm py-3 px-4 dark:ring-offset-slate-900"
            href="https://tutitutu.pl/"
          >
            <svg class="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M11.2792 1.64001L5.63273 7.28646C5.43747 7.48172 5.43747 7.79831 5.63273 7.99357L11.2792 13.64"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            Back to Homepage
          </a>
        </div>
      </div>

      <footer class="mt-auto text-center py-5" />
    </div>
  </body>
</html>
