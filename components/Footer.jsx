"use client";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiExternalLink } from "react-icons/fi";
import { SiLeetcode, SiHackerrank } from "react-icons/si";

export default function Footer() {
    const links = [
        {
            icon: FiGithub,
            label: "GitHub",
            url: "https://github.com/TAMILARASU-A",
            color: "hover:text-white",
        },
        {
            icon: FiLinkedin,
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/tamilarasu-a-74b936287/",
            color: "hover:text-cyan-400",
        },
        {
            icon: SiLeetcode,
            label: "LeetCode",
            url: "https://leetcode.com/u/Tamilarasu__A/",
            color: "hover:text-orange-400",
        },
        {
            icon: SiHackerrank,
            label: "HackerRank",
            url: "https://www.hackerrank.com/profile/arasu9725",
            color: "hover:text-green-400",
        },
        {
            icon: FiMail,
            label: "Email",
            url: "mailto:your-email@example.com",
            color: "hover:text-red-400",
        },
    ];

    const navLinks = [
        { label: "Home", href: "#hero" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Skills", href: "#skills" },
        { label: "Timeline", href: "#timeline" },
        { label: "Contact", href: "#contact" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative border-t border-white/10 bg-gradient-to-b from-transparent via-white/5 to-black"
        >
            <div className="max-w-5xl mx-auto px-6 py-16">
                {/* Top Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="grid md:grid-cols-3 gap-8 mb-12"
                >
                    {/* Branding */}
                    <motion.div variants={itemVariants} className="text-left">
                        <h3 className="text-2xl font-bold text-white mb-2">Tamilarasu A</h3>
                        <p className="text-white/60 text-sm">
                            MCA Graduate • Python Developer • AI Enthusiast
                        </p>
                        <p className="text-white/50 text-xs mt-2">
                            Building intelligent applications with modern technologies
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants} className="text-left">
                        <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {navLinks.slice(0, 3).map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.href}
                                        className="text-white/60 hover:text-cyan-300 text-sm transition duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Resources */}
                    <motion.div variants={itemVariants} className="text-left">
                        <h4 className="font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {navLinks.slice(3).map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.href}
                                        className="text-white/60 hover:text-cyan-300 text-sm transition duration-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="/RESUME_MY.pdf"
                                    className="text-white/60 hover:text-cyan-300 text-sm transition duration-300 flex items-center gap-1"
                                >
                                    Resume
                                    <FiExternalLink size={12} />
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
                ></motion.div>

                {/* Social Links */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="flex justify-center items-center gap-4 mb-8"
                >
                    {links.map((link, i) => {
                        const Icon = link.icon;
                        return (
                            <motion.a
                                key={i}
                                variants={itemVariants}
                                whileHover={{ scale: 1.2, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                                className={`p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/60 transition ${link.color}`}
                                title={link.label}
                            >
                                <Icon size={20} />
                            </motion.a>
                        );
                    })}
                </motion.div>

                {/* Bottom Text */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    className="text-center border-t border-white/5 pt-8"
                >
                    <p className="text-white/50 text-sm mb-2">
                        © {new Date().getFullYear()} Tamilarasu A. All rights reserved.
                    </p>
                    <p className="text-white/40 text-xs">
                        Designed & Built with <span className="text-red-400">❤️</span> using
                        <span className="text-cyan-300"> Next.js</span>,
                        <span className="text-purple-300"> React</span>, &
                        <span className="text-blue-300"> Tailwind CSS</span>
                    </p>
                </motion.div>
            </div>

            {/* Animated background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        </motion.footer>
    );
}
