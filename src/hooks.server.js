import { getCurrentUser } from '$lib/api';
import { locale } from 'svelte-i18n';

export function handle({ event, resolve }) {
  event.locals.user = getCurrentUser(event.cookies.get('sessionid'));
  const lang = event.request.headers.get('accept-language')?.split(',')[0];
  if (lang) {
    locale.set(lang);
  }
  const response = resolve(event);
  return response;
}
