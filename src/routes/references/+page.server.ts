import { fetchReferenceApi } from '$lib/server/reference-api';
import type { ReferenceIndexResponse } from '$lib/types/reference';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const selectedCategorySlug = url.searchParams.get('category')?.trim() ?? '';
	const search = selectedCategorySlug
		? `?category=${encodeURIComponent(selectedCategorySlug)}`
		: '';

	return fetchReferenceApi<ReferenceIndexResponse>(
		fetch,
		`/api/references${search}`,
		'Nem sikerült betölteni a referencia albumokat.'
	);
};
