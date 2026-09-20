'use client';

import { useEffect, useState } from 'react';

export default function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchCount() {
            try {
                const response = await fetch('/api/views', {
                    method: 'POST',
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error('Failed to update visitor count');
                }

                const data = await response.json();

                if (isMounted) {
                    setCount(Number(data.count ?? 0));
                }
            } catch {
                if (isMounted) {
                    setCount(null);
                }
            }
        }

        fetchCount();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
            <span className="font-mono text-white/50">VISITORS:</span>
            {count === null ? (
                <span className="inline-flex h-5 min-w-[74px] items-center justify-center rounded-md bg-white/10 px-2 py-1 font-mono text-[10px] text-transparent shadow-inner shadow-black/20 animate-pulse">------</span>
            ) : (
                <span className="font-mono text-cyan-300/90">{String(count).padStart(6, '0')}</span>
            )}
        </div>
    );
}
