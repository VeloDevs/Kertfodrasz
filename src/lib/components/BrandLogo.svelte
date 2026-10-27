<script lang="ts">
	import wordmark from '$lib/assets/kertfodrasz-wordmark.svg';
	import whiteWordmark from '$lib/assets/kertfodrasz-wordmark-white.svg';
	import emblem from '$lib/assets/kertfodrasz-emblem.svg';
	import whiteEmblem from '$lib/assets/kertfodrasz-emblem-white.svg';

	let { large = false, light = false }: { large?: boolean; light?: boolean } = $props();
</script>

<span class="brand-logo" class:large>
	<img
		src={light ? whiteEmblem : emblem}
		alt=""
		aria-hidden="true"
		width="111"
		height="109.602867"
		class="brand-emblem"
	/>
	<img
		src={light ? whiteWordmark : wordmark}
		alt="Kertfodrász"
		width="315"
		height="36.2246"
		class="brand-wordmark"
	/>
</span>

<style>
	.brand-logo {
		display: inline-flex;
		max-width: 100%;
		align-items: center;
		gap: 0.625rem;
		vertical-align: middle;
	}

	.brand-emblem {
		display: block;
		width: 2.5rem;
		height: 2.5rem;
		flex: 0 0 auto;
		object-fit: contain;
	}

	.brand-wordmark {
		display: block;
		width: clamp(10rem, 20vw, 12.5rem);
		min-width: 0;
		height: auto;
	}

	.brand-logo.large {
		gap: 0.75rem;
	}

	.large .brand-emblem {
		width: 3rem;
		height: 3rem;
	}

	.large .brand-wordmark {
		width: 14rem;
	}
</style>
