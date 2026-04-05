"use client";

export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={
        `
        backdrop-blur-xl 
        bg-white/10 
        border 
        border-white/20 
        rounded-2xl 
        p-5 
        shadow-lg 
        transition-all 
        duration-300 
        hover:shadow-cyan-500/20 
        hover:border-cyan-300/30 
        hover:bg-white/15 
        ` + className
      }
    >
      {children}
    </div>
  );
}
