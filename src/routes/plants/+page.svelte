<script lang="ts">
	import Pagination from '#lib/components/Pagination.svelte';
	import HeroCollage from '#lib/components/HeroCollage.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let debounceTimer: ReturnType<typeof setTimeout> | undefined;

	function buildPlantsHref(categorySlug: string, queryValue: string) {
		const params: string[] = [];

		if (categorySlug !== '') {
			params.push(`category=${encodeURIComponent(categorySlug)}`);
		}

		const normalizedQuery = queryValue.trim();

		if (normalizedQuery !== '') {
			params.push(`q=${encodeURIComponent(normalizedQuery)}`);
		}

		return params.length > 0 ? `/plants?${params.join('&')}` : '/plants';
	}

	function searchNow(inputValue: string) {
		const normalizedInput = inputValue.trim();
		const normalizedCurrent = data.searchQuery.trim();

		if (normalizedInput === normalizedCurrent) {
			return;
		}

		goto(buildPlantsHref(data.selectedCategorySlug, inputValue), {
			replace: true,
			reset: false
		});
	}

	function handleSearchInput(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const nextValue = input.value;

		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		debounceTimer = setTimeout(() => {
			searchNow(nextValue);
		}, 220);
	}

	function handleSearchSubmit(event: SubmitEvent) {
		event.preventDefault();

		const form = event.currentTarget as HTMLFormElement;
		const input = form.elements.namedItem('q') as HTMLInputElement | null;
		const nextValue = input?.value ?? '';

		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		searchNow(nextValue);
	}

	function buildCategoryHref(slug: string) {
		return buildPlantsHref(slug, data.searchQuery);
	}
</script>

<svelte:head>
	<title>Növénytár | Kertfodrász</title>
	<meta
		name="description"
		content="Kertészeti növénytár kategóriákkal és intelligens keresővel, gyors böngészéshez."
	/>
</svelte:head>

<section class="relative overflow-hidden bg-stone-50">
	<div class="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
		<div
			class="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12"
		>
			<div class="min-w-0 space-y-6">
				<p
					class="border-sage bg-sage inline-flex rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.28em] text-gray-800 uppercase backdrop-blur-sm"
				>
					Növénytár
				</p>
				<h1
					class="max-w-xl text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem]"
				>
					Találd meg kerted új kedvenceit.
				</h1>
				<p class="max-w-lg text-lg leading-8 text-gray-600">
					Fedezd fel növényeinket, és válassz a kertedhez illő fajták közül.
				</p>

				<form method="GET" action="/plants" class="max-w-xl" onsubmit={handleSearchSubmit}>
					<input
						type="search"
						name="q"
						value={data.searchQuery}
						oninput={handleSearchInput}
						placeholder="Milyen növényt keresel?"
						class="focus:border-primary focus:ring-primary w-full rounded-2xl border border-gray-200 bg-white/90 px-5 py-3.5 text-base text-gray-900 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition outline-none placeholder:text-gray-600 focus:ring-2"
					/>
					{#if data.selectedCategorySlug !== ''}
						<input type="hidden" name="category" value={data.selectedCategorySlug} />
					{/if}
				</form>

				<div class="flex flex-wrap gap-3">
					<a
						href={buildCategoryHref('')}
						class={`rounded-3xl border px-5 py-2.5 text-sm font-semibold transition ${
							data.selectedCategorySlug === ''
								? 'border-primary bg-primary text-white shadow-sm'
								: 'hover:border-primary border-gray-200 bg-white/80 text-gray-800 hover:bg-white'
						}`}
					>
						Mind
					</a>
					{#each data.categories as category (category.slug)}
						<a
							href={buildCategoryHref(category.slug)}
							class={`rounded-3xl border px-5 py-2.5 text-sm font-semibold transition ${
								data.selectedCategorySlug === category.slug
									? 'border-primary bg-primary text-white shadow-sm'
									: 'hover:border-primary border-gray-200 bg-white/80 text-gray-800 hover:bg-white'
							}`}
						>
							{category.name}
							<span class="ml-2 text-xs opacity-75">{category.plantCount}</span>
						</a>
					{/each}
				</div>
			</div>
			<HeroCollage hero={data.hero} mainLabel="Kiemelt növényfotó" detailLabel="Növényrészlet" />
		</div>
	</div>
</section>

<section class="bg-stone-50 py-16 sm:py-20">
	<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		{#if data.plants.length > 0}
			<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{#each data.plants as plant (plant.slug)}
					<a
						href={`/plants/${plant.slug}`}
						class="group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.16)]"
					>
						<div class="bg-sage relative aspect-4/3 overflow-hidden">
							{#if plant.coverImageUrl}
								<img
									src={plant.coverImageUrl}
									alt={plant.name}
									class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
								/>
							{:else}
								<div
									class="flex h-full items-center justify-center bg-stone-50 text-sm font-semibold tracking-[0.25em] text-gray-600 uppercase"
								>
									Nincs kép
								</div>
							{/if}
						</div>

						<div class="flex flex-1 flex-col gap-5 p-6">
							<div>
								<h2 class="text-2xl font-black tracking-tight text-gray-900">{plant.name}</h2>
								{#if plant.description}
									<p class="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
										{plant.description}
									</p>
								{:else}
									<p class="mt-3 text-sm leading-6 text-gray-600">Leírás hamarosan.</p>
								{/if}
							</div>

							<div class="mt-auto flex flex-wrap gap-2 border-t border-gray-200 pt-4">
								{#if plant.categories.length > 0}
									{#each plant.categories as category (category.slug)}
										<span
											class="bg-sage rounded-full px-3 py-1 text-xs font-semibold text-gray-800"
										>
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
					</a>
				{/each}
			</div>
		{:else}
			<div
				class="rounded-4xl border border-dashed border-gray-200 bg-white/70 px-8 py-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
			>
				<p class="text-sm font-semibold tracking-[0.25em] text-gray-600 uppercase">Nincs találat</p>
				<h2 class="mt-4 text-3xl font-black text-gray-900">
					Ehhez a kereséshez vagy szűréshez még nincs növény.
				</h2>
				<p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
					Próbálj másik kategóriát választani, vagy módosítsd a keresési kifejezést.
				</p>
			</div>
		{/if}
		<Pagination pagination={data.pagination} />
	</div>
</section>
