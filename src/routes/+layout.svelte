<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '../lib/components/NavBar.svelte';
	import Footer from '../lib/components/Footer.svelte';

	let { children } = $props();

	const siteUrl = 'https://kertfodrasz.hu';
	const currentUrl = $derived(page.url?.href || siteUrl);
	const ogImage = `${siteUrl}/icon-512.png`;

	const jsonLdData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Gardener',
				'@id': `${siteUrl}/#organization`,
				name: 'Kertfodrász Kft.',
				url: siteUrl,
				logo: ogImage,
				image: ogImage,
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

	const jsonLdScript =
		`<script type="application/ld+json">${JSON.stringify(jsonLdData)}</` + `script>`;
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<link rel="alternate" type="application/rss+xml" title="Kertfodrász RSS Feed" href="/rss.xml" />
	<link rel="canonical" href={currentUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Kertfodrász" />
	<meta property="og:locale" content="hu_HU" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content="Kertfodrász | Precíz kertápolás kompromisszumok nélkül" />
	<meta
		property="og:description"
		content="Szakértelem és szenvedély a kertápolásban. Kertépítés, sövénynyírás, füvesítés és automata öntözőrendszerek Kozármislenyben és Baranya megyében."
	/>
	<meta property="og:image" content={ogImage} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Kertfodrász | Precíz kertápolás kompromisszumok nélkül" />
	<meta
		name="twitter:description"
		content="Szakértelem és szenvedély a kertápolásban. Kertépítés, sövénynyírás, füvesítés és automata öntözőrendszerek Kozármislenyben és Baranya megyében."
	/>
	<meta name="twitter:image" content={ogImage} />

	<!-- JSON-LD Structured Data -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLdScript}
</svelte:head>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-green-800 focus:px-4 focus:py-3 focus:font-bold focus:text-white focus:shadow-xl focus:outline-none"
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
