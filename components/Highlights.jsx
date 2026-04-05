"use client";
import { FaGithub, FaLinkedin, FaHackerrank } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Highlights() {
  const links = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={28} />,
      url: "https://www.linkedin.com/in/tamilarasu-a-74b936287/",
      id: "Tamilarasu A"
    },
    {
      name: "GitHub",
      icon: <FaGithub size={28} />,
      url: "https://github.com/TAMILARASU-A",
      id: "TAMILARASU-A"
    },
    {
      name: "LeetCode",
      icon: <SiLeetcode size={28} />,
      url: "https://leetcode.com/u/Tamilarasu__A/",
      id: "Tamilarasu__A"
    },
    {
      name: "HackerRank",
      icon: <FaHackerrank size={28} />,
      url: "https://www.hackerrank.com/profile/arasu9725",
      id: "arasu9725"
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 mt-4 mb-10">
      <h2 className="text-2xl font-bold mb-4">Highlights</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-3">
        {links.map((item, i) => (
          <div
            key={i}
            className="min-w-[220px] p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md glow-hover"
          >
            <div className="text-cyan-300">{item.icon}</div>
            <div className="mt-2 text-lg font-semibold">{item.name}</div>
            <div className="text-sm opacity-70">{item.id}</div>

            <a
              href={item.url}
              target="_blank"
              className="mt-3 inline-block text-cyan-300 underline text-sm"
            >
              Visit →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
