<script lang="ts">
	import type { HeroImage } from '$lib/types/hero';

	let { image, label }: { image?: HeroImage; label: string } = $props();
	let failedUrl = $state<string | null>(null);
</script>

<div class="bg-sage absolute inset-0">
	{#if image?.imageUrl && image.imageUrl !== failedUrl}
		<img
			src={image.imageUrl}
			alt={image.alt || label}
			loading="lazy"
			class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
			onerror={() => (failedUrl = image?.imageUrl ?? null)}
		/>
	{:else}
		<div class="flex h-full items-center justify-center px-6 py-8 text-center">
			<span class="text-sm leading-relaxed font-medium text-gray-700">{label}</span>
		</div>
	{/if}
</div>
