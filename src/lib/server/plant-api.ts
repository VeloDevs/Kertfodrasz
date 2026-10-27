import { fetchBackendApi } from './backend-api';

export function fetchPlantApi<T>(
	fetchFn: typeof fetch,
	path: string,
	message = 'Nem sikerült betölteni a növénytárat.'
): Promise<T> {
	return fetchBackendApi<T>(fetchFn, path, message);
}
