import { test } from 'node:test';
import assert from 'node:assert/strict';
import { publicMediaUrls } from '../src/lib/server/public-media.ts';

test('Docker media addresses become public HTTPS URLs throughout API responses', () => {
	const internal = 'http://kertfodrasz-preprod-backend-fs37cb';
	const external = 'https://kertfodrasz-api.szaboek.com';
	const image = { imageUrl: `${internal}/media/heroes/home/a%20b.webp`, alt: 'Kert' };
	const payload = {
		hero: { main: image, detail: { imageUrl: null, alt: '' } },
		services: { lawn: image },
		items: [{ images: [image] }]
	};
	const result = publicMediaUrls(payload, `${internal}/`, `${external}/`);
	const expected = `${external}/media/heroes/home/a%20b.webp`;
	assert.equal(result.hero.main.imageUrl, expected);
	assert.equal(result.services.lawn.imageUrl, expected);
	assert.equal(result.items[0].images[0].imageUrl, expected);
	assert.deepEqual(result.hero.detail, { imageUrl: null, alt: '' });
	assert.equal(result.hero.main.alt, 'Kert');
	assert.equal(payload.hero.main.imageUrl, image.imageUrl);
});

test('public images, unrelated hosts and non-image fields remain unchanged', () => {
	const payload = [
		{ imageUrl: 'https://api.example/media/a.webp' },
		{ imageUrl: 'http://backend.evil/media/a.webp' },
		{ imageUrl: 'http://backend/other/a.webp' },
		{ imageUrl: '/media/a.webp', alt: 'http://backend/media/a.webp' }
	];
	assert.deepEqual(publicMediaUrls(payload, 'http://backend', 'https://api.example'), payload);
});
