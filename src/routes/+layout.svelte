<script lang="ts">
	import { jsonLdScript as serializeJsonLd } from '#lib/json-ld.js';
	import '../app.css';
	import { page } from '$app/state';
	import * as publicEnv from '$app/env/public';
	import favicon from '#lib/assets/favicon.svg';
	import NavBar from '../lib/components/NavBar.svelte';
	import Footer from '../lib/components/Footer.svelte';

	let { children } = $props();

	const siteUrl = 'https://kertfodrasz.hu';
	const currentUrl = $derived(`${siteUrl}${page.url.pathname}`);
	const defaultImage = `${siteUrl}/og-image.png`;
	const pageMeta: Record<string, { title: string; description: string }> = {
		'/references': {
			title: 'Referenciák | Kertfodrász',
			description: 'Elkészült kertjeink és kertészeti munkáink képekben.'
		},
		'/plants': {
			title: 'Növénytár | Kertfodrász',
			description: 'Találd meg a kertedhez illő növényeket.'
		},
		'/contact': {
			title: 'Kapcsolat | Kertfodrász',
			description: 'Kérj ajánlatot kertépítésre és kertgondozásra.'
		},
		'/blog': { title: 'Blog | Kertfodrász', description: 'Kertészeti ötletek és hírek.' },
		'/adatvedelem': {
			title: 'Adatvédelem | Kertfodrász',
			description: 'A Kertfodrász adatkezelési tájékoztatója.'
		}
	};
	const meta = $derived(
		page.data.seo ||
			pageMeta[page.url.pathname] || {
				title: 'Kertfodrász | Precíz kertápolás kompromisszumok nélkül',
				description: 'Kertépítés és kertgondozás Kozármislenyben és Baranya megyében.'
			}
	);
	const ogImage = $derived(page.data.seo?.image || defaultImage);

	const jsonLdData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Gardener',
				'@id': `${siteUrl}/#organization`,
				name: 'Kertfodrász Kft.',
				url: siteUrl,
				logo: `${siteUrl}/icon-512.png`,
				image: defaultImage,
				telephone: '+36205209276',
				email: 'kertfodrasz@gmail.com',
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Kozármisleny',
					addressRegion: 'Baranya megye',
					addressCountry: 'HU'
				},
				geo: {
					'@type': 'GeoCoordinates',
					latitude: 46.051328,
					longitude: 18.2893536
				},
				priceRange: '$$',
				areaServed: ['Kozármisleny', 'Pécs', 'Baranya megye', 'Harkány', 'Pogány'],
				sameAs: [
					'https://www.facebook.com/Kertfodrasz',
					'https://www.instagram.com/kertfodrasz/',
					'https://www.tiktok.com/@Kertfodrasz'
				]
			},
			{
				'@type': 'WebSite',
				'@id': `${siteUrl}/#website`,
				url: siteUrl,
				name: 'Kertfodrász',
				description:
					'Precíz kertápolás, kertépítés, gyepszőnyegezés és öntözőrendszer építés Baranya megyében.',
				publisher: {
					'@id': `${siteUrl}/#organization`
				},
				inLanguage: 'hu-HU'
			}
		]
	};

	const jsonLdScript = serializeJsonLd(jsonLdData);
</script>

<svelte:head>
	{#if publicEnv.PUBLIC_UMAMI_URL && publicEnv.PUBLIC_UMAMI_WEBSITE_ID && publicEnv.PUBLIC_UMAMI_DOMAINS}
		<script
			defer
			src={`${publicEnv.PUBLIC_UMAMI_URL}/script.js`}
			data-website-id={publicEnv.PUBLIC_UMAMI_WEBSITE_ID}
			data-domains={publicEnv.PUBLIC_UMAMI_DOMAINS}
			data-exclude-search="true"
			data-exclude-hash="true"
			data-do-not-track="true"
		></script>
	{/if}
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title="Kertfodrász RSS Feed" href="/rss.xml" />
	<meta
		name="robots"
		content={page.url.searchParams.has('q') ||
		page.url.searchParams.has('category') ||
		page.url.searchParams.has('page')
			? 'noindex,follow'
			: 'index,follow,max-image-preview:large'}
	/>
	<link rel="canonical" href={currentUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Kertfodrász" />
	<meta property="og:locale" content="hu_HU" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={ogImage} />

	<!-- JSON-LD Structured Data -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLdScript}
</svelte:head>

<a
	href="#main-content"
	class="focus:bg-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:px-4 focus:py-3 focus:font-bold focus:text-white focus:shadow-xl focus:outline-none"
>
	Ugrás a főtartalomra
</a>

<div class="flex min-h-screen flex-col font-sans antialiased">
	<NavBar />
	<main id="main-content" class="flex flex-1 flex-col">
		{@render children()}
	</main>
	<Footer />
</div>
