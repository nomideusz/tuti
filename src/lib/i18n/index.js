import { browser } from '$app/env';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'en';

register('pl', () => import('./locales/pl.json'));
register('en', () => import('./locales/en.json'));

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser ? window.navigator.language : defaultLocale
});
