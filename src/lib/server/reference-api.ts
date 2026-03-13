import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

const DEFAULT_BACKEND_URL = 'http://127.0.0.1:8000';

function getBackendBaseUrl() {
	return (env.BACKEND_URL || DEFAULT_BACKEND_URL).replace(/\/$/, '');
}

export async function fetchReferenceApi<T>(
	fetchFn: typeof fetch,
	path: string,
	message = 'Nem sikerült betölteni a referenciákat.'
): Promise<T> {
	const response = await fetchFn(`${getBackendBaseUrl()}${path}`, {
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw error(response.status, message);
	}

	return (await response.json()) as T;
}
