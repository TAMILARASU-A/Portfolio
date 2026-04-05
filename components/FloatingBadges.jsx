"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaHackerrank } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function FloatingBadges() {
  const [ready, setReady] = useState(false);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const badges = [
      { icon: <FaGithub />, link: "https://github.com/TAMILARASU-A" },
      { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tamilarasu-a-74b936287/" },
      { icon: <SiLeetcode />, link: "https://leetcode.com/u/Tamilarasu__A/" },
      { icon: <FaHackerrank />, link: "https://www.hackerrank.com/profile/arasu9725" },
    ];

    const safePositions = [
      { x: 100, y: 150 },
      { x: 150, y: 350 },
      { x: window.innerWidth - 200, y: 200 },
      { x: window.innerWidth - 220, y: 400 },
    ];

    // Set initial positions
    setPositions(
      badges.map((_, i) => ({
        x: safePositions[i].x,
        y: safePositions[i].y,
        direction: Math.random() > 0.5 ? 1 : -1, // Up or Down slowly
      }))
    );

    // Gentle floating effect
    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((p) => ({
          ...p,
          y: p.y + 0.4 * p.direction,
          direction:
            p.y < 100 || p.y > window.innerHeight - 200
              ? p.direction * -1
              : p.direction,
        }))
      );
    }, 30);

    return () => clearInterval(interval);
  }, [ready]);

  if (!ready || positions.length === 0) return null;

  const badges = [
    { icon: <FaGithub />, link: "https://github.com/TAMILARASU-A" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tamilarasu-a-74b936287/" },
    { icon: <SiLeetcode />, link: "https://leetcode.com/u/Tamilarasu__A/" },
    { icon: <FaHackerrank />, link: "https://www.hackerrank.com/profile/arasu9725" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {positions.map((p, i) => (
        <a
          key={i}
          href={badges[i].link}
          target="_blank"
          className="pointer-events-auto transition-transform hover:scale-110"
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            transform: "translate(-50%,-50%)",
          }}
        >
          <div className="text-4xl text-cyan-300 drop-shadow-[0_0_6px_cyan]">
            {badges[i].icon}
          </div>
        </a>
      ))}
    </div>
  );
}
