"use client";

import { FiBriefcase, FiCalendar, FiMapPin, FiCheckCircle } from "react-icons/fi";
import FadeInUp from "./FadeInUp";
import GlassCard from "./GlassCard";

const experiences = [
    {
        role: "ADS Intern (Application Development & Support)",
        company: "ARGA Investment Management",
        location: "Chennai, India",
        period: "Current",
        points: [
            "Worked on enterprise UI development using Angular and NZ Zorro components.",
            "Contributed to backend features and APIs using .NET (C#).",
            "Handled data operations and reporting workflows with SQL Server.",
        ],
    },
    {
        role: "Web Development Intern (Full Stack)",
        company: "Boredom Technologies LLP",
        location: "Coimbatore, Tamil Nadu, India (Remote)",
        period: "Jun 2025 (1 month)",
        points: [
            "Built and deployed 'MicroMuse', an AI-powered microfiction web app.",
            "Used Next.js, FastAPI, Firebase, and Gemini API to generate stories and deliver core features.",
            "Implemented Firebase Auth, Firestore data management, and PDF/image sharing capabilities.",
        ],
    },
    {
        role: "Project-Based Development Experience",
        company: "Academic & Personal Projects",
        location: "Remote",
        period: "Ongoing",
        points: [
            "Built AI and web-based applications using Python, React, and Next.js.",
            "Developed solutions in recommendation systems, automation, and analytics.",
            "Improved problem-solving through hands-on product-oriented development.",
        ],
    },
];

export default function ExperienceSection() {
    return (
        <FadeInUp delay={0.35}>
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Experience</h2>

                <div className="grid grid-cols-1 gap-4">
                    {experiences.map((item, index) => (
                        <GlassCard key={`${item.company}-${index}`} className="p-6 border border-cyan-500/30">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/30">
                                    <FiBriefcase className="text-cyan-300 text-lg" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                                    <p className="text-cyan-300 font-medium">{item.company}</p>

                                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-white/70">
                                        <span className="inline-flex items-center gap-1.5">
                                            <FiMapPin />
                                            {item.location}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <FiCalendar />
                                            {item.period}
                                        </span>
                                    </div>

                                    <ul className="mt-4 space-y-2 text-sm text-white/80">
                                        {item.points.map((point) => (
                                            <li key={point} className="flex items-start gap-2">
                                                <FiCheckCircle className="mt-0.5 text-cyan-300 shrink-0" />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </FadeInUp>
    );
}
