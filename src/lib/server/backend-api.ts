import * as env from '$app/env/private';
import * as publicEnv from '$app/env/public';
import { error } from '@sveltejs/kit';
import { publicMediaUrls } from './public-media';

export async function fetchBackendApi<T>(
	fetchFn: typeof fetch,
	path: string,
	message: string
): Promise<T> {
	let response: Response;
	try {
		response = await fetchFn(
			`${(env.BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')}${path}`,
			{
				headers: { accept: 'application/json' },
				signal: AbortSignal.timeout(8000)
			}
		);
	} catch {
		error(503, message);
	}
	if (!response.ok) error(response.status, message);
	try {
		return publicMediaUrls(
			(await response.json()) as T,
			env.BACKEND_URL,
			publicEnv.PUBLIC_BACKEND_URL
		);
	} catch {
		error(502, message);
	}
}
