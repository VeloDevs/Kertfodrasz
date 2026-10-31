import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash, createHmac } from 'node:crypto';
import { relayContact } from '../src/lib/server/contact-proxy.ts';
const secret = 'local-test-secret-with-at-least-32-characters';
const defaults = {
	origin: 'https://site.example',
	clientAddress: '198.51.100.2',
	backendUrl: 'http://backend',
	secret,
	now: 1793404800000
};
const request = (body = {}, headers = {}) =>
	new Request('https://site.example/api/contact', {
		method: 'POST',
		headers: { origin: defaults.origin, 'content-type': 'application/json', ...headers },
		body: typeof body === 'string' ? body : JSON.stringify(body)
	});

test('fixed upstream, allowlisted fields and authenticated client IP; no cookies or caller headers', async () => {
	/** @type {RequestInit & {url: RequestInfo | URL}} */
	let captured = { url: '' };
	const response = await relayContact(
		request(
			{ name: 'Teszt', website: '', url: 'https://evil.example', extra: 'ignored' },
			{
				cookie: 'session=secret',
				authorization: 'Bearer secret',
				'x-forwarded-for': 'attacker',
				'x-contact-client-ip': 'attacker'
			}
		),
		{
			...defaults,
			fetch: async (url, init) => {
				captured = { url, ...init };
				return new Response('{}', { status: 201, headers: { 'set-cookie': 'private=secret' } });
			}
		}
	);
	assert.equal(response.status, 201);
	assert.equal(captured.url, 'http://backend/api/contact');
	assert.ok(typeof captured.body === 'string');
	assert.deepEqual(Object.keys(JSON.parse(captured.body)), [
		'name',
		'email',
		'phone',
		'subject',
		'message',
		'website'
	]);
	const headers = new Headers(captured.headers);
	assert.equal(headers.get('Cookie'), null);
	assert.equal(headers.get('Authorization'), null);
	assert.equal(headers.get('X-Forwarded-For'), null);
	const digest = createHash('sha256').update(captured.body).digest('hex');
	assert.equal(
		headers.get('x-contact-signature'),
		createHmac('sha256', secret).update(`1793404800\n198.51.100.2\n${digest}`).digest('hex')
	);
	assert.equal(response.headers.get('set-cookie'), null);
	assert.equal(captured.credentials, 'omit');
	assert.equal(captured.redirect, 'error');
});
test('cross-origin and missing origin requests never reach backend', async () => {
	for (const origin of ['https://evil.example', 'null', ''])
		assert.equal(
			(
				await relayContact(request({}, { origin }), {
					...defaults,
					fetch: () => assert.fail('upstream called')
				})
			).status,
			403
		);
});
test('invalid content types, JSON values and body size are bounded', async () => {
	/** @type {Array<[Request, number]>} */
	const cases = [
		[request({}, { 'content-type': 'text/plain' }), 415],
		[request('{broken'), 400],
		[request({ name: { bad: 'value' } }), 422],
		[request({ message: 'x'.repeat(33000) }), 413]
	];
	for (const [req, status] of cases)
		assert.equal(
			(await relayContact(req, { ...defaults, fetch: () => assert.fail('upstream called') }))
				.status,
			status
		);
});
test('chunked oversized bodies are rejected without trusting content-length', async () => {
	const stream = new ReadableStream({
		start(c) {
			c.enqueue(new Uint8Array(16384));
			c.enqueue(new Uint8Array(16385));
			c.close();
		}
	});
	const init = {
		method: 'POST',
		headers: { origin: defaults.origin, 'content-type': 'application/json' },
		body: stream,
		duplex: 'half'
	};
	const req = new Request('https://site.example/api/contact', init);
	assert.equal((await relayContact(req, defaults)).status, 413);
});
test('validation errors remain useful and arbitrary upstream fields/headers are excluded', async () => {
	const res = await relayContact(request(), {
		...defaults,
		fetch: async () =>
			Response.json(
				{
					errors: { email: ['Érvénytelen e-mail.'], password: ['internal secret'] },
					debug: 'secret'
				},
				{ status: 422, headers: { 'set-cookie': 'backend=secret' } }
			)
	});
	assert.equal(res.status, 422);
	assert.deepEqual((await res.json()).errors, { email: ['Érvénytelen e-mail.'] });
	assert.equal(res.headers.get('set-cookie'), null);
});
test('rate limits and backend failure are explicit and do not disclose internal details', async () => {
	const limited = await relayContact(request(), {
		...defaults,
		fetch: async () => new Response('', { status: 429, headers: { 'retry-after': '37' } })
	});
	assert.equal(limited.status, 429);
	assert.equal(limited.headers.get('retry-after'), '37');
	const failed = await relayContact(request(), {
		...defaults,
		fetch: async () => {
			throw Error('internal password');
		}
	});
	assert.equal(failed.status, 503);
	assert.doesNotMatch(await failed.text(), /password/);
	const redirect = await relayContact(request(), {
		...defaults,
		fetch: async () =>
			new Response('', { status: 302, headers: { location: 'https://evil.example' } })
	});
	assert.equal(redirect.status, 502);
});
