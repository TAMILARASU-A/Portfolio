"use client";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaGithub, FaLinkedin, FaHackerrank } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useState, useEffect } from "react";

export default function Hero() {
  const [open, setOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".resume-dropdown")) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <section id="hero" className="relative pt-28 pb-20 fade-in">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 items-center">

        {/* LEFT SIDE */}
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold leading-tight"
          >
            Hi, I'm <br />
            <span className="text-cyan-400 drop-shadow-lg">TAMILARASU A</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-lg opacity-80"
          >
            <Typewriter
              words={[
                "MCA Graduate (May 2026)",
                "Python Developer",
                "AI Enthusiast",
                "Software Developer",
                "Building AI-Integrated Applications"
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1200}
            />
          </motion.p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-5 mt-6 text-3xl">
            <a href="https://www.linkedin.com/in/tamilarasu-a-74b936287/" target="_blank"
              className="hover:text-cyan-300 transition-all duration-200 hover:scale-110">
              <FaLinkedin />
            </a>

            <a href="https://github.com/TAMILARASU-A" target="_blank"
              className="hover:text-cyan-300 transition-all duration-200 hover:scale-110">
              <FaGithub />
            </a>

            <a href="https://leetcode.com/u/Tamilarasu__A/" target="_blank"
              className="hover:text-cyan-300 transition-all duration-200 hover:scale-110">
              <SiLeetcode />
            </a>

            <a href="https://www.hackerrank.com/profile/arasu9725" target="_blank"
              className="hover:text-cyan-300 transition-all duration-200 hover:scale-110">
              <FaHackerrank />
            </a>
          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex gap-4 relative">

            {/* View Projects */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#projects"
              className="px-6 py-2 bg-cyan-400 text-black font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/40 transition"
            >
              View Projects
            </motion.a>

            {/* RESUME DROPDOWN */}
            <div className="relative resume-dropdown">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(!open);
                }}
                className="px-6 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition"
              >
                Resume ▼
              </motion.button>

              {/* MENU */}
              {open && (
                <div className="
                  absolute right-0 mt-2 w-48 
                  bg-black/40 backdrop-blur-lg border border-white/20 
                  rounded-xl shadow-xl flex flex-col z-50
                ">
                  <a
                    href="/RESUME_MY.pdf"
                    target="_blank"
                    className="px-4 py-2 hover:bg-white/10 rounded-t-xl transition"
                  >
                    📄 View Resume
                  </a>

                  <a
                    href="/RESUME_MY.pdf"
                    download="TAMILARASU_RESUME.pdf"
                    className="px-4 py-2 hover:bg-white/10 rounded-b-xl transition"
                  >
                    ⬇️ Download Resume
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full 
            bg-gradient-to-tr from-cyan-500 to-blue-700 shadow-2xl 
            overflow-hidden hover:scale-105 transition flex items-center justify-center">
            <img
              src="/avatar.png"
              alt="Profile"
              className="w-full h-full object-cover object-center rounded-full"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
