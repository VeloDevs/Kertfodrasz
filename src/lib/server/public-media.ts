/** Replace internal backend media addresses before API data reaches the browser. */
export function publicMediaUrls<T>(payload: T, backendUrl: string, publicBackendUrl: string): T {
	const internalPrefix = `${backendUrl.replace(/\/$/, '')}/media/`;
	const publicPrefix = `${publicBackendUrl.replace(/\/$/, '')}/media/`;

	function visit(value: unknown): unknown {
		if (Array.isArray(value)) return value.map(visit);
		if (value === null || typeof value !== 'object') return value;
		return Object.fromEntries(
			Object.entries(value).map(([key, entry]) => [
				key,
				['imageUrl', 'coverImageUrl'].includes(key) &&
				typeof entry === 'string' &&
				entry.startsWith(internalPrefix)
					? publicPrefix + entry.slice(internalPrefix.length)
					: key === 'previewImageUrls' && Array.isArray(entry)
						? entry.map((item) =>
								typeof item === 'string' && item.startsWith(internalPrefix)
									? publicPrefix + item.slice(internalPrefix.length)
									: item
							)
						: visit(entry)
			])
		);
	}

	return visit(payload) as T;
}
