"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || window.innerWidth <= 768) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const gradientColors = [
      "rgba(0, 255, 255, 0.15)",
      "rgba(0, 140, 255, 0.12)",
      "rgba(0, 200, 255, 0.15)",
      "rgba(0, 80, 220, 0.1)",
    ];

    function drawAurora() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < 4; i++) {
        const gradient = ctx.createLinearGradient(
          0,
          Math.sin(Date.now() / 2000 + i) * 200 + 200,
          width,
          height
        );

        gradient.addColorStop(0, gradientColors[i]);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      requestAnimationFrame(drawAurora);
    }

    drawAurora();

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="hidden md:block fixed inset-0 w-full h-full -z-20 opacity-[0.8] pointer-events-none"
      />

      <div className="md:hidden fixed inset-0 -z-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.16),transparent_18%),radial-gradient(circle_at_60%_20%,_rgba(0,140,255,0.12),transparent_24%),linear-gradient(180deg,_rgba(2,25,45,0.95),rgba(4,16,24,0.95))]" />
      </div>
    </>
  );
}
