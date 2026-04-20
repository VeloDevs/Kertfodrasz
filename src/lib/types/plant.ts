export type PlantCategory = {
	name: string;
	slug: string;
	plantCount: number;
};

export type PlantCardCategory = {
	name: string;
	slug: string;
};

export type PlantCard = {
	name: string;
	slug: string;
	description: string | null;
	coverImageUrl: string | null;
	categories: PlantCardCategory[];
};

export type PlantImage = {
	id: number;
	imageUrl: string;
	alt: string;
	isCover: boolean;
};

export type PlantDetail = {
	name: string;
	slug: string;
	description: string | null;
	categories: PlantCardCategory[];
	images: PlantImage[];
};

export type PlantIndexResponse = {
	categories: PlantCategory[];
	selectedCategorySlug: string;
	searchQuery: string;
	plants: PlantCard[];
};

export type PlantDetailResponse = {
	plant: PlantDetail;
};
