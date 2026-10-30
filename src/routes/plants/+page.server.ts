import { fetchPlantApi } from '#lib/server/plant-api.js';
import type { PlantIndexResponse } from '#lib/types/plant.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const selectedCategorySlug = url.searchParams.get('category')?.trim() ?? '';
	const searchQuery = url.searchParams.get('q')?.trim() ?? '';

	const query = new URLSearchParams();

	if (selectedCategorySlug !== '') {
		query.set('category', selectedCategorySlug);
	}

	if (searchQuery !== '') {
		query.set('q', searchQuery);
	}

	query.set('page', url.searchParams.get('page') || '1');
	const search = query.toString();

	return fetchPlantApi<PlantIndexResponse>(
		fetch,
		`/api/plants${search ? `?${search}` : ''}`,
		'Nem sikerült betölteni a növénytárat.'
	);
};
