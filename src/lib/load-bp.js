import 'bigger-picture/css';

let bp;

/**
 * Dynamically imports bigger-picture and returns reusable instance.
 * If no target provided, instance will use document.body.
 */
export async function loadBp(target) {
	const BiggerPicture = (await import('bigger-picture/svelte')).default;
	if (target) {
		return BiggerPicture({ target });
	}
	if (!bp) {
		bp = BiggerPicture({
			target: document.body,
		});
	}
	return bp;
}