"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = window.innerWidth <= 768;
    const gradientCount = 4;
    const colors = [
      "rgba(0, 255, 255, 0.15)",
      "rgba(0, 140, 255, 0.12)",
      "rgba(0, 200, 255, 0.15)",
      "rgba(0, 80, 220, 0.1)",
    ];

    let lastRender = performance.now();
    const frameInterval = isMobile ? 40 : 16;

    function drawAurora(time) {
      if (time - lastRender < frameInterval) {
        requestAnimationFrame(drawAurora);
        return;
      }
      lastRender = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < gradientCount; i++) {
        const gradient = ctx.createLinearGradient(
          0,
          Math.sin(time / 2200 + i) * 180 + 180,
          width,
          height
        );

        gradient.addColorStop(0, colors[i]);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      requestAnimationFrame(drawAurora);
    }

    drawAurora(performance.now());

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 opacity-[0.8] pointer-events-none"
    />
  );
}
