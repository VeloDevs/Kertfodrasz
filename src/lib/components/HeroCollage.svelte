<script lang="ts">
	import HeroImageSlot from './HeroImageSlot.svelte';
	import type { PageHero } from '#lib/types/hero.js';

	let {
		hero,
		mainLabel,
		detailLabel
	}: { hero?: PageHero; mainLabel: string; detailLabel: string } = $props();
</script>

<div class="collage">
	<div class="backing" aria-hidden="true"></div>
	<div class="main-image"><HeroImageSlot image={hero?.main} label={mainLabel} /></div>
	<div class="detail-image"><HeroImageSlot image={hero?.detail} label={detailLabel} detail /></div>
</div>

<style>
	.collage {
		position: relative;
		isolation: isolate;
		width: 100%;
		aspect-ratio: 1.25;
	}
	.backing {
		position: absolute;
		z-index: -1;
		inset: 0 12% 0 10%;
		border-radius: 2rem;
		background: var(--color-sage);
	}
	.main-image {
		position: absolute;
		inset: 5% 0 5% 16%;
		border: 5px solid white;
		border-radius: 2rem;
		box-shadow: 0 16px 40px rgb(0 0 0 / 0.06);
	}
	.detail-image {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 46%;
		height: 45%;
		border: 5px solid white;
		border-radius: 2rem;
		box-shadow: 0 12px 28px rgb(0 0 0 / 0.08);
	}
	@media (max-width: 639px) {
		.collage {
			aspect-ratio: 1.6;
		}
		.detail-image {
			display: none;
		}
		.main-image {
			left: 5%;
		}
	}
</style>
