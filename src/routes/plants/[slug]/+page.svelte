<script lang="ts">
	import { modal } from '#lib/actions/modal.js';
	import { jsonLdScript as serializeJsonLd } from '#lib/json-ld.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let activeImageIndex = $state<number | null>(null);

	function openLightbox(index: number) {
		activeImageIndex = index;
	}

	function closeLightbox() {
		activeImageIndex = null;
	}

	function showPreviousImage() {
		if (activeImageIndex === null) {
			return;
		}

		activeImageIndex = (activeImageIndex - 1 + data.plant.images.length) % data.plant.images.length;
	}

	function showNextImage() {
		if (activeImageIndex === null) {
			return;
		}

		activeImageIndex = (activeImageIndex + 1) % data.plant.images.length;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (activeImageIndex === null) {
			return;
		}

		if (event.key === 'Escape') {
			closeLightbox();
		}

		if (event.key === 'ArrowLeft') {
			showPreviousImage();
		}

		if (event.key === 'ArrowRight') {
			showNextImage();
		}
	}

	function tileClass(index: number) {
		if (index % 5 === 0) {
			return 'md:col-span-2 md:row-span-2';
		}

		if (index % 3 === 0) {
			return 'md:col-span-2';
		}

		return '';
	}

	const breadcrumbJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Kezdőlap',
				item: 'https://kertfodrasz.hu'
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Növénytár',
				item: 'https://kertfodrasz.hu/plants'
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: data.plant.name,
				item: `https://kertfodrasz.hu/plants/${data.plant.slug}`
			}
		]
	});

	const breadcrumbScript = $derived(serializeJsonLd(breadcrumbJsonLd));
</script>

<svelte:head>
	<title>{data.plant.name} | Növénytár | Kertfodrász</title>
	<meta
		name="description"
		content={`${data.plant.name} növény adatlap és képgaléria a Kertfodrász növénytárában.`}
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html breadcrumbScript}
</svelte:head>

<section class="relative overflow-hidden bg-stone-50">
	<div
		class="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
	>
		<!-- Visible Breadcrumbs -->
		<nav class="flex items-center text-xs font-semibold text-gray-600" aria-label="Morzsamenü">
			<ol class="flex items-center space-x-2">
				<li><a href="/" class="hover:text-gray-950 hover:underline">Kezdőlap</a></li>
				<li><span class="mx-1 text-gray-400">/</span></li>
				<li><a href="/plants" class="hover:text-gray-950 hover:underline">Növénytár</a></li>
				<li><span class="mx-1 text-gray-400">/</span></li>
				<li class="text-gray-900" aria-current="page">{data.plant.name}</li>
			</ol>
		</nav>

		<a
			href="/plants"
			class="hover:border-primary inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-white"
		>
			<span aria-hidden="true">←</span>
			Vissza a növénytárhoz
		</a>

		<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
			<div class="max-w-4xl space-y-5">
				<p class="text-xs font-semibold tracking-[0.25em] text-gray-600 uppercase">
					Növény adatlap
				</p>
				<h1 class="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
					{data.plant.name}
				</h1>
				<p class="max-w-3xl text-lg leading-8 text-gray-600">
					{data.plant.description ??
						'Nyisd meg bármelyik képet teljes méretben, és nézd meg részletesen a növény habitusát.'}
				</p>
			</div>

			<div
				class="grid gap-4 rounded-[30px] border border-white/70 bg-white/75 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.12)] backdrop-blur-sm"
			>
				<div>
					<p class="text-xs font-semibold tracking-[0.22em] text-gray-600 uppercase">Képek</p>
					<p class="mt-2 text-xl font-bold text-gray-900">{data.plant.images.length} db</p>
				</div>
				<div>
					<p class="text-xs font-semibold tracking-[0.22em] text-gray-600 uppercase">Kategóriák</p>
					<div class="mt-2 flex flex-wrap gap-2">
						{#if data.plant.categories.length > 0}
							{#each data.plant.categories as category (category.slug)}
								<span class="bg-sage rounded-full px-3 py-1 text-xs font-semibold text-gray-800">
									{category.name}
								</span>
							{/each}
						{:else}
							<span class="bg-sage rounded-full px-3 py-1 text-xs font-semibold text-gray-600">
								Kategória nélkül
							</span>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-stone-50 py-16 sm:py-20">
	<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		{#if data.plant.images.length > 0}
			<div class="grid auto-rows-[220px] gap-5 md:grid-cols-2 xl:grid-cols-3">
				{#each data.plant.images as image, index (image.imageUrl)}
					<button
						type="button"
						onclick={() => openLightbox(index)}
						aria-label={`Kép megnyitása: ${image.alt}`}
						class={`group relative overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] ${tileClass(index)}`}
					>
						<img
							src={image.imageUrl}
							alt={image.alt}
							loading="lazy"
							class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
						/>
						{#if image.isCover}
							<div
								class="bg-primary absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
							>
								Borítókép
							</div>
						{/if}
						<div
							class="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 via-black/10 to-transparent px-5 py-4 opacity-0 transition group-hover:opacity-100"
						>
							<p class="text-sm font-medium text-white">{image.alt}</p>
						</div>
					</button>
				{/each}
			</div>
		{:else}
			<div
				class="rounded-4xl border border-dashed border-gray-200 bg-white/70 px-8 py-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
			>
				<p class="text-sm font-semibold tracking-[0.25em] text-gray-600 uppercase">Üres galéria</p>
				<h2 class="mt-4 text-3xl font-black text-gray-900">
					Ehhez a növényhez még nincs feltöltött kép.
				</h2>
			</div>
		{/if}
	</div>
</section>

<svelte:window onkeydown={handleKeydown} />

{#if activeImageIndex !== null}
	<dialog
		use:modal
		oncancel={(event) => {
			event.preventDefault();
			closeLightbox();
		}}
		class="fixed inset-0 z-50 m-0 flex h-dvh max-h-none w-screen max-w-none items-center justify-center border-0 bg-black/85 p-4 sm:p-8"
		aria-modal="true"
		aria-label={`${data.plant.name} galéria nagyítás`}
	>
		<button
			type="button"
			class="absolute inset-0 cursor-default"
			aria-label="Bezárás"
			onclick={closeLightbox}
		></button>

		<button
			type="button"
			class="absolute top-1/2 left-2 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/18 sm:left-6 sm:h-20 sm:w-20"
			aria-label="Előző kép"
			onclick={showPreviousImage}
		>
			‹
		</button>

		<div class="relative z-10 flex max-h-full w-full max-w-6xl flex-col items-center gap-4">
			<img
				src={data.plant.images[activeImageIndex].imageUrl}
				alt={data.plant.images[activeImageIndex].alt}
				class="max-h-[78vh] w-auto max-w-full rounded-[28px] object-contain shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
			/>
			<div class="rounded-full bg-black/35 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
				{activeImageIndex + 1} / {data.plant.images.length}
			</div>
		</div>

		<button
			type="button"
			class="absolute top-1/2 right-2 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/18 sm:right-6 sm:h-20 sm:w-20"
			aria-label="Következő kép"
			onclick={showNextImage}
		>
			›
		</button>

		<button
			type="button"
			class="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-2xl text-white transition hover:bg-white/20 sm:top-6 sm:right-6"
			aria-label="Bezárás"
			onclick={closeLightbox}
		>
			×
		</button>
	</dialog>
{/if}
