import type { RequestHandler } from './$types';

// Development diagnostics stay in the browser console. Do not retain report
// bodies: document URLs and script samples can contain personal information.
export const POST: RequestHandler = () => new Response(null, { status: 204 });
