import React from "react";
import GlassCard from "./GlassCard";
import FadeInUp from "./FadeInUp";

export default function AboutSection() {
    return (
        <FadeInUp delay={0.1}>
            <GlassCard>
                <div>
                    {/* Heading */}
                    <h2 className="text-4xl font-bold text-cyan-400 mb-8">WHO I AM?</h2>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {/* Avatar - Left Side */}
                        <div className="flex justify-center md:justify-start">
                            <div className="relative">
                                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg shadow-cyan-400/50">
                                    <img
                                        src="/avatar.png"
                                        alt="Tamilarasu"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Decorative glow */}
                                <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-pulse"></div>
                            </div>
                        </div>

                        {/* Text Content - Right Side */}
                        <div className="md:col-span-2 space-y-4 text-sm leading-relaxed opacity-90">
                            <p>
                                Hi, I'm{" "}
                                <span className="text-cyan-400 font-semibold">Tamilarasu</span>
                                — an <span className="text-blue-400 font-semibold">MCA student</span> passionate about
                                <span className="text-pink-400 font-semibold"> Python development</span> and
                                building <span className="text-cyan-400">real-world applications</span>.
                            </p>

                            <p>
                                I enjoy{" "}
                                <span className="text-blue-400 font-semibold">solving problems</span> through code and
                                continuously improving my skills in{" "}
                                <span className="text-cyan-400">algorithms and data structures</span>. I believe in
                                <span className="text-pink-400 font-semibold"> learning by doing</span>, which is why I
                                actively work on projects that challenge me and help me grow as a
                                <span className="text-cyan-400"> developer</span>.
                            </p>

                            <p>
                                Currently, I'm working as an{" "}
                                <span className="text-blue-400 font-semibold">ADS (Application Development and Support) Intern</span> at
                                <span className="text-pink-400 font-semibold"> ARGA Investment Management</span>,
                                Chennai. Through this experience, I've been exposed to{" "}
                                <span className="text-cyan-400">real-world development environments</span>,
                                support systems, and practical implementation of
                                <span className="text-blue-400"> enterprise applications</span>.
                            </p>

                            <p>
                                My interests lie in{" "}
                                <span className="text-cyan-400 font-semibold">web development</span>,
                                <span className="text-blue-400 font-semibold"> automation</span>, and
                                <span className="text-pink-400 font-semibold"> software development</span>. I aim to
                                create <span className="text-cyan-400">efficient, user-friendly solutions</span> that
                                make a <span className="text-blue-400 font-semibold">meaningful impact</span>.
                            </p>

                            <p>
                                I'm always <span className="text-pink-400">curious</span>, always
                                <span className="text-cyan-400"> learning</span>, and always looking for
                                opportunities to <span className="text-blue-400">build something valuable</span>.
                            </p>

                            <p className="pt-2 text-base font-semibold text-cyan-400">
                                Let's build something great together.
                            </p>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </FadeInUp>
    );
}
