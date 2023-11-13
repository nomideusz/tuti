import { getPage } from '$lib/api';

export function load({ locals }) {
  const currentUser = locals.user;
  const pl = getPage('pl');
  const en = getPage('en');
  return {
    currentUser,
    pl,
    en
  };
}
