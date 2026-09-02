"use client";

import { useEffect, useState } from "react";

export default function VisitorBadge({ className = "" }) {
    const [count, setCount] = useState(null);

    useEffect(() => {
        let mounted = true;

        async function fetchCount() {
            try {
                const r = await fetch("/api/visitors");
                if (!mounted) return;
                const j = await r.json();
                setCount(j.count ?? 0);
            } catch (e) {
                // ignore
            }
        }

        fetchCount();

        const key = "visited_v1";
        if (typeof window !== "undefined" && !localStorage.getItem(key)) {
            // record a visit once per client
            fetch("/api/visitors", { method: "POST" })
                .then((r) => r.json())
                .then((j) => {
                    if (mounted) setCount(j.count ?? 0);
                })
                .catch(() => { })
                .finally(() => {
                    try {
                        localStorage.setItem(key, "1");
                    } catch (e) { }
                });
        }

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm ${className}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" stroke="#00eaff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 22c2.667-3 6-5 10-5s7.333 2 10 5" stroke="#00eaff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-white/90">Visitors</span>
            <span className="text-cyan-400 font-semibold">{count === null ? "—" : count}</span>
        </div>
    );
}
