<script lang="ts">
	import type { HeroImage } from '$lib/types/hero';

	let {
		image,
		label,
		detail = false
	}: { image?: HeroImage; label: string; detail?: boolean } = $props();
	let failedUrl = $state<string | null>(null);
</script>

<div class:detail class="image-slot">
	{#if image?.imageUrl && image.imageUrl !== failedUrl}
		<img
			src={image.imageUrl}
			alt={image.alt}
			class="h-full w-full object-cover"
			loading="eager"
			onerror={() => (failedUrl = image?.imageUrl ?? null)}
		/>
	{:else}
		<div class="placeholder">
			<div class="leaves" aria-hidden="true"><span></span><span></span><span></span></div>
			<span class="placeholder-label">{label}</span>
		</div>
	{/if}
</div>

<style>
	.image-slot {
		height: 100%;
		overflow: hidden;
		border-radius: 1.75rem;
		background: var(--color-sage);
	}
	.placeholder {
		display: flex;
		height: 100%;
		min-height: 8rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		padding: 1rem;
	}
	.placeholder-label {
		color: var(--color-gray-700);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-align: center;
		text-transform: uppercase;
	}
	.leaves {
		position: relative;
		width: 6rem;
		height: 6rem;
	}
	.leaves span {
		position: absolute;
		width: 2.75rem;
		height: 4rem;
		border: 1px solid var(--color-primary);
		border-radius: 100% 0 100% 0;
		opacity: 0.5;
	}
	.leaves span:nth-child(1) {
		left: 0.25rem;
		top: 1.5rem;
		transform: rotate(-70deg);
	}
	.leaves span:nth-child(2) {
		left: 2.5rem;
		top: 1.5rem;
		transform: rotate(15deg);
	}
	.leaves span:nth-child(3) {
		left: 1.5rem;
		top: 0;
		transform: rotate(-25deg);
	}
	.detail {
		background: var(--color-stone-100);
	}
	.detail .leaves {
		transform: scale(0.7);
		height: 4.5rem;
	}
	.detail .placeholder {
		gap: 0.75rem;
	}
</style>
