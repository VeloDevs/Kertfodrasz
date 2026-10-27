import { fetchPlantApi } from '$lib/server/plant-api';
import type { PlantDetailResponse } from '$lib/types/plant';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const payload = await fetchPlantApi<PlantDetailResponse>(
		fetch,
		`/api/plants/${encodeURIComponent(params.slug)}`,
		'Nem sikerült betölteni a kiválasztott növényt.'
	);
	return {
		...payload,
		seo: {
			title: `${payload.plant.name} | Növénytár | Kertfodrász`,
			description: payload.plant.description || 'Növénytár a Kertfodrász oldalán.',
			image: payload.plant.images[0]?.imageUrl
		}
	};
};
