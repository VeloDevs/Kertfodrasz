import { test } from 'node:test';
import assert from 'node:assert/strict';
import { jsonLdScript } from '../src/lib/json-ld.js';

test('JSON-LD cannot escape its script element and preserves JSON values', () => {
	const name = 'Audit </script><script>document.documentElement.dataset.auditXss=1</script><!--';
	for (const label of ['Referenciák', 'Növénytár']) {
		const data = { '@type': 'BreadcrumbList', itemListElement: [{ name: label }, { name }] };
		const html = jsonLdScript(data);
		assert.equal((html.match(/<script/g) || []).length, 1);
		assert.equal((html.match(/<\/script>/g) || []).length, 1);
		assert.deepEqual(JSON.parse(html.slice(html.indexOf('>') + 1, -9)), data);
	}
});
