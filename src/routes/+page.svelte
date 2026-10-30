<script lang="ts">
	import ServiceCardImage from '#lib/components/ServiceCardImage.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const desktopImage = $derived(
		data.hero?.main.imageUrl ? data.hero.main : data.hero?.detail.imageUrl ? data.hero.detail : null
	);
	const mobileImage = $derived(data.hero?.detail.imageUrl ? data.hero.detail : desktopImage);
</script>

<svelte:head>
	<title>Kertfodrász | Precíz kertápolás kompromisszumok nélkül</title>
	<meta
		name="description"
		content="Szakértelem és szenvedély a kertápolásban. Kertépítés, gyepszőnyegezés, öntözőrendszer telepítés és teljes zöldterület-kezelés Baranya megyében."
	/>
</svelte:head>

<div class="bg-white">
	<div class="mx-auto max-w-[1536px] sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
		<div
			class="relative isolate flex min-h-[90vh] items-end overflow-hidden bg-gray-900 pb-12 sm:rounded-[2.5rem] sm:shadow-2xl lg:max-h-[880px] lg:min-h-[700px] lg:items-center lg:pb-0"
		>
			{#if mobileImage}
				<img
					src={mobileImage.imageUrl}
					alt={mobileImage.alt}
					loading="eager"
					fetchpriority="high"
					class="absolute inset-0 -z-10 h-full w-full object-cover object-center lg:hidden"
				/>
			{/if}
			{#if desktopImage}
				<img
					src={desktopImage.imageUrl}
					alt={desktopImage.alt}
					loading="eager"
					fetchpriority="high"
					class="absolute inset-0 -z-10 hidden h-full w-full object-cover object-center lg:block"
				/>
			{/if}

			<div
				class="absolute inset-0 -z-10 bg-linear-to-t from-gray-900/95 via-gray-900/70 to-transparent lg:hidden"
			></div>

			<div
				class="absolute inset-0 -z-10 hidden bg-linear-to-r from-gray-900/90 via-gray-900/40 via-35% to-transparent to-60% lg:block"
			></div>

			<div class="relative z-10 w-full px-6 pt-32 lg:px-16 lg:pt-0">
				<div class="max-w-2xl text-left lg:max-w-3xl">
					<div
						class="border-sage bg-sage mb-6 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold text-gray-800 shadow-sm lg:mb-8"
					>
						<span class="bg-primary mr-2 flex h-2 w-2 rounded-full" aria-hidden="true"></span>
						Dél-Dunántúl és vonzáskörzete.
					</div>

					<h1
						class="text-4xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl"
					>
						Precíz kertépítés, <br />
						<span class="text-sage">kompromisszumok nélkül.</span>
					</h1>

					<p
						class="mt-4 max-w-2xl text-base leading-7 text-gray-100 drop-shadow-sm lg:mt-6 lg:text-lg lg:leading-8"
					>
						Szakértelem és szenvedély a kertápolásban. Álmaid kertje csak egy karnyújtásnyira van.
						Ránk bízhatod a kerted teljeskörú építését és gondozását.
					</p>

					<div class="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-10">
						<a
							href="/contact"
							class="bg-primary focus-visible:outline-sage inline-flex items-center justify-center rounded-md px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 lg:text-lg"
						>
							Ajánlatot kérek
						</a>
						<a
							href="#szolgaltatasok"
							class="group inline-flex items-center justify-center rounded-md border border-gray-300/30 bg-white/5 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 lg:text-lg"
						>
							Miben segíthetünk?
							<span aria-hidden="true" class="ml-2 transition-transform group-hover:translate-x-1"
								>→</span
							>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<section id="szolgaltatasok" class="bg-gray-50 py-20 sm:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<span class="text-sm font-semibold tracking-[0.3em] text-gray-800 uppercase"
				>Szolgáltatásaink</span
			>
			<h2 class="mt-4 text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
				Prémium <span class="font-semibold">kertészeti megoldások</span>
			</h2>
			<div class="bg-sage mx-auto mt-6 h-px w-16"></div>
		</div>

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<div
				class="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl lg:col-span-2 lg:flex-row"
			>
				<div class="relative h-64 w-full overflow-hidden lg:h-auto lg:w-3/5">
					<a href="/references" aria-label="Teljeskörű Kertépítés referenciák megtekintése">
						<ServiceCardImage
							image={data.services['garden-construction']}
							label="Teljeskörű Kertépítés"
						/>
					</a>
				</div>
				<div class="flex flex-col justify-center p-8 lg:w-2/5 lg:p-12">
					<h3 class="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Teljeskörű Kertépítés</h3>
					<p class="mb-8 text-sm leading-relaxed text-gray-500 sm:text-base">
						A tervezéstől a megvalósításig. Megtervezzük álmaid kertjét és nulláról felépítjük,
						beleértve a földmunkát, növénytelepítést és a végső simításokat.
					</p>
					<a
						href="/contact"
						aria-label="Kapcsolatfelvétel teljeskörű kertépítéssel kapcsolatban"
						class="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-gray-900 uppercase"
					>
						Érdekel <span
							class="bg-primary block h-px w-8 transition-all duration-300 group-hover:w-12"
						></span>
					</a>
				</div>
			</div>

			<div
				class="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl sm:flex-row"
			>
				<div class="relative h-48 w-full overflow-hidden sm:h-auto sm:w-2/5">
					<a href="/references" aria-label="Öntözőrendszer építés referenciák">
						<ServiceCardImage image={data.services['irrigation']} label="Öntözőrendszer építés" />
					</a>
				</div>
				<div class="flex flex-col justify-center p-6 sm:w-3/5">
					<h3 class="mb-2 text-xl font-bold text-gray-900">
						Öntözőrendszer építés és karbantartás
					</h3>
					<p class="mb-4 text-xs leading-relaxed text-gray-500">
						Víztakarékos, automata rendszerek tervezése, telepítése és rendszeres karbantartása,
						hogy kertje mindig friss maradjon.
					</p>
					<a
						href="/contact"
						aria-label="Részletek az öntözőrendszer építésről"
						class="text-[10px] font-bold tracking-wider text-gray-900 uppercase hover:text-gray-950 hover:underline"
						>Részletek &rarr;</a
					>
				</div>
			</div>

			<div
				class="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl sm:flex-row"
			>
				<div class="relative h-48 w-full overflow-hidden sm:h-auto sm:w-2/5">
					<a href="/references" aria-label="Kerttervezési tanácsadás referenciák">
						<ServiceCardImage
							image={data.services['consultation']}
							label="Kerttervezés Tanácsadás"
						/>
					</a>
				</div>
				<div class="flex flex-col justify-center p-6 sm:w-3/5">
					<h3 class="mb-2 text-xl font-bold text-gray-900">Tanácsadás</h3>
					<p class="mb-4 text-xs leading-relaxed text-gray-500">
						Szakmai segítség kertje megtervezéséhez. Igényfelmérés, növényválasztási javaslatok és
						helyszíni szaktanácsadás.
					</p>
					<a
						href="/contact"
						aria-label="Részletek a kertészeti tanácsadásról"
						class="text-[10px] font-bold tracking-wider text-gray-900 uppercase hover:text-gray-950 hover:underline"
						>Részletek &rarr;</a
					>
				</div>
			</div>

			<div
				class="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl sm:flex-row"
			>
				<div class="relative h-48 w-full overflow-hidden sm:h-auto sm:w-2/5">
					<a href="/references" aria-label="Gyepszőnyegezés referenciák">
						<ServiceCardImage image={data.services['lawn']} label="Gyepszőnyegezés" />
					</a>
				</div>
				<div class="flex flex-col justify-center p-6 sm:w-3/5">
					<h3 class="mb-2 text-xl font-bold text-gray-900">Gyepszőnyegezés, füvesítés</h3>
					<p class="mb-4 text-xs leading-relaxed text-gray-500">
						Azonnali zöld kert prémium gyepszőnyeggel, vakondhálózva, vagy hagyományos füvesítés
						magvetéssel és talaj-előkészítéssel.
					</p>
					<a
						href="/contact"
						aria-label="Részletek a gyepszőnyegezésről és füvesítésről"
						class="text-[10px] font-bold tracking-wider text-gray-900 uppercase hover:text-gray-950 hover:underline"
						>Részletek &rarr;</a
					>
				</div>
			</div>

			<div
				class="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl sm:flex-row"
			>
				<div class="relative h-48 w-full overflow-hidden sm:h-auto sm:w-2/5">
					<a href="/references" aria-label="Műfű telepítési referenciák">
						<ServiceCardImage image={data.services['artificial-grass']} label="Műfű telepítés" />
					</a>
				</div>
				<div class="flex flex-col justify-center p-6 sm:w-3/5">
					<h3 class="mb-2 text-xl font-bold text-gray-900">Műfüves területek kialakítása</h3>
					<p class="mb-4 text-xs leading-relaxed text-gray-500">
						Élvezd a tökéletesen zöld kertet egész évben! Prémium, gondozásmentes és kiskedvencbarát
						műfüvet telepítünk kertekbe és teraszokra, hogy több időd maradjon a pihenésre.
					</p>
					<a
						href="/contact"
						aria-label="Részletek a műfű telepítésről"
						class="text-[10px] font-bold tracking-wider text-gray-900 uppercase hover:text-gray-950 hover:underline"
						>Részletek &rarr;</a
					>
				</div>
			</div>

			<div
				class="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl sm:flex-row"
			>
				<div class="relative h-48 w-full overflow-hidden sm:h-auto sm:w-2/5">
					<a href="/references" aria-label="Kertgondozási referenciák">
						<ServiceCardImage image={data.services['maintenance']} label="Kertgondozás" />
					</a>
				</div>
				<div class="flex flex-col justify-center p-6 sm:w-3/5">
					<h3 class="mb-2 text-xl font-bold text-gray-900">Teljeskörű kertgondozás</h3>
					<p class="mb-4 text-xs leading-relaxed text-gray-500">
						Rendszeres fűnyírás, gyomirtás, tápanyag-utánpótlás, sövénynyírás és növényápolás a kert
						folyamatos szépségéért.
					</p>
					<a
						href="/contact"
						aria-label="Részletek a teljeskörű kertgondozásról"
						class="text-[10px] font-bold tracking-wider text-gray-900 uppercase hover:text-gray-950 hover:underline"
						>Részletek &rarr;</a
					>
				</div>
			</div>

			<div
				class="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl sm:flex-row"
			>
				<div class="relative h-48 w-full overflow-hidden sm:h-auto sm:w-2/5">
					<a href="/references" aria-label="Fakivágási referenciák">
						<ServiceCardImage image={data.services['tree-removal']} label="Fakivágás" />
					</a>
				</div>
				<div class="flex flex-col justify-center p-6 sm:w-3/5">
					<h3 class="mb-2 text-xl font-bold text-gray-900">Fakivágás</h3>
					<p class="mb-4 text-xs leading-relaxed text-gray-500">
						Veszélyes fák szakszerű és biztonságos kivágása, beleértve a tuskómarást és a
						zöldhulladék elszállítását.
					</p>
					<a
						href="/contact"
						aria-label="Részletek a fakivágásról"
						class="text-[10px] font-bold tracking-wider text-gray-900 uppercase hover:text-gray-950 hover:underline"
						>Részletek &rarr;</a
					>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="velemenyek" class="bg-white py-20 sm:py-28">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<span class="text-sm font-semibold tracking-[0.3em] text-gray-800 uppercase">Vélemények</span>
			<h2 class="mt-4 text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
				Akik már minket <span class="font-semibold italic">választottak</span>
			</h2>

			<div class="mt-6 flex flex-col items-center justify-center">
				<div
					class="mb-2 flex items-center gap-1 text-yellow-400"
					aria-label="Értékelés: 4.9 csillag az 5-ből"
				>
					{#each [1, 2, 3, 4] as star (star)}
						<svg class="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
							/>
						</svg>
					{/each}

					<svg class="h-5 w-5" viewBox="0 0 20 20" aria-hidden="true">
						<defs>
							<linearGradient id="star-grad-49">
								<stop offset="90%" stop-color="currentColor" />
								<stop offset="90%" stop-color="#E5E7EB" />
							</linearGradient>
						</defs>
						<path
							fill="url(#star-grad-49)"
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
						/>
					</svg>
				</div>

				<p class="text-sm font-medium text-gray-500">
					<span class="font-bold text-gray-900">4.9 / 5</span>
					több mint 15 Google értékelés alapján
				</p>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div
				class="group hover:ring-sage relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-gray-50 p-8 ring-1 ring-gray-200/50 transition-all duration-300 hover:bg-white hover:shadow-xl"
			>
				<div>
					<svg
						class="text-sage mb-4 h-8 w-8"
						fill="currentColor"
						viewBox="0 0 32 32"
						aria-hidden="true"
					>
						<path
							d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
						/>
					</svg>
					<p class="text-base leading-relaxed text-gray-600 italic">
						Kertünket ők varázsolták gyönyörűvé a nyáron: gyepszőnyeg, növények telepítése,
						öntözőrendszer kialakítása. Nagyon szép lett a kertünk, mindennel meg voltunk elégedve!
						Bátran ajánlom a Kert fodrász céget azoknak akik szép, igényes kertet szeretnének
						otthonukba!
					</p>
				</div>

				<div class="mt-8 flex items-center gap-4">
					<div
						class="bg-sage flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-gray-800"
					>
						J.SZ.
					</div>
					<div>
						<p class="text-sm font-bold tracking-tight text-gray-900 uppercase">Jakab Szilvia</p>
						<p class="text-[11px] tracking-widest text-gray-500 uppercase">Harkány</p>
					</div>
				</div>
			</div>

			<div
				class="group hover:ring-sage relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-gray-50 p-8 ring-1 ring-gray-200/50 transition-all duration-300 hover:bg-white hover:shadow-xl"
			>
				<div>
					<svg
						class="text-sage mb-4 h-8 w-8"
						fill="currentColor"
						viewBox="0 0 32 32"
						aria-hidden="true"
					>
						<path
							d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
						/>
					</svg>
					<p class="text-base leading-relaxed text-gray-600 italic">
						Pontos, megbízható szakember. Ajánlani tudom mindenkinek, akinek lelkiismeretes
						kertépítőre van szüksége.
					</p>
				</div>

				<div class="mt-8 flex items-center gap-4">
					<div
						class="bg-sage flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-gray-800"
					>
						S.É.
					</div>
					<div>
						<p class="text-sm font-bold tracking-tight text-gray-900 uppercase">Simon Éva</p>
						<p class="text-[11px] tracking-widest text-gray-500 uppercase">Pécs</p>
					</div>
				</div>
			</div>

			<div
				class="group hover:ring-sage relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-gray-50 p-8 ring-1 ring-gray-200/50 transition-all duration-300 hover:bg-white hover:shadow-xl"
			>
				<div>
					<svg
						class="text-sage mb-4 h-8 w-8"
						fill="currentColor"
						viewBox="0 0 32 32"
						aria-hidden="true"
					>
						<path
							d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
						/>
					</svg>
					<p class="text-base leading-relaxed text-gray-600 italic">
						Az öntözőrendszer telepítése óta megszűnt minden gondunk a locsolással. Profi tervezés,
						láthatatlan kivitelezés. Csillagos ötös!
					</p>
				</div>

				<div class="mt-8 flex items-center gap-4">
					<div
						class="bg-sage flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-gray-800"
					>
						V.Z.
					</div>
					<div>
						<p class="text-sm font-bold tracking-tight text-gray-900 uppercase">Varga Zoltán</p>
						<p class="text-[11px] tracking-widest text-gray-500 uppercase">Pogány</p>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-10 text-center">
			<a
				href="https://www.google.com/maps/place/Kertfodrász+Kft./@46.0513266,18.2896403,17z/data=!4m17!1m8!3m7!1s0x4742b6ace5835bc1:0xd588def19b8aa0d1!2sKertfodrász+Kft.!8m2!3d46.051328!4d18.2893536!10e5!16s%2Fg%2F1q6j35r49!3m7!1s0x4742b6ace5835bc1:0xd588def19b8aa0d1!8m2!3d46.051328!4d18.2893536!9m1!1b1!16s%2Fg%2F1q6j35r49?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Összes Google értékelés megtekintése új ablakban"
				class="inline-flex items-center gap-3 rounded-full bg-white px-8 py-3 text-sm font-bold text-gray-900 shadow-md ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-lg"
			>
				<img
					src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
					alt="Google"
					class="h-5 w-5"
					loading="lazy"
				/>
				Összes Google értékelés megtekintése
			</a>
		</div>
	</div>
</section>

<section id="munkafolyamat" class="bg-white py-20 sm:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="text-3xl font-light text-gray-900">
				Hogyan lesz <span class="font-semibold italic">álmai kertje?</span>
			</h2>
		</div>

		<div class="grid grid-cols-1 gap-12 md:grid-cols-3">
			<div class="relative text-center">
				<div
					class="bg-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg"
				>
					1
				</div>
				<h3 class="mb-2 text-xl font-bold text-gray-900">Ingyenes felmérés</h3>
				<p class="text-sm leading-relaxed text-gray-500">
					Kijövünk a helyszínre, átbeszéljük az elképzeléseit és felmérjük a lehetőségeket Baranya
					megyében.
				</p>
			</div>
			<div class="relative text-center">
				<div
					class="bg-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg"
				>
					2
				</div>
				<h3 class="mb-2 text-xl font-bold text-gray-900">Személyre szabott ajánlat</h3>
				<p class="text-sm leading-relaxed text-gray-500">
					Részletes, rejtett költségektől mentes ajánlatot készítünk a kért kertészeti munkákra.
				</p>
			</div>
			<div class="relative text-center">
				<div
					class="bg-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg"
				>
					3
				</div>
				<h3 class="mb-2 text-xl font-bold text-gray-900">Profi kivitelezés</h3>
				<p class="text-sm leading-relaxed text-gray-500">
					Modern gépekkel és szakértelemmel varázsoljuk kertjét olyanná, amilyennek megálmodta.
				</p>
			</div>
		</div>
	</div>
</section>
