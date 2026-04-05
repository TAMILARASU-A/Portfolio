"use client";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { FiBookOpen, FiCode } from "react-icons/fi";

export default function Achievements() {
    const achievements = [
        {
            icon: FiBookOpen,
            title: "Proficiency Award",
            subtitle: "Gobi Arts and Science College",
            detail: "Issued Mar 2024 • 2nd highest academic score in BCA",
            color: "from-purple-500/40 to-pink-500/40",
            borderColor: "border-purple-500/50",
        },
        {
            icon: FiCode,
            title: "LeetCode Achievements",
            subtitle: "History Awards",
            detail: "100 Days Badge • 2025-11-06 | 50 Days Badge • 2025-08-05",
            badgeImages: [
                {
                    src: "https://img.shields.io/badge/LeetCode-100%20Days%20Badge-orange?style=for-the-badge&logo=leetcode",
                    alt: "LeetCode 100 Days Badge",
                },
                {
                    src: "https://img.shields.io/badge/LeetCode-50%20Days%20Badge-yellow?style=for-the-badge&logo=leetcode",
                    alt: "LeetCode 50 Days Badge",
                },
            ],
            color: "from-orange-500/40 to-red-500/40",
            borderColor: "border-orange-500/50",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-5xl mx-auto px-6 py-16">
                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-2">Achievements & Recognition</h2>
                    <p className="text-white/60 text-lg">
                        Milestones and accomplishments in my academic and professional journey
                    </p>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, i) => {
                        const Icon = achievement.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <GlassCard
                                    className={`p-6 border h-full ${achievement.borderColor} bg-gradient-to-br ${achievement.color} glow-hover`}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <motion.div
                                            whileHover={{ rotate: 10, scale: 1.1 }}
                                            className="p-3 bg-white/10 rounded-lg flex-shrink-0"
                                        >
                                            <Icon className="text-2xl text-cyan-300" />
                                        </motion.div>

                                        {/* Content */}
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-lg text-white mb-1">
                                                {achievement.title}
                                            </h3>
                                            <p className="text-white/70 text-sm font-medium mb-2">
                                                {achievement.subtitle}
                                            </p>
                                            <p className="text-white/60 text-sm leading-relaxed">
                                                {achievement.detail}
                                            </p>
                                            {achievement.badgeImages && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {achievement.badgeImages.map((badge, badgeIndex) => (
                                                        <img
                                                            key={badgeIndex}
                                                            src={badge.src}
                                                            alt={badge.alt}
                                                            className="h-7 w-auto rounded"
                                                            loading="lazy"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
