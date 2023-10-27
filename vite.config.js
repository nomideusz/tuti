import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
import path from 'path';

export default defineConfig({
  optimizeDeps: {
    include: ['tailwind-config'],
    force: true // force to refresh the config file on change in DEV mode
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'tailwind-config': path.resolve(__dirname, './tailwind.config.js')
    }
  },
  plugins: [
    sveltekit(),
    imagetools({
      profiles: {
        // override defaults
        run: new URLSearchParams('w=600;1024;1300;1600;1920;2400&format=webp;jpg'),
        // add new profile(s)
        real: new URLSearchParams(
          'w=600;1024;1300;1600;1920;2400&fit=cover&format=webp;jpg&withoutEnlargement'
        ),
        jpg: new URLSearchParams('w=1024&fit=cover&format=jpg')
      }
    })
  ]
});
