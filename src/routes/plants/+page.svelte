<script lang="ts">
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
			replaceState: true,
			noScroll: true,
			keepFocus: true
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

<section
	class="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(183,214,170,0.45),transparent_34%),linear-gradient(180deg,#f7f2e8_0%,#f9faf7_52%,#eff4ec_100%)]"
>
	<div
		class="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(135deg,rgba(35,129,33,0.12),transparent_58%)]"
	></div>

	<div
		class="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
	>
		<div class="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-end">
			<div class="max-w-3xl space-y-6">
				<p
					class="inline-flex rounded-full border border-[#b8cfad] bg-white/70 px-4 py-2 text-xs font-semibold tracking-[0.28em] text-[#35663a] uppercase backdrop-blur-sm"
				>
					Növénytár
				</p>
				<h1
					class="max-w-2xl text-4xl font-black tracking-tight text-[#1e2d1f] sm:text-5xl lg:text-6xl"
				>
					Találd meg a kertedhez illő növényeket, gyors szűréssel és kereséssel.
				</h1>
				<p class="max-w-2xl text-lg leading-8 text-[#4f6350] sm:text-xl">
					Szűrj kategóriák szerint, vagy írj be egy részletet a növény nevéből. A kereső találatot
					ad eleje, közepe és vége egyezésre is.
				</p>
			</div>
		</div>

		<form method="GET" action="/plants" class="max-w-xl" onsubmit={handleSearchSubmit}>
			<input
				type="search"
				name="q"
				value={data.searchQuery}
				oninput={handleSearchInput}
				placeholder="Keresés növény névre..."
				class="w-full rounded-2xl border border-[#cedac8] bg-white/90 px-5 py-3.5 text-base text-[#1f3522] shadow-[0_10px_30px_rgba(45,68,42,0.08)] transition outline-none placeholder:text-[#829083] focus:border-[#5f815f] focus:ring-2 focus:ring-[#b9d0b3]"
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
						? 'border-[#1f4d2c] bg-[#1f4d2c] text-white shadow-[0_14px_30px_rgba(31,77,44,0.25)]'
						: 'border-[#cad8c4] bg-white/80 text-[#35513a] hover:border-[#7e9a7c] hover:bg-white'
				}`}
			>
				Mind
			</a>
			{#each data.categories as category (category.slug)}
				<a
					href={buildCategoryHref(category.slug)}
					class={`rounded-3xl border px-5 py-2.5 text-sm font-semibold transition ${
						data.selectedCategorySlug === category.slug
							? 'border-[#1f4d2c] bg-[#1f4d2c] text-white shadow-[0_14px_30px_rgba(31,77,44,0.25)]'
							: 'border-[#cad8c4] bg-white/80 text-[#35513a] hover:border-[#7e9a7c] hover:bg-white'
					}`}
				>
					{category.name}
					<span class="ml-2 text-xs opacity-75">{category.plantCount}</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f7f8f3] py-16 sm:py-20">
	<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		{#if data.plants.length > 0}
			<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{#each data.plants as plant (plant.slug)}
					<a
						href={`/plants/${plant.slug}`}
						class="group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-[0_20px_50px_rgba(45,68,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(45,68,42,0.16)]"
					>
						<div class="relative aspect-4/3 overflow-hidden bg-[#e9f0e3]">
							{#if plant.coverImageUrl}
								<img
									src={plant.coverImageUrl}
									alt={plant.name}
									class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
								/>
							{:else}
								<div
									class="flex h-full items-center justify-center bg-[linear-gradient(135deg,#dde9d4_0%,#f4f7ef_100%)] text-sm font-semibold tracking-[0.25em] text-[#58715a] uppercase"
								>
									Nincs kép
								</div>
							{/if}
						</div>

						<div class="flex flex-1 flex-col gap-5 p-6">
							<div>
								<h2 class="text-2xl font-black tracking-tight text-[#223424]">{plant.name}</h2>
								{#if plant.description}
									<p class="mt-3 line-clamp-2 text-sm leading-6 text-[#5b6f5d]">
										{plant.description}
									</p>
								{:else}
									<p class="mt-3 text-sm leading-6 text-[#7a8c79]">Leírás hamarosan.</p>
								{/if}
							</div>

							<div class="mt-auto flex flex-wrap gap-2 border-t border-[#eef2e8] pt-4">
								{#if plant.categories.length > 0}
									{#each plant.categories as category (category.slug)}
										<span
											class="rounded-full bg-[#eef3e8] px-3 py-1 text-xs font-semibold text-[#305338]"
										>
											{category.name}
										</span>
									{/each}
								{:else}
									<span
										class="rounded-full bg-[#f1f4ed] px-3 py-1 text-xs font-semibold text-[#70826f]"
									>
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
				class="rounded-4xl border border-dashed border-[#c8d5c0] bg-white/70 px-8 py-16 text-center shadow-[0_20px_50px_rgba(45,68,42,0.06)]"
			>
				<p class="text-sm font-semibold tracking-[0.25em] text-[#6a806a] uppercase">
					Nincs találat
				</p>
				<h2 class="mt-4 text-3xl font-black text-[#243225]">
					Ehhez a kereséshez vagy szűréshez még nincs növény.
				</h2>
				<p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5f705f]">
					Próbálj másik kategóriát választani, vagy módosítsd a keresési kifejezést.
				</p>
			</div>
		{/if}
	</div>
</section>
