"use client";

import { FiAward, FiExternalLink } from "react-icons/fi";
import { useState } from "react";
import GlassCard from "./GlassCard";

const certificates = [
    {
        title: "Python Guided Path I",
        issuer: "Coding Ninjas",
        date: "2025",
        description: "Completed Python fundamental concepts",
        image: "/certificates/Coding Ninjas-Python_Guided_Path-1.png",
    },
    {
        title: "Python Guided Path II",
        issuer: "Coding Ninjas",
        date: "2025",
        description: "Advanced Python programming concepts",
        image: "/certificates/CODING_NINJAS_PYTHON_GUIDED_PATH-II.png",
    },
    {
        title: "HackerRank Python Basic",
        issuer: "HackerRank",
        date: "2024",
        description: "Python basic certification",
        image: "/certificates/HackerRank-Python_Basic.png",
    },
    {
        title: "Flask Web Development",
        issuer: "LinkedIn Learning",
        date: "2024",
        description: "Complete Flask framework training",
        image: "/certificates/LinkedIn-Flask.png",
    },
    {
        title: "Code Quity",
        issuer: "Code Quity",
        date: "2024",
        description: "Coding excellence and quality practices",
        image: "/certificates/Code_Quity.png",
    },
    {
        title: "Internship Certification",
        issuer: "Boredom Technologies LLP",
        date: "2025",
        description: "Full-stack web development internship",
        image: "/certificates/Internship.png",
    },
    {
        title: "2nd Highest Academic Achievement",
        issuer: "Gobi Arts and Science College",
        date: "2024",
        description: "Academic proficiency award for BCA",
        image: "/certificates/f9dd9f45-609c-4d63-9960-f9cdfa654484-0000.png",
    },
    {
        title: "English Typewriting",
        issuer: "Typewriting Board",
        date: "2023",
        description: "English typewriting certification",
        image: "/certificates/Typewriting_English.png",
    },
    {
        title: "Tamil Typewriting",
        issuer: "Typewriting Board",
        date: "2023",
        description: "Tamil typewriting certification",
        image: "/certificates/Typewriting_Tamil.png",
    },
];

export default function Certificates() {
    const getImageSrc = (imagePath) => encodeURI(imagePath);
    const [activeIndex, setActiveIndex] = useState(0);

    function CertificatePreview({ image, title }) {
        const [status, setStatus] = useState("loading");

        return (
            <div className="relative w-full h-full min-h-52 bg-black/70">
                {status === "loading" && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs bg-black/70">
                        Loading preview...
                    </div>
                )}

                {status === "error" ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center bg-black/80 text-white/70">
                        <FiAward className="text-yellow-300 text-3xl" />
                        <p className="text-xs">Preview not available</p>
                        <a
                            href={getImageSrc(image)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium text-cyan-300 hover:text-cyan-200 transition text-xs"
                        >
                            Open image
                            <FiExternalLink size={12} />
                        </a>
                    </div>
                ) : (
                    <img
                        src={getImageSrc(image)}
                        alt={title}
                        className="w-full h-full object-contain bg-black/70 p-1"
                        loading="lazy"
                        onLoad={() => setStatus("loaded")}
                        onError={() => setStatus("error")}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Certificates</h2>

            <GlassCard className="max-w-2xl mx-auto p-2.5 md:p-3 border border-cyan-500/30">
                <div className="overflow-hidden rounded-lg bg-black/30 border border-white/10 flex flex-col h-full">
                    <div className="flex items-center justify-between px-2.5 md:px-3 py-2 border-b border-white/10 bg-white/5">
                        <span className="text-[10px] md:text-xs text-white/70 truncate pr-2">{certificates[activeIndex].title}</span>
                        <span className="text-[9px] md:text-[10px] text-white/60 shrink-0">{certificates[activeIndex].issuer}</span>
                    </div>

                    <div className="flex-1 relative bg-black/50 min-h-[220px] md:min-h-[300px] rounded-lg overflow-hidden">
                        <CertificatePreview
                            image={certificates[activeIndex].image}
                            title={certificates[activeIndex].title}
                        />
                    </div>

                    <div className="flex items-center justify-between gap-2 px-2.5 md:px-3 py-2 text-[10px] md:text-xs text-white/65 border-t border-white/10 bg-white/5">
                        <div className="inline-flex items-center gap-1">
                            <FiAward className="text-yellow-300" size={12} />
                            <span>{certificates[activeIndex].date}</span>
                        </div>

                        {certificates[activeIndex].image && (
                            <a
                                href={getImageSrc(certificates[activeIndex].image)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-medium text-cyan-300 hover:text-cyan-200 transition text-[10px] md:text-xs"
                            >
                                View Image
                                <FiExternalLink size={10} />
                            </a>
                        )}
                    </div>
                </div>
            </GlassCard>

            <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
                {certificates.map((certificate, index) => (
                    <button
                        key={`${certificate.title}-${index}`}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`min-w-7 h-7 px-2 rounded-sm border text-[10px] md:text-[11px] font-medium transition ${activeIndex === index
                            ? "bg-blue-500 text-white border-blue-400 shadow-sm shadow-blue-500/25"
                            : "bg-white/90 text-slate-900 border-slate-200 hover:bg-white hover:border-slate-300"
                            }`}
                        aria-label={`Show certificate ${index + 1}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}