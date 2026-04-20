import { fetchPlantApi } from '$lib/server/plant-api';
import type { PlantDetailResponse } from '$lib/types/plant';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	return fetchPlantApi<PlantDetailResponse>(
		fetch,
		`/api/plants/${encodeURIComponent(params.slug)}`,
		'Nem sikerült betölteni a kiválasztott növényt.'
	);
};
