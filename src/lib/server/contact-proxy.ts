import { createHash, createHmac } from 'node:crypto';
import { isIP } from 'node:net';

const fields = ['name', 'email', 'phone', 'subject', 'message', 'website'] as const;
const maximumBody = 32 * 1024;
const reply = (status: number, message: string, extra = {}, headers = {}) =>
	Response.json(
		{ message, ...extra },
		{ status, headers: { 'Cache-Control': 'no-store', ...headers } }
	);

export async function relayContact(
	request: Request,
	options: {
		origin: string;
		clientAddress: string;
		backendUrl: string;
		secret: string;
		fetch?: typeof fetch;
		now?: number;
	}
): Promise<Response> {
	if (request.method !== 'POST') return reply(405, 'Nem támogatott kérés.');
	if (
		request.headers.get('origin') !== options.origin ||
		request.headers.get('sec-fetch-site') === 'cross-site'
	) {
		return reply(403, 'A kérés eredete nem engedélyezett.');
	}
	if (
		request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json'
	) {
		return reply(415, 'JSON kérés szükséges.');
	}
	if (!options.secret || options.secret.length < 32 || !isIP(options.clientAddress)) {
		return reply(503, 'Az üzenetküldés átmenetileg nem érhető el.');
	}
	const length = request.headers.get('content-length');
	if (length && (!/^\d+$/.test(length) || Number(length) > maximumBody))
		return reply(413, 'Túl nagy kérés.');
	let values: Record<string, string>;
	try {
		const reader = request.body?.getReader();
		if (!reader) return reply(400, 'Hiányzó adatok.');
		const chunks: Uint8Array[] = [];
		let size = 0;
		try {
			while (true) {
				const { value, done } = await reader.read();
				if (done) break;
				size += value.byteLength;
				if (size > maximumBody) {
					await reader.cancel();
					return reply(413, 'Túl nagy kérés.');
				}
				chunks.push(value);
			}
		} finally {
			reader.releaseLock();
		}
		const input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
		if (!input || Array.isArray(input) || typeof input !== 'object')
			return reply(400, 'Hibás adatok.');
		values = {};
		for (const field of fields) {
			const value = input[field];
			if (value !== undefined && typeof value !== 'string') return reply(422, 'Hibás mezőérték.');
			values[field] = value || '';
		}
	} catch {
		return reply(400, 'Hibás JSON kérés.');
	}
	const body = JSON.stringify(values);
	const timestamp = String(Math.floor((options.now ?? Date.now()) / 1000));
	const signature = createHmac('sha256', options.secret)
		.update(
			`${timestamp}\n${options.clientAddress}\n${createHash('sha256').update(body).digest('hex')}`
		)
		.digest('hex');
	try {
		const response = await (options.fetch ?? globalThis.fetch)(
			`${options.backendUrl.replace(/\/$/, '')}/api/contact`,
			{
				method: 'POST',
				body,
				redirect: 'error',
				credentials: 'omit',
				signal: AbortSignal.timeout(8000),
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'X-Contact-Timestamp': timestamp,
					'X-Contact-Client-IP': options.clientAddress,
					'X-Contact-Signature': signature
				}
			}
		);
		if (response.status === 201) return reply(201, 'Köszönjük az üzenetet!');
		if (response.status === 429) {
			const retry = response.headers.get('retry-after') || '60';
			return reply(
				429,
				'Túl sok kérés. Kérlek, próbáld újra később.',
				{},
				{ 'Retry-After': /^\d{1,4}$/.test(retry) ? retry : '60' }
			);
		}
		if (response.status === 422) {
			const payload = await response.json();
			const errors = Object.fromEntries(
				fields.flatMap((field) =>
					Array.isArray(payload?.errors?.[field])
						? [
								[
									field,
									payload.errors[field]
										.filter((item: unknown) => typeof item === 'string')
										.map((item: string) => item.slice(0, 500))
								]
							]
						: []
				)
			);
			return reply(422, 'Kérlek, ellenőrizd a megadott adatokat.', { errors });
		}
		return reply(502, 'Az üzenetküldés átmenetileg nem érhető el.');
	} catch {
		return reply(503, 'Az üzenetküldés átmenetileg nem érhető el.');
	}
}
