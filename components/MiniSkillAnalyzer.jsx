"use client";
import { useState } from "react";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

export default function MiniSkillAnalyzer() {
  const roles = {
    "Python Developer": ["Python", "SQL", "Django", "Flask"],
    "Frontend Developer": ["React", "HTML", "CSS", "JavaScript"],
  };

  const userSkills = ["Python", "MySQL", "React"];
  const [role, setRole] = useState("Python Developer");

  const required = roles[role];
  const matches = required.filter((s) => userSkills.includes(s));
  const gaps = required.filter((s) => !userSkills.includes(s));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <GlassCard className="p-5 glow-hover">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-3 text-cyan-300">
          Skill Analyzer
        </h3>

        {/* Dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 bg-white/10 rounded text-sm border border-white/20"
        >
          {Object.keys(roles).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        {/* Matches */}
        <div className="mt-5">
          <div className="font-semibold text-sm text-green-300">Matches</div>

          <div className="flex flex-wrap gap-2 mt-2">
            {matches.length > 0 ? (
              matches.map((m) => (
                <span
                  key={m}
                  className="px-3 py-1 bg-green-600/50 border border-green-400/40 rounded-lg text-xs"
                >
                  {m}
                </span>
              ))
            ) : (
              <span className="text-xs opacity-60">No matches found</span>
            )}
          </div>

          {/* Gaps */}
          <div className="font-semibold text-sm text-red-300 mt-5">
            Skill Gaps
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {gaps.length > 0 ? (
              gaps.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 bg-red-600/50 border border-red-400/40 rounded-lg text-xs"
                >
                  {g}
                </span>
              ))
            ) : (
              <span className="text-xs opacity-60">
                Perfect match — no gaps!
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
