import type { RequestHandler } from './$types';
import { fetchBackendApi } from '$lib/server/backend-api';
import type { Pagination } from '$lib/types/pagination';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch }) => {
	const domain = 'https://kertfodrasz.hu';
	const paths = ['', '/references', '/plants', '/contact', '/blog', '/adatvedelem'];
	for (const [section, key] of [
		['references', 'albums'],
		['plants', 'plants']
	] as const) {
		let lastPage = 1;
		for (let number = 1; number <= lastPage; number++) {
			const data = await fetchBackendApi<{
				pagination: Pagination;
				albums?: { slug: string }[];
				plants?: { slug: string }[];
			}>(
				fetch,
				`/api/${section}?per_page=100&page=${number}`,
				'A webhelytérkép átmenetileg nem tölthető be.'
			);
			lastPage = data.pagination.lastPage;
			if (lastPage > 490 || paths.length >= 49900)
				error(503, 'A webhelytérképet több részre kell bontani.');
			for (const item of data[key] || [])
				paths.push(`/${section}/${encodeURIComponent(item.slug)}`);
		}
	}
	const escape = (value: string) =>
		value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&apos;');
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${escape(domain + path)}</loc></url>`).join('')}</urlset>`;
	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' }
	});
};
