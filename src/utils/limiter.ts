// utils/rateLimit.ts
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();

export function limiter(ip: string): boolean {
    const now = Date.now();
    const entry = ipRequestCounts.get(ip);

    if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW) {
        ipRequestCounts.set(ip, { count: 1, timestamp: now });
        return false; // allowed
    }

    if (entry.count >= MAX_REQUESTS) {
        return true; // blocked
    }

    entry.count++;
    ipRequestCounts.set(ip, entry);
    return false; // allowed
}
