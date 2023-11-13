import { getCurrentUser } from '$lib/api';
import { locale } from 'svelte-i18n';

export async function handle({ event, resolve }) {
  event.locals.user = await getCurrentUser(event.cookies.get('sessionid'));
  const lang = event.request.headers.get('accept-language')?.split(',')[0];
  if (lang) {
    locale.set(lang);
  }
  const response = await resolve(event);
  return response;
}
