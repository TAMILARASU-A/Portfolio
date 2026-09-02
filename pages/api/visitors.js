import fs from "fs";
import path from "path";

let redisClient = null;
try {
    // Lazily require to avoid breaking environments without the package
    // (the project can fall back to a file-based counter)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { Redis } = require("@upstash/redis");
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        redisClient = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
    }
} catch (e) {
    // package not installed or require failed — we'll use file fallback
}

const KEY = "visitors:count";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "visitors.json");

function ensureDataFile() {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify({ count: 0 }), "utf8");
}

async function getCountFallback() {
    ensureDataFile();
    const content = fs.readFileSync(dataFile, "utf8");
    try {
        const json = JSON.parse(content);
        return Number(json.count || 0);
    } catch (e) {
        return 0;
    }
}

async function incrFallback() {
    ensureDataFile();
    const count = await getCountFallback();
    const next = count + 1;
    fs.writeFileSync(dataFile, JSON.stringify({ count: next }), "utf8");
    return next;
}

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            if (redisClient) {
                const current = await redisClient.get(KEY);
                return res.status(200).json({ count: Number(current || 0) });
            }
            const current = await getCountFallback();
            return res.status(200).json({ count: current });
        }

        if (req.method === "POST") {
            // increment
            if (redisClient) {
                const next = await redisClient.incr(KEY);
                return res.status(200).json({ count: Number(next || 0) });
            }
            const next = await incrFallback();
            return res.status(200).json({ count: next });
        }

        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end("Method Not Allowed");
    } catch (err) {
        console.error("/api/visitors error", err);
        res.status(500).json({ error: "internal" });
    }
}
