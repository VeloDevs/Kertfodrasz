<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const formatter = new Intl.DateTimeFormat('hu-HU', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	function formatDate(value: string | null) {
		if (!value) {
			return 'Dátum nélkül';
		}

		return formatter.format(new Date(value));
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
					Referenciák
				</p>
				<h1
					class="max-w-2xl text-4xl font-black tracking-tight text-[#1e2d1f] sm:text-5xl lg:text-6xl"
				>
					Kerti munkáink képekben, rendezett referencia mappákban.
				</h1>
				<p class="max-w-2xl text-lg leading-8 text-[#4f6350] sm:text-xl">
					Válogass kategóriák szerint, és nézd meg az elkészült kertek, ültetések és részletek
					fotóit külön albumokra bontva.
				</p>
			</div>
		</div>

		<div class="flex flex-wrap gap-3">
			<a
				href="/references"
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
					href={`/references?category=${encodeURIComponent(category.slug)}`}
					class={`rounded-3xl border px-5 py-2.5 text-sm font-semibold transition ${
						data.selectedCategorySlug === category.slug
							? 'border-[#1f4d2c] bg-[#1f4d2c] text-white shadow-[0_14px_30px_rgba(31,77,44,0.25)]'
							: 'border-[#cad8c4] bg-white/80 text-[#35513a] hover:border-[#7e9a7c] hover:bg-white'
					}`}
				>
					{category.name}
					<span class="ml-2 text-xs opacity-75">{category.albumCount}</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f7f8f3] py-16 sm:py-20">
	<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		{#if data.albums.length > 0}
			<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{#each data.albums as album (album.slug)}
					<a
						href={`/references/${album.slug}`}
						class="group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-[0_20px_50px_rgba(45,68,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(45,68,42,0.16)]"
					>
						<div class="relative aspect-4/3 overflow-hidden bg-[#e9f0e3]">
							{#if album.coverImageUrl}
								<img
									src={album.coverImageUrl}
									alt={album.title}
									class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
								/>
							{:else}
								<div
									class="flex h-full items-center justify-center bg-[linear-gradient(135deg,#dde9d4_0%,#f4f7ef_100%)] text-sm font-semibold tracking-[0.25em] text-[#58715a] uppercase"
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
									<p class="text-xs font-semibold tracking-[0.24em] text-[#68806b] uppercase">
										{album.category?.name ?? 'Kategória nélkül'}
									</p>
									<h2 class="mt-3 text-2xl font-black tracking-tight text-[#223424]">
										{album.title}
									</h2>
								</div>
								<span
									class="rounded-full bg-[#eef3e8] px-3 py-1 text-xs font-semibold text-[#305338]"
								>
									{imageCountLabel(album.imageCount)}
								</span>
							</div>

							<div
								class="mt-auto flex items-center justify-between gap-4 border-t border-[#eef2e8] pt-4 text-sm text-[#5f705f]"
							>
								<span>{formatDate(album.workDate)}</span>
								<span class="font-semibold text-[#1f4d2c]">Mappa megnyitása</span>
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
					Üres kategória
				</p>
				<h2 class="mt-4 text-3xl font-black text-[#243225]">
					Ehhez a szűréshez még nincs feltöltött referencia.
				</h2>
				<p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5f705f]">
					Válassz másik kategóriát, vagy térj vissza az összes mappához, hogy lásd a többi elkészült
					munkát.
				</p>
			</div>
		{/if}
	</div>
</section>
