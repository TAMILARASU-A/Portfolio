"use client";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export default function MiniProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
    >
      <GlassCard className="p-6 glow-hover h-full flex flex-col">
        {/* Title */}
        <h4 className="font-semibold text-lg text-cyan-300 tracking-wide">
          {project.title}
        </h4>

        {/* Description */}
        <p className="opacity-75 text-sm mt-3 leading-relaxed flex-grow">
          {project.desc}
        </p>

        {/* Tech Stack */}
        <div className="mt-5 text-xs flex flex-wrap gap-2">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-cyan-200 font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3 items-center">
          {project.demo && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/30 hover:bg-cyan-500/50 border border-cyan-500/50 rounded-lg text-sm font-medium text-cyan-200 transition"
            >
              <FiExternalLink size={16} />
              Live Demo
            </motion.a>
          )}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-sm font-medium text-white/90 transition"
          >
            <FiGithub size={16} />
            Source
          </motion.a>
        </div>
      </GlassCard>
    </motion.div>
  );
}
