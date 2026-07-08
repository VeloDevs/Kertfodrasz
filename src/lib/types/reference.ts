export type ReferenceCategory = {
	name: string;
	slug: string;
	albumCount: number;
};

export type ReferenceAlbumCard = {
	title: string;
	slug: string;
	description: string | null;
	imageCount: number;
	coverImageUrl: string | null;
	previewImageUrls: string[];
	category: {
		name: string;
		slug: string;
	} | null;
};

export type ReferenceAlbumImage = {
	id: number;
	imageUrl: string;
	alt: string;
};

export type ReferenceAlbumDetail = {
	title: string;
	slug: string;
	description: string | null;
	category: {
		name: string;
		slug: string;
	} | null;
	images: ReferenceAlbumImage[];
};

export type ReferenceIndexResponse = {
	categories: ReferenceCategory[];
	selectedCategorySlug: string;
	albums: ReferenceAlbumCard[];
};

export type ReferenceDetailResponse = {
	album: ReferenceAlbumDetail;
};
