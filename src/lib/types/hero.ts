export type HeroImage = {
	imageUrl: string | null;
	alt: string;
};

export type PageHero = {
	main: HeroImage;
	detail: HeroImage;
};
