"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 opacity-[0.8] pointer-events-none"
    />
  );
}
