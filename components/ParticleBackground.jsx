"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = window.innerWidth <= 768;
    const COUNT = isMobile ? 30 : 65;
    const maxLinkDistance = isMobile ? 100 : 130;
    const frameInterval = isMobile ? 40 : 16;
    let lastRender = performance.now();

    const particles = [];
    const rand = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(isMobile ? -0.25 : -0.35, isMobile ? 0.25 : 0.35),
        vy: rand(isMobile ? -0.25 : -0.35, isMobile ? 0.25 : 0.35),
        r: rand(isMobile ? 0.8 : 1, isMobile ? 1.5 : 2),
        glow: rand(0.35, 0.85),
      });
    }

    function draw(time) {
      if (time - lastRender < frameInterval) {
        requestAnimationFrame(draw);
        return;
      }
      lastRender = time;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `rgba(0,255,255,${p.glow})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(0,255,255,0.7)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!isMobile) {
        for (let i = 0; i < COUNT; i++) {
          for (let j = i + 1; j < COUNT; j++) {
            const a = particles[i];
            const b = particles[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxLinkDistance) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0,255,255,${1 - dist / maxLinkDistance})`;
              ctx.lineWidth = 0.25;
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      requestAnimationFrame(draw);
    }

    draw(performance.now());

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
      className="fixed inset-0 w-full h-full -z-10 opacity-70 pointer-events-none"
    ></canvas>
  );
}
