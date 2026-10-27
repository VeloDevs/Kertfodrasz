import { fetchReferenceApi } from '$lib/server/reference-api';
import type { ReferenceIndexResponse } from '$lib/types/reference';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const selectedCategorySlug = url.searchParams.get('category')?.trim() ?? '';
	const query = new URLSearchParams();
	if (selectedCategorySlug) query.set('category', selectedCategorySlug);
	query.set('page', url.searchParams.get('page') || '1');
	const search = `?${query}`;

	return fetchReferenceApi<ReferenceIndexResponse>(
		fetch,
		`/api/references${search}`,
		'Nem sikerült betölteni a referencia albumokat.'
	);
};
