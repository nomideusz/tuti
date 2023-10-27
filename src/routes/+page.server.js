import { getPage, getRealisations } from '$lib/api';

export async function load({ locals }) {
  const currentUser = locals.user;
  const page = await getPage('home');

  return {
    currentUser,
    page
  };
}
