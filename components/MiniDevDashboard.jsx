"use client";
import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

export default function MiniDevDashboard({ github }) {
  const [stats, setStats] = useState({
    repos: 0,
    followers: 0,
    following: 0,
    avatar: "",
    username: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`https://api.github.com/users/${github}`);
        const data = await res.json();

        setStats({
          repos: data.public_repos || 0,
          followers: data.followers || 0,
          following: data.following || 0,
          avatar: data.avatar_url || "",
          username: data.login || github,
        });
      } catch (err) {
        console.log("GitHub fetch error");
      }
    }
    load();
  }, [github]);

  return (
    <GlassCard className="glow-hover">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar */}
        {stats.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={stats.avatar}
            alt="GitHub Avatar"
            className="w-12 h-12 rounded-full border border-white/20 shadow-md"
          />
        ) : (
          <div className="w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
        )}

        {/* Username */}
        <div>
          <h3 className="font-semibold text-lg">GitHub</h3>
          <p className="text-sm opacity-70">@{stats.username}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-xl font-bold text-cyan-300">{stats.repos}</div>
          <div className="text-xs opacity-60">Repos</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-xl font-bold text-cyan-300">{stats.followers}</div>
          <div className="text-xs opacity-60">Followers</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xl font-bold text-cyan-300">{stats.following}</div>
          <div className="text-xs opacity-60">Following</div>
        </motion.div>
      </div>

      {/* Profile Link */}
      <motion.a
        whileHover={{ scale: 1.04 }}
        href={`https://github.com/${github}`}
        target="_blank"
        className="mt-4 inline-block text-cyan-400 underline text-sm"
      >
        View GitHub Profile →
      </motion.a>
    </GlassCard>
  );
}
