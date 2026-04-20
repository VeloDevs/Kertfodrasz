import { fetchPlantApi } from '$lib/server/plant-api';
import type { PlantIndexResponse } from '$lib/types/plant';
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

	const search = query.toString();

	return fetchPlantApi<PlantIndexResponse>(
		fetch,
		`/api/plants${search ? `?${search}` : ''}`,
		'Nem sikerült betölteni a növénytárat.'
	);
};
