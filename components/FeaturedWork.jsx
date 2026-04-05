"use client";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { FiGithub, FiExternalLink, FiStar } from "react-icons/fi";

export default function FeaturedWork() {
    const featuredProjects = [
        {
            title: "AI-Powered Career Guidance & Skill Recommendation System",
            tagline: "Highlighted Project",
            desc: "A data-driven platform that analyzes student profiles and job-market trends to suggest personalized career paths and skills.",
            highlights: [
                "PySpark-based ETL and analytics pipeline",
                "Skill matching with Jaccard similarity",
                "Interactive Streamlit dashboard",
            ],
            tech: ["PySpark", "Streamlit", "Python", "Pandas", "Plotly"],
            repo: "https://github.com/TAMILARASU-A/AI-Powered-Career-Guidance-Skill-Recommendation-System",
            demo: null,
            icon: "📊",
        },
        {
            title: "ChildGuard-Browser",
            tagline: "Highlighted Project",
            desc: "An AI-powered Chrome extension that improves child online safety by detecting harmful pages and sending parent alerts.",
            highlights: [
                "Toxic content detection using LSTM and XGBoost",
                "Real-time webpage scanning via Selenium + BeautifulSoup",
                "Parent alert workflow for unsafe access",
            ],
            tech: ["Flask", "TensorFlow", "XGBoost", "OpenCV", "Selenium"],
            repo: "https://github.com/TAMILARASU-A/ChildGuard-Browser---Chrome-Extension",
            demo: null,
            icon: "🛡️",
        },
        {
            title: "MicroMuse – AI-powered Storytelling Platform",
            tagline: "Highlighted Project",
            desc: "An internship MVP that generates microfiction from prompts using Gemini AI with real-time sharing and export features.",
            highlights: [
                "Gemini integration for story generation",
                "Firebase auth and Firestore backend",
                "Deployed on Vercel with share/export support",
            ],
            tech: ["Next.js", "React", "Firebase", "Gemini AI", "Vercel"],
            repo: "https://github.com/TAMILARASU-A/Next.js-Deploy",
            demo: "https://next-js-deploy-wufm.vercel.app/",
            icon: "✨",
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
                <div className="text-center mb-12">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-cyan-300 text-sm font-semibold mb-2"
                    >
                        ✨ HIGHLIGHTED PROJECT
                    </motion.p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        A showcase of my best work and technical expertise
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {featuredProjects.map((project, index) => (
                        <GlassCard key={project.title} className="p-6 border border-cyan-500/30 glow-hover">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                            >
                                <div className="inline-block mb-3 px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full">
                                    <span className="text-cyan-300 text-xs font-semibold flex items-center gap-1">
                                        <FiStar size={14} />
                                        {project.tagline}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-2 leading-snug">
                                    <span className="text-2xl leading-none">{project.icon}</span>
                                    <span>{project.title}</span>
                                </h3>

                                <p className="text-white/75 text-sm leading-relaxed mb-4">{project.desc}</p>

                                <div className="mb-4 space-y-2">
                                    {project.highlights.map((highlight, i) => (
                                        <div key={i} className="flex items-start gap-2 text-white/65 text-xs">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5"></div>
                                            <span>{highlight}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.tech.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-lg text-cyan-200 text-[11px] font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-2 bg-cyan-500/30 hover:bg-cyan-500/50 border border-cyan-500/50 rounded-lg text-xs font-medium text-cyan-200 transition"
                                        >
                                            <FiExternalLink size={14} />
                                            Live
                                        </a>
                                    )}
                                    <a
                                        href={project.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-xs font-medium text-white/90 transition"
                                    >
                                        <FiGithub size={14} />
                                        Source
                                    </a>
                                </div>
                            </motion.div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
