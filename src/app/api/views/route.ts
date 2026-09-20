import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const hasRedisConfig = Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);
const redis = hasRedisConfig ? Redis.fromEnv() : null;
const VIEWS_KEY = 'portfolio:views';

function getClientIp(request: NextRequest) {
    const forwardedFor = request.headers.get('x-forwarded-for');
    return request.ip ?? forwardedFor?.split(',')[0]?.trim() ?? 'unknown';
}

async function fingerprint(request: NextRequest) {
    const ip = getClientIp(request);
    const userAgent = request.headers.get('user-agent') ?? '';
    const raw = `${ip}:${userAgent}`;
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
    const hashHex = Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');

    return hashHex.slice(0, 12);
}

async function getCount() {
    if (!redis) {
        return 0;
    }

    try {
        const count = await redis.get<number>(VIEWS_KEY);
        return Number(count ?? 0);
    } catch {
        return 0;
    }
}

export async function GET() {
    const count = await getCount();
    return Response.json({ count });
}

export async function POST(request: NextRequest) {
    if (!redis) {
        return Response.json({ count: 0 });
    }

    try {
        const fp = await fingerprint(request);
        const seenKey = `portfolio:seen:${fp}`;

        const newVisitor = await redis.set(seenKey, 1, { nx: true, ex: 86400 });

        let count = await getCount();

        if (newVisitor) {
            await redis.incr(VIEWS_KEY);
            count = await getCount();
        }

        return Response.json({ count });
    } catch {
        const count = await getCount();
        return Response.json({ count });
    }
}
