"use client";
import { motion } from "framer-motion";
import { FaSchool, FaGraduationCap, FaLaptopCode, FaBrain } from "react-icons/fa";

export default function MiniTimeline() {
  const timeline = [
    {
      year: "2018 – 2019",
      title: "SSLC",
      school: "Kumutha Matriculation Higher Secondary School, Erode",
      score: "76.2%",
      icon: <FaSchool className="text-cyan-300 text-xl" />,
    },
    {
      year: "2020 – 2021",
      title: "HSC",
      school: "Kumutha Matriculation Higher Secondary School, Erode",
      score: "83.6%",
      icon: <FaGraduationCap className="text-cyan-300 text-xl" />,
    },
    {
      year: "2021 – 2024",
      title: "BCA",
      school: "Gobi Arts and Science College, Gobichettipalayam ",
      score: "CGPA: 7.6",
      achievement: "Proficiency in BCA for academic excellence",
      icon: <FaLaptopCode className="text-cyan-300 text-xl" />,
    },
    {
      year: "2024 – May 2026",
      title: "MCA",
      school: "Coimbatore Institute of Technology, Coimbatore",
      score: "CGPA: 7.76 • Completed",
      icon: <FaBrain className="text-cyan-300 text-xl" />,
    },
    {
      year: "Dec 2025 – May 2026",
      title: "Application Development and Support Intern",
      school: "ARGA Investment Management (India) Private Limited, Chennai",
      score: "6-month internship • On-site",
      icon: <FaLaptopCode className="text-cyan-300 text-xl" />,
    },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto py-10">

      {/* Glowing Vertical Line */}
      <div className="absolute left-1/2 top-0 h-full w-[4px] 
        bg-cyan-500/40 rounded-full animate-pulse shadow-[0_0_15px_cyan]" />

      <div className="space-y-20 relative z-10">
        {timeline.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div key={index} className="relative">

              {/* Curved Connector Line */}
              <motion.div
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="absolute inset-0 pointer-events-none"
              >
                <svg
                  width="100%"
                  height="100"
                  viewBox="0 0 400 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${isLeft ? "" : "rotate-y-180"}`}
                >
                  <path
                    d="M200 0 C 250 50, 250 50, 200 100"
                    stroke="rgba(0,255,255,0.3)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              {/* Row */}
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex items-center gap-4 ${isLeft ? "flex-row-reverse" : ""
                  }`}
              >
                {/* Spacer */}
                <div className="w-1/2" />

                {/* Timeline Card */}
                <div className="w-1/2 relative">

                  {/* Glow background */}
                  <div className="absolute inset-0 blur-xl bg-cyan-400/20 rounded-xl" />

                  <div
                    className="
                      p-4 rounded-xl backdrop-blur-md bg-white/10
                      border border-white/20 shadow-lg 
                      hover:shadow-cyan-500/30 transition glow-hover
                    "
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {item.icon}
                      <h3 className="font-semibold text-lg text-cyan-300">
                        {item.year}
                      </h3>
                    </div>

                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="text-xs opacity-80 mt-1">{item.school}</p>
                    <p className="text-sm text-cyan-200 mt-2">{item.score}</p>
                    {(item.achievement || item.archievement) && (
                      <p className="text-xs text-cyan-100 mt-2 font-medium">
                        Achievement: {item.achievement || item.archievement}
                      </p>
                    )}
                  </div>
                </div>

                {/* Glowing Dot */}
                <div className="
                  w-6 h-6 rounded-full bg-cyan-400 border-4 border-[#071423]
                  shadow-[0_0_15px_cyan] animate-ping
                " />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
