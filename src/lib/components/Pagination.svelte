<script lang="ts">
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import { page } from '$app/state';
	import type { Pagination } from '$lib/types/pagination';
	let { pagination }: { pagination: Pagination } = $props();
	function href(number: number) {
		const params = new SvelteURLSearchParams(page.url.searchParams);
		params.set('page', String(number));
		return `${page.url.pathname}?${params}`;
	}
</script>

{#if pagination.lastPage > 1}
	<nav
		aria-label="Lapozás"
		class="mt-10 flex flex-wrap items-center justify-center gap-5 text-gray-900"
	>
		{#if pagination.currentPage > 1}<a
				class="text-primary font-semibold underline"
				href={href(pagination.currentPage - 1)}>← Előző</a
			>{/if}
		<span aria-live="polite">{pagination.currentPage}. / {pagination.lastPage}. oldal</span>
		{#if pagination.currentPage < pagination.lastPage}<a
				class="text-primary font-semibold underline"
				href={href(pagination.currentPage + 1)}>Következő →</a
			>{/if}
	</nav>
{/if}
