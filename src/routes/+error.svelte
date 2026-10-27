<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} - Az oldal nem található | Kertfodrász</title>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="flex flex-1 items-center justify-center bg-gray-50 px-4 py-24 sm:px-6 lg:px-8">
	<div class="max-w-md text-center">
		<p class="text-primary text-6xl font-black">{page.status}</p>
		<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900">
			{page.status === 404 ? 'A keresett oldal nem található' : 'Valami hiba történt'}
		</h1>
		<p class="mt-4 text-base leading-relaxed text-gray-600">
			{page.error?.message ||
				'Sajnáljuk, de az általad keresett oldal nem létezik vagy átmenetileg nem érhető el.'}
		</p>

		<div class="mt-8 flex items-center justify-center gap-4">
			<a
				href="/"
				class="bg-primary focus:ring-primary inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium text-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
			>
				Vissza a kezdőlapra
			</a>
			<a
				href="/contact"
				class="focus:ring-primary inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
			>
				Kapcsolat
			</a>
		</div>
	</div>
</section>
