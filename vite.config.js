import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
import path from 'path';

const __dirname = import.meta.dirname;

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
    sveltekit({
      adapter: adapter({ out: 'build', precompress: false, envPrefix: '' }),
      // Same as the old checkOrigin: false.
      csrf: { trustedOrigins: ['*'] }
    }),
    imagetools({
      profiles: {
        // override defaults
        run: new URLSearchParams('w=600;1024;1300;1600;1920;2400&format=webp;jpg'),
        // add new profile(s)
        real: new URLSearchParams(
          'w=600;1024;1300;1600;1920;2400;3200;3840&fit=cover&format=webp;jpg&withoutEnlargement'
        ),
        jpg: new URLSearchParams('w=1024&fit=cover&format=jpg')
      }
    })
  ]
});
