<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
	import HeroCollage from '$lib/components/HeroCollage.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function shortDescription(value: string | null) {
		return value?.trim() || 'Nincs rövid leírás.';
	}

	function imageCountLabel(count: number) {
		return `${count} kép`;
	}
</script>

<svelte:head>
	<title>Referenciák | Kertfodrász</title>
	<meta
		name="description"
		content="Kertépítési és kertgondozási munkáink albumokba rendezve, részletes fotóválogatással."
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
					Referenciák
				</p>
				<h1
					class="max-w-xl text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem]"
				>
					Kertek, amelyekre büszkék vagyunk.
				</h1>
				<p class="max-w-lg text-lg leading-8 text-gray-600">
					Nézd meg elkészült kertjeinket, és meríts ötletet a sajátodhoz.
				</p>

				<div class="flex flex-wrap gap-3">
					<a
						href="/references"
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
							href={`/references?category=${encodeURIComponent(category.slug)}`}
							class={`rounded-3xl border px-5 py-2.5 text-sm font-semibold transition ${
								data.selectedCategorySlug === category.slug
									? 'border-primary bg-primary text-white shadow-sm'
									: 'hover:border-primary border-gray-200 bg-white/80 text-gray-800 hover:bg-white'
							}`}
						>
							{category.name}
							<span class="ml-2 text-xs opacity-75">{category.albumCount}</span>
						</a>
					{/each}
				</div>
			</div>
			<HeroCollage hero={data.hero} mainLabel="Kiemelt kertfotó" detailLabel="Kerti részlet" />
		</div>
	</div>
</section>

<section class="bg-stone-50 py-16 sm:py-20">
	<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		{#if data.albums.length > 0}
			<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{#each data.albums as album (album.slug)}
					<a
						href={`/references/${album.slug}`}
						class="group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.16)]"
					>
						<div class="bg-sage relative aspect-4/3 overflow-hidden">
							{#if album.coverImageUrl}
								<img
									src={album.coverImageUrl}
									alt={album.title}
									class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
								/>
							{:else}
								<div
									class="flex h-full items-center justify-center bg-stone-50 text-sm font-semibold tracking-[0.25em] text-gray-600 uppercase"
								>
									Nincs kép
								</div>
							{/if}
							<div
								class="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/45 to-transparent"
							></div>
							<div class="absolute right-4 bottom-4 flex -space-x-3">
								{#each album.previewImageUrls.slice(0, 3) as previewUrl (previewUrl)}
									<img
										src={previewUrl}
										alt="Album előnézet"
										class="size-12 rounded-2xl border-2 border-white object-cover shadow-lg"
									/>
								{/each}
							</div>
						</div>

						<div class="flex flex-1 flex-col gap-5 p-6">
							<div class="flex items-start justify-between gap-4">
								<div>
									<p class="text-xs font-semibold tracking-[0.24em] text-gray-600 uppercase">
										{album.category?.name ?? 'Kategória nélkül'}
									</p>
									<h2 class="mt-3 text-2xl font-black tracking-tight text-gray-900">
										{album.title}
									</h2>
								</div>
								<span class="bg-sage rounded-full px-3 py-1 text-xs font-semibold text-gray-800">
									{imageCountLabel(album.imageCount)}
								</span>
							</div>

							<div
								class="mt-auto flex flex-col gap-4 border-t border-gray-200 pt-4 text-sm text-gray-600"
							>
								<p
									class="leading-6 text-gray-600"
									style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;"
								>
									{shortDescription(album.description)}
								</p>
								<span class="font-semibold text-gray-800">Mappa megnyitása</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<div
				class="rounded-4xl border border-dashed border-gray-200 bg-white/70 px-8 py-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
			>
				<p class="text-sm font-semibold tracking-[0.25em] text-gray-600 uppercase">
					Üres kategória
				</p>
				<h2 class="mt-4 text-3xl font-black text-gray-900">
					Ehhez a szűréshez még nincs feltöltött referencia.
				</h2>
				<p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
					Válassz másik kategóriát, vagy térj vissza az összes mappához, hogy lásd a többi elkészült
					munkát.
				</p>
			</div>
		{/if}
		<Pagination pagination={data.pagination} />
	</div>
</section>
