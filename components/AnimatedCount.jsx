"use client";
import { useEffect, useState } from "react";

export default function AnimatedCount({ value = 0, label = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value);
    if (isNaN(end)) return;

    const duration = 900;
    const increment = end / (duration / 16);

    function animate() {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }

    animate();
  }, [value]);

  return (
    <div className="text-center glow-hover">
      <div className="text-3xl font-bold text-cyan-300">{count}</div>
      <div className="text-xs opacity-70">{label}</div>
    </div>
  );
}
