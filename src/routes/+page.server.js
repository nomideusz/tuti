import { getPage } from '$lib/api';

export async function load({ locals }) {
  const currentUser = locals.user;
  const pl = await getPage('pl');
  const en = await getPage('en');
  return {
    currentUser,
    pl,
    en
  };
}
