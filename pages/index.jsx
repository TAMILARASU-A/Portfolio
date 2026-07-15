"use client";

import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import ParticleBackground from "../components/ParticleBackground";
import AuroraBackground from "../components/AuroraBackground";
import Hero from "../components/Hero";
import MiniProjectCard from "../components/MiniProjectCard";
import FadeInUp from "../components/FadeInUp";
import AboutSection from "../components/AboutSection";
import React from "react";
import useIsMobile from "../components/useIsMobile";

const FeaturedWorkSection = dynamic(() => import("../components/FeaturedWork"), {
  ssr: false,
  loading: () => <div className="h-40 max-w-5xl mx-auto px-6" />,
});

const SkillGlobeSection = dynamic(() => import("../components/SkillGlobe"), {
  ssr: false,
  loading: () => <div className="h-40 rounded-2xl border border-white/10 bg-white/5 animate-pulse max-w-5xl mx-auto" />,
});

const CertificatesSection = dynamic(() => import("../components/Certificates"), {
  ssr: false,
  loading: () => <div className="h-40 rounded-2xl border border-white/10 bg-white/5 animate-pulse max-w-5xl mx-auto" />,
});

const TimelineSection = dynamic(() => import("../components/MiniTimeline"), {
  ssr: false,
  loading: () => <div className="h-40 rounded-2xl border border-white/10 bg-white/5 animate-pulse max-w-5xl mx-auto" />,
});

const ExperienceSection = dynamic(() => import("../components/ExperienceSection"), {
  ssr: false,
  loading: () => <div className="h-40 rounded-2xl border border-white/10 bg-white/5 animate-pulse max-w-5xl mx-auto" />,
});

const AchievementsSection = dynamic(() => import("../components/Achievements"), {
  ssr: false,
  loading: () => <div className="h-40 rounded-2xl border border-white/10 bg-white/5 animate-pulse max-w-5xl mx-auto" />,
});

const ChatBotSection = dynamic(() => import("../components/MiniChatBot"), {
  ssr: false,
  loading: () => <div className="h-40 rounded-2xl border border-white/10 bg-white/5 animate-pulse max-w-5xl mx-auto" />,
});

const ContactFormSection = dynamic(() => import("../components/ContactForm"), {
  ssr: false,
  loading: () => <div className="h-40 rounded-2xl border border-white/10 bg-white/5 animate-pulse max-w-5xl mx-auto" />,
});

const FooterSection = dynamic(() => import("../components/Footer"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">

      {/* Background Layers */}
      {!isMobile && <AuroraBackground />}
      {!isMobile && <ParticleBackground />}
      <Navbar />

      <main className="relative z-10">

        {/* ================= HERO ================= */}
        <section id="hero" className="max-w-5xl mx-auto px-6 py-24">
          <Hero />
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-12">
          <AboutSection />
        </section>


        {/* ================= FEATURED WORK ================= */}
        <FeaturedWorkSection />

        {/* ================= PROJECTS ================= */}
        <section id="projects" className="max-w-5xl mx-auto px-6 py-12">
          <FadeInUp delay={0.2}>
            <h2 className="text-2xl font-bold mb-4">Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MiniProjectCard
                project={{
                  title: "AI-Powered Career Guidance & Skill Recommendation System",
                  desc: "A data-driven platform that analyzes student profiles and job-market data to provide personalized career paths, skill recommendations, and industry insights.",
                  tech: ["PySpark", "Streamlit", "Python", "Pandas", "Plotly"],
                  repo: "https://github.com/TAMILARASU-A/AI-Powered-Career-Guidance-Skill-Recommendation-System",
                  demo: null,
                }}
              />

              <MiniProjectCard
                project={{
                  title: "ChildGuard-Browser — AI-Powered Chrome Extension",
                  desc: "A smart browser companion for child safety that blocks harmful sites, detects toxic content, and sends automated alerts to parents.",
                  tech: ["Flask", "TensorFlow", "XGBoost", "OpenCV", "Selenium"],
                  repo: "https://github.com/TAMILARASU-A/ChildGuard-Browser---Chrome-Extension",
                  demo: null,
                }}
              />

              <MiniProjectCard
                project={{
                  title: "MicroMuse – AI-powered Storytelling Platform",
                  desc: "An internship MVP that generates microfiction from prompts with Gemini AI, Firebase-backed real-time features, and Vercel deployment.",
                  tech: ["Next.js", "React", "Firebase", "Gemini AI", "Vercel"],
                  repo: "https://github.com/TAMILARASU-A/Next.js-Deploy",
                  demo: "https://next-js-deploy-wufm.vercel.app/",
                }}
              />

              <MiniProjectCard
                project={{
                  title: "Karmithra – AI-Powered Tax Assistant",
                  desc: "An AI chatbot for Indian income-tax support with role-based access, contextual retrieval, and structured response workflows.",
                  tech: ["React", "Llama 3", "MySQL", "ChromaDB", "Python"],
                  repo: "https://github.com/TAMILARASU-A",
                  demo: null,
                }}
              />

              <MiniProjectCard
                project={{
                  title: "Diet Recommendation System (Prolog-Based)",
                  desc: "A rule-based recommendation engine that generates personalized diet plans based on health profile, preferences, and activity level.",
                  tech: ["Prolog", "Logic Programming", "Rule Engine", "Health AI"],
                  repo: "https://github.com/TAMILARASU-A",
                  demo: null,
                }}
              />

              <MiniProjectCard
                project={{
                  title: "InsightCart AI – Product Intelligence Analyzer",
                  desc: "A product analysis app that scrapes Amazon listings, compares top results, and presents actionable insights using interactive charts.",
                  tech: ["Python", "Web Scraping", "SQLite", "HTML/CSS/JS", "Data Viz"],
                  repo: "https://github.com/TAMILARASU-A",
                  demo: null,
                }}
              />
            </div>
          </FadeInUp>
        </section>

        {/* ================= SKILLS (3D GLOBE) ================= */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-12">
          <FadeInUp delay={0.25}>
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <SkillGlobeSection />
          </FadeInUp>
        </section>

        {/* ================= CERTIFICATES ================= */}
        <section id="certificates" className="max-w-5xl mx-auto px-6 py-12">
          <CertificatesSection />
        </section>

        {/* ================= TIMELINE ================= */}
        <section id="timeline" className="max-w-5xl mx-auto px-6 py-12">
          <FadeInUp delay={0.3}>
            <h2 className="text-2xl font-bold mb-4">My Journey</h2>
            <TimelineSection />
          </FadeInUp>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section id="experience" className="max-w-5xl mx-auto px-6 py-12">
          <ExperienceSection />
        </section>

        {/* ================= ACHIEVEMENTS ================= */}
        <AchievementsSection />

        {/* ================= CHATBOT ================= */}
        <section id="chatbot" className="max-w-5xl mx-auto px-6 py-12">
          <FadeInUp delay={0.4}>
            <h2 className="text-2xl font-bold mb-4">Chat With My AI Bot</h2>
            <ChatBotSection />
          </FadeInUp>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="max-w-5xl mx-auto px-6 pb-20 pt-12">
          <FadeInUp delay={0.5}>
            <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
            <ContactFormSection />
          </FadeInUp>
        </section>

        {/* ================= FOOTER ================= */}
        <FooterSection />

      </main>
    </div>
  );
}

