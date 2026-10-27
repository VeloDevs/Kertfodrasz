import { fetchBackendApi } from './backend-api';

export function fetchReferenceApi<T>(
	fetchFn: typeof fetch,
	path: string,
	message = 'Nem sikerült betölteni a referenciákat.'
): Promise<T> {
	return fetchBackendApi<T>(fetchFn, path, message);
}
