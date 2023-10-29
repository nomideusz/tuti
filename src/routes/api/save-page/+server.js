import { json } from '@sveltejs/kit';
import { createOrUpdatePage } from '$lib/api';
import { deleteAsset } from '$lib/api';

export async function POST({ request, locals }) {
  const currentUser = locals.user;
  const { pageId, page, itemsToDelete } = await request.json();
  await createOrUpdatePage(pageId, page, currentUser);
  itemsToDelete.forEach(assetId => {
    deleteAsset(assetId, currentUser);
  });
  return json({ pageId, status: 'ok' });
}
