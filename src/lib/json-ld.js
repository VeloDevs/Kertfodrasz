/** Serialize data safely inside an HTML script element, including during SSR.
 * @param {unknown} data
 */
export function jsonLdScript(data) {
	const json = JSON.stringify(data).replace(/</g, '\\u003c');
	return `<script type="application/ld+json">${json}</script>`;
}
