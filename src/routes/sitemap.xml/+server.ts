import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const domain = 'https://kertfodrasz.hu';
	const pages = [
		{ path: '', changefreq: 'weekly', priority: '1.0' },
		{ path: '/references', changefreq: 'weekly', priority: '0.9' },
		{ path: '/plants', changefreq: 'weekly', priority: '0.9' },
		{ path: '/contact', changefreq: 'monthly', priority: '0.8' },
		{ path: '/blog', changefreq: 'weekly', priority: '0.7' },
		{ path: '/adatvedelem', changefreq: 'yearly', priority: '0.3' }
	];

	const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${domain}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemapXml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
