import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const domain = 'https://kertfodrasz.hu';
	const buildDate = new Date().toUTCString();

	const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
  <channel>
    <title>Kertfodrász</title>
    <link>${domain}</link>
    <description>Kertépítés, gyepszőnyegezés, öntözőrendszerek és kertápolás Baranya megyében.</description>
    <language>hu</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml" />
    <sy:updatePeriod>weekly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <item>
      <title>Kertápolás és Kertépítés Baranya Megyében</title>
      <link>${domain}/</link>
      <guid isPermaLink="true">${domain}/</guid>
      <pubDate>${buildDate}</pubDate>
      <description>Precíz kertápolás, kompromisszumok nélkül Kozármislenyben és környékén.</description>
    </item>
  </channel>
</rss>`;

	return new Response(rssXml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
