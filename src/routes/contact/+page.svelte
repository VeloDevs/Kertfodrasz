<script lang="ts">
	import { env } from '$env/dynamic/public';

	const DEFAULT_BACKEND_URL = 'http://127.0.0.1:8000';
	const PUBLIC_BACKEND_URL = (env.PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL).replace(/\/$/, '');
	const CONTACT_ENDPOINT = `${PUBLIC_BACKEND_URL}/api/contact`;
	const CONTACT_SUBJECTS = ['Érdeklődés', 'Hiba jelentése', 'Egyéb'];

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let subject = $state(CONTACT_SUBJECTS[0]);
	let message = $state('');
	let website = $state('');

	let statusMessage = $state('');
	let statusType = $state<'idle' | 'success' | 'error'>('idle');
	let isLoading = $state(false);

	function isEmailValid(value: string) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
	}

	const canSubmit = $derived(
		!isLoading &&
			name.trim().length > 0 &&
			isEmailValid(email.trim()) &&
			subject.trim().length > 0 &&
			message.trim().length > 0
	);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		statusMessage = '';

		if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
			statusType = 'error';
			statusMessage = 'Tölts ki minden kötelező mezőt.';
			return;
		}

		if (!isEmailValid(email.trim())) {
			statusType = 'error';
			statusMessage = 'Érvénytelen e-mail cím.';
			return;
		}

		isLoading = true;

		const formData = {
			name,
			email,
			phone,
			subject,
			message,
			website
		};

		try {
			const response = await fetch(CONTACT_ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(formData)
			});

			const result = await response.json().catch(() => null);

			if (response.ok) {
				statusType = 'success';
				statusMessage = 'Köszönjük az üzenetet! Hamarosan felvesszük veled a kapcsolatot.';
				name = '';
				email = '';
				phone = '';
				subject = CONTACT_SUBJECTS[0];
				message = '';
				website = '';
			} else {
				statusType = 'error';
				statusMessage = result?.message || 'Sikertelen küldés, próbáld újra később!';
			}
		} catch (error) {
			statusType = 'error';
			statusMessage = 'Sikertelen küldés, próbáld újra később!';
			console.error(error);
		}

		isLoading = false;
	}
</script>

<svelte:head>
	<title>Kapcsolat | Kertfodrász</title>
	<meta
		name="description"
		content="Vedd fel velünk a kapcsolatot ingyenes helyszíni felmérésért és személyre szabott kertépítési ajánlatért Baranya megyében."
	/>
</svelte:head>

<div
	class="mx-auto my-12 max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-green-900/10 sm:my-20"
>
	<div class="grid grid-cols-1 md:grid-cols-2">
		<div
			class="relative flex flex-col justify-between bg-green-900 px-6 py-10 text-white sm:px-10 xl:p-12"
		>
			<div>
				<h1 class="text-3xl font-extrabold tracking-tight">Vedd fel velünk a kapcsolatot</h1>
				<p class="mt-4 text-lg text-green-200">
					Álmaid kertje csak egy karnyújtásnyira van. Töltsd ki az űrlapot, vagy keress minket
					közvetlenül az alábbi elérhetőségeken.
				</p>

				<dl class="mt-8 space-y-6">
					<div class="flex items-start">
						<div class="shrink-0">
							<svg
								class="h-6 w-6 text-green-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
								/>
							</svg>
						</div>
						<dt class="sr-only">Telefonszám</dt>
						<dd class="ml-3 text-base">
							<a href="tel:+36205209276" class="hover:underline">+36 20 520 9276</a>
						</dd>
					</div>

					<div class="flex items-start">
						<div class="shrink-0">
							<svg
								class="h-6 w-6 text-green-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
								/>
							</svg>
						</div>
						<dt class="sr-only">Email</dt>
						<dd class="ml-3 text-base">
							<a href="mailto:kertfodrasz@gmail.com" class="hover:underline"
								>kertfodrasz@gmail.com</a
							>
						</dd>
					</div>

					<div class="flex items-start">
						<div class="shrink-0">
							<svg
								class="h-6 w-6 text-green-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
								/>
							</svg>
						</div>
						<dt class="sr-only">Cím</dt>
						<dd class="ml-3 text-base">Kozármisleny, Baranya megye, Magyarország</dd>
					</div>
				</dl>
			</div>

			<div class="absolute -right-5 -bottom-5 text-9xl opacity-20" aria-hidden="true">🌿</div>
		</div>

		<div class="bg-white px-6 py-10 sm:px-10 xl:p-12">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Küldj üzenetet</h2>

			<form
				onsubmit={handleSubmit}
				class="space-y-6"
				aria-describedby={statusMessage ? 'form-status' : undefined}
			>
				<div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
					<div class="sm:col-span-2">
						<label for="name" class="block text-sm font-semibold text-gray-700">Név *</label>
						<input
							id="name"
							type="text"
							bind:value={name}
							class="mt-1 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
							placeholder="Gipsz Jakab"
							autocomplete="name"
						/>
					</div>

					<div>
						<label for="email" class="block text-sm font-semibold text-gray-700">E-mail cím *</label
						>
						<input
							id="email"
							type="email"
							bind:value={email}
							class="mt-1 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
							placeholder="pelda@email.com"
							autocomplete="email"
							inputmode="email"
						/>
					</div>

					<div>
						<label for="phone" class="block text-sm font-semibold text-gray-700">Telefonszám</label>
						<input
							id="phone"
							type="tel"
							bind:value={phone}
							class="mt-1 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-green-500 focus:ring-green-500"
							placeholder="+36 20 123 4567"
							autocomplete="tel"
							inputmode="tel"
						/>
					</div>

					<div class="sm:col-span-2">
						<label for="subject" class="block text-sm font-semibold text-gray-700">Tárgy *</label>
						<select
							id="subject"
							bind:value={subject}
							class="mt-1 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
						>
							{#each CONTACT_SUBJECTS as option (option)}
								<option value={option}>{option}</option>
							{/each}
						</select>
					</div>

					<div class="sm:col-span-2">
						<label for="message" class="block text-sm font-semibold text-gray-700">Üzenet *</label>
						<textarea
							id="message"
							bind:value={message}
							rows="4"
							class="mt-1 block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-green-500 focus:ring-green-500"
							required
							placeholder="Írd meg, miben segíthetünk..."
						></textarea>
					</div>

					<div class="sm:col-span-2">
						<input
							id="website"
							type="text"
							bind:value={website}
							autocomplete="off"
							tabindex="-1"
							aria-hidden="true"
							class="hidden"
						/>
					</div>

					<div class="sm:col-span-2">
						<button
							type="submit"
							disabled={!canSubmit}
							class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-700 px-6 py-3 text-base font-medium text-white shadow-sm transition-all hover:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
						>
							{isLoading ? 'Küldés folyamatban...' : 'Üzenet küldése'}
						</button>
					</div>
				</div>
			</form>

			{#if statusMessage}
				<div
					id="form-status"
					class={`mt-6 rounded p-4 text-center text-sm font-semibold ${statusType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
					role="alert"
					aria-live="polite"
				>
					{statusMessage}
				</div>
			{/if}
		</div>
	</div>
</div>
