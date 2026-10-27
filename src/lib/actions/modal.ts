/** Native modal dialogs make the background inert and contain keyboard focus. */
export function modal(node: HTMLDialogElement) {
	const previousFocus = document.activeElement;
	const previousOverflow = document.body.style.overflow;
	node.showModal();
	document.body.style.overflow = 'hidden';
	function containFocus(event: KeyboardEvent) {
		if (event.key !== 'Tab') return;
		const buttons = [...node.querySelectorAll<HTMLButtonElement>('button:not([disabled])')];
		const first = buttons[0];
		const last = buttons[buttons.length - 1];
		if (
			(!event.shiftKey && document.activeElement === last) ||
			!node.contains(document.activeElement)
		) {
			event.preventDefault();
			first?.focus();
		} else if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last?.focus();
		}
	}
	node.addEventListener('keydown', containFocus);
	const closeButtons = node.querySelectorAll<HTMLButtonElement>('button[aria-label="Bezárás"]');
	closeButtons.item(closeButtons.length - 1)?.focus();
	return {
		destroy() {
			node.removeEventListener('keydown', containFocus);
			node.close();
			document.body.style.overflow = previousOverflow;
			if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
		}
	};
}
