<script lang="ts">
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';

	let isMobileMenuOpen = $state(false);

	function toggleMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMenu() {
		isMobileMenuOpen = false;
	}
</script>

<div class="hidden bg-[#137d38] py-2 text-sm text-white md:block">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<div class="flex items-center gap-6">
			<a href="tel:+36205209276" class="flex items-center gap-2 transition hover:text-gray-200">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path
						d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
					/></svg
				>
				<span>+36 20 520 9276</span>
			</a>

			<a
				href="mailto:kertfodrasz@gmail.com"
				class="flex items-center gap-2 transition hover:text-gray-200"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><rect width="20" height="16" x="2" y="4" rx="2" /><path
						d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
					/></svg
				>
				<span>kertfodrasz@gmail.com</span>
			</a>
		</div>

		<div class="flex items-center gap-4">
			<a
				href="https://www.tiktok.com/@Kertfodrasz"
				target="_blank"
				aria-label="TikTok oldalunk"
				class="transition hover:text-gray-200"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
				</svg>
			</a>
			<a
				href="https://www.facebook.com/Kertfodrasz"
				target="_blank"
				aria-label="Facebook oldalunk"
				class="transition hover:text-gray-200"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
				</svg>
			</a>

			<a
				href="https://www.instagram.com/kertfodrasz/	"
				target="_blank"
				aria-label="Instagram oldalunk"
				class="transition hover:text-gray-200"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
					<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
					<line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
				</svg>
			</a>
		</div>
	</div>
</div>

<nav
	class="dark:bg-background-dark/95 sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-colors"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="shrink-0">
				<a href="/" class="text-primary text-xl font-black" onclick={closeMenu}>Kertfodrász</a>
			</div>

			<div class="hidden items-center space-x-2 md:flex">
				<a href="/" class="nav-link" class:active={page.url.pathname.includes('homepage')}>
					Kezdőoldal
					<span class="underline-animation"></span>
				</a>
				<a
					href="/references"
					class="nav-link"
					class:active={page.url.pathname.includes('portfolio')}
				>
					Referenciák
					<span class="underline-animation"></span>
				</a>
				<a href="/plants" class="nav-link" class:active={page.url.pathname.includes('plants')}>
					Növények
					<span class="underline-animation"></span>
				</a>
				<a href="/contact" class="nav-link" class:active={page.url.pathname.includes('contact')}>
					Kapcsolat
					<span class="underline-animation"></span>
				</a>
			</div>

			<div class="flex md:hidden">
				<button
					type="button"
					aria-label="Toggle Menu"
					class="relative flex size-10 cursor-pointer items-center justify-center rounded-md text-gray-600 dark:text-gray-200"
					onclick={toggleMenu}
				>
					<div class="flex w-6 flex-col items-end gap-1.5">
						<span
							class="h-0.5 bg-current transition-all duration-300 {isMobileMenuOpen
								? 'w-6 translate-y-2 rotate-45'
								: 'w-6'}"
						></span>
						<span
							class="h-0.5 bg-current transition-all duration-300 {isMobileMenuOpen
								? 'opacity-0'
								: 'w-4'}"
						></span>
						<span
							class="h-0.5 bg-current transition-all duration-300 {isMobileMenuOpen
								? 'w-6 -translate-y-2 -rotate-45'
								: 'w-5'}"
						></span>
					</div>
				</button>
			</div>
		</div>
	</div>

	{#if isMobileMenuOpen}
		<div
			transition:slide={{ duration: 300 }}
			class=" overflow-hidden bg-white md:hidden dark:border-gray-800"
		>
			<div class="flex flex-col gap-1 px-4 pt-2 pb-6">
				<a
					href="/"
					class="mobile-link"
					class:active={page.url.pathname.includes('homepage')}
					onclick={closeMenu}>Kezdőoldal</a
				>
				<a
					href="/references"
					class="mobile-link"
					class:active={page.url.pathname.includes('portfolio')}
					onclick={closeMenu}>Referenciák</a
				>
				<a
					href="/plants"
					class="mobile-link"
					class:active={page.url.pathname.includes('plants')}
					onclick={closeMenu}>Növények</a
				>
				<a
					href="/contact"
					class="mobile-link"
					class:active={page.url.pathname.includes('contact')}
					onclick={closeMenu}>Kapcsolat</a
				>
				<!-- <div class="my-4 border-t border-gray-100 dark:border-gray-100"></div> -->
			</div>
		</div>
	{/if}
</nav>

<style>
	.nav-link {
		position: relative;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #4b5563;
		transition: color 0.2s;
	}
	:global(.dark) .nav-link {
		color: #d1d5db;
	}
	.nav-link:hover,
	.nav-link.active {
		color: #238121;
	}
	:global(.dark) .nav-link:hover,
	:global(.dark) .nav-link.active {
		color: #ffffff;
	}

	.underline-animation {
		position: absolute;
		bottom: 0;
		left: 1rem;
		right: 1rem;
		height: 2px;
		background-color: #238121;
		transform: scaleX(0);
		transition: transform 0.3s ease-out;
		transform-origin: left;
	}
	.nav-link:hover .underline-animation,
	.nav-link.active .underline-animation {
		transform: scaleX(1);
	}

	.mobile-link {
		display: block;
		padding: 1rem 0;
		font-size: 1.125rem;
		font-weight: 700;
		border-bottom: 1px solid #f3f4f6;
		color: #374151;
	}
	.mobile-link.active {
		color: #238121;
	}
	:global(.dark) .mobile-link {
		color: #ffffff;
		border-bottom-color: #1f2937;
	}
	:global(.dark) .mobile-link.active {
		color: #3b82f6;
	}
</style>
