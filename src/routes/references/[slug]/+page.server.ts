import { fetchReferenceApi } from '$lib/server/reference-api';
import type { ReferenceDetailResponse } from '$lib/types/reference';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	return fetchReferenceApi<ReferenceDetailResponse>(
		fetch,
		`/api/references/${encodeURIComponent(params.slug)}`,
		'Nem sikerült betölteni a kiválasztott albumot.'
	);
};
