import { json } from '@sveltejs/kit';
import { storeAsset } from '$lib/api';

export async function PUT({ request }) {
  const data = await request.formData();
  const asset_id = data.get('path');
  const file = data.get('file')?.valueOf();
  console.log('Received formData:', data);
  console.log('Received asset_id:', asset_id);

  await storeAsset(asset_id, file);

  return json({ path: asset_id });
}
