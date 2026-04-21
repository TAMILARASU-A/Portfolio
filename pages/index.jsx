"use client";

import Navbar from "../components/Navbar";
import ParticleBackground from "../components/ParticleBackground";
import AuroraBackground from "../components/AuroraBackground";
import Hero from "../components/Hero";
import MiniChatBot from "../components/MiniChatBot";
import MiniDevDashboard from "../components/MiniDevDashboard";
import MiniTimeline from "../components/MiniTimeline";
import MiniProjectCard from "../components/MiniProjectCard";
import FeaturedWork from "../components/FeaturedWork";
import Achievements from "../components/Achievements";
import Footer from "../components/Footer";
import GlassCard from "../components/GlassCard";
import FadeInUp from "../components/FadeInUp";
import ContactForm from "../components/ContactForm";
import SkillGlobe from "../components/SkillGlobe";   // ⭐ NEW 3D GLOBE
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">

      {/* Background Layers */}
      <AuroraBackground />
      <ParticleBackground />
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
        <FeaturedWork />

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
            <SkillGlobe />   {/*  ⭐ Your new 3D rotating skill globe */}
          </FadeInUp>
        </section>

        {/* ================= TIMELINE ================= */}
        <section id="timeline" className="max-w-5xl mx-auto px-6 py-12">
          <FadeInUp delay={0.3}>
            <h2 className="text-2xl font-bold mb-4">My Journey</h2>
            <MiniTimeline />
          </FadeInUp>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section id="experience" className="max-w-5xl mx-auto px-6 py-12">
          <ExperienceSection />
        </section>

        {/* ================= ACHIEVEMENTS ================= */}
        <Achievements />

        {/* ================= CHATBOT ================= */}
        <section id="chatbot" className="max-w-5xl mx-auto px-6 py-12">
          <FadeInUp delay={0.4}>
            <h2 className="text-2xl font-bold mb-4">Chat With My AI Bot</h2>
            <MiniChatBot />
          </FadeInUp>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="max-w-5xl mx-auto px-6 pb-20 pt-12">
          <FadeInUp delay={0.5}>
            <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
            <ContactForm />
          </FadeInUp>
        </section>

        {/* ================= FOOTER ================= */}
        <Footer />

      </main>
    </div>
  );
}

