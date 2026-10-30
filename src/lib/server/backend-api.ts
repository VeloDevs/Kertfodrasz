import * as env from '$app/env/private';
import { error } from '@sveltejs/kit';

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
		return (await response.json()) as T;
	} catch {
		error(502, message);
	}
}
