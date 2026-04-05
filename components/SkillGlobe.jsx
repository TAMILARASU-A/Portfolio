"use client";

import React, { useMemo, useState } from "react";
import GlassCard from "./GlassCard";
import IconCloud from "./ui/icon-cloud";
import { FiCode, FiGrid, FiDatabase, FiCpu, FiCamera } from "react-icons/fi";

const skillCloudItems = [
  { slug: "python", label: "Python" },
  { slug: "dotnet", label: ".NET" },
  { slug: "csharp", label: "C#" },
  { slug: "java", label: "Java" },
  { slug: "c", label: "C" },
  { slug: "angular", label: "Angular" },
  { slug: "react", label: "React" },
  { slug: "nextdotjs", label: "Next.js" },
  { slug: "javascript", label: "JavaScript" },
  { slug: "tailwindcss", label: "Tailwind CSS" },
  { slug: "bootstrap", label: "Bootstrap" },
  { slug: "ngzorro", label: "NG ZORRO" },
  { slug: "mysql", label: "MySQL" },
  { slug: "mongodb", label: "MongoDB" },
  { slug: "flask", label: "Flask" },
  { slug: "django", label: "Django" },
  { slug: "nodedotjs", label: "Node.js" },
  { slug: "git", label: "Git" },
  { slug: "github", label: "GitHub" },
  { slug: "vercel", label: "Vercel" },
  { slug: "firebase", label: "Firebase" },
  { slug: "streamlit", label: "Streamlit" },
  { slug: "plotly", label: "Plotly" },
  { slug: "opencv", label: "OpenCV" },
  { slug: "xgboost", label: "XGBoost" },
  { slug: "apachespark", label: "PySpark" },
  { slug: "mathworks", label: "MATLAB" },
  { slug: "pytorch", label: "PyTorch" },
  { slug: "tensorflow", label: "TensorFlow" },
  { slug: "numpy", label: "NumPy" },
  { slug: "pandas", label: "Pandas" },
];

const skillSlugs = skillCloudItems.map((item) => item.slug);
const skillLabels = Object.fromEntries(skillCloudItems.map((item) => [item.slug, item.label]));

const skillGroups = [
  {
    title: "Languages",
    icon: FiCode,
    cardClass: "from-sky-900/60 to-blue-900/30 border-sky-400/40",
    iconClass: "bg-sky-500/20 text-sky-300",
    chipClass: "border-sky-400/40 text-sky-200 bg-sky-500/10",
    skills: ["Python", "C#", "C", "Java", "JavaScript"],
  },
  {
    title: "Frameworks & UI",
    icon: FiGrid,
    cardClass: "from-indigo-900/55 to-violet-900/35 border-violet-400/45",
    iconClass: "bg-violet-500/20 text-violet-300",
    chipClass: "border-violet-400/40 text-violet-200 bg-violet-500/10",
    skills: ["Angular", "React", "Next.js", "Tailwind CSS", "Bootstrap", "NG ZORRO"],
  },
  {
    title: "Backend & Database",
    icon: FiDatabase,
    cardClass: "from-emerald-950/65 to-teal-900/35 border-emerald-400/45",
    iconClass: "bg-emerald-500/20 text-emerald-300",
    chipClass: "border-emerald-400/40 text-emerald-200 bg-emerald-500/10",
    skills: [".NET", "Node.js", "Flask", "Django", "MongoDB", "MySQL"],
  },
  {
    title: "AI / ML",
    icon: FiCpu,
    cardClass: "from-orange-950/60 to-amber-900/35 border-amber-400/50",
    iconClass: "bg-amber-500/20 text-amber-300",
    chipClass: "border-amber-400/45 text-amber-200 bg-amber-500/10",
    skills: ["Llama Model", "PyTorch", "TensorFlow", "XGBoost", "ChromaDB"],
  },
  {
    title: "Computer Vision",
    icon: FiCamera,
    cardClass: "from-fuchsia-950/65 to-rose-900/35 border-rose-400/50",
    iconClass: "bg-rose-500/20 text-rose-300",
    chipClass: "border-rose-400/45 text-rose-200 bg-rose-500/10",
    skills: ["OpenCV"],
  },
  {
    title: "Data Engineering",
    icon: FiDatabase,
    cardClass: "from-cyan-950/65 to-sky-900/35 border-cyan-400/50",
    iconClass: "bg-cyan-500/20 text-cyan-300",
    chipClass: "border-cyan-400/45 text-cyan-200 bg-cyan-500/10",
    skills: ["PySpark", "MATLAB", "NumPy", "Pandas", "Plotly"],
  },
  {
    title: "Deployment & Tools",
    icon: FiGrid,
    cardClass: "from-slate-900/70 to-zinc-900/45 border-slate-300/35",
    iconClass: "bg-slate-500/20 text-slate-200",
    chipClass: "border-slate-300/35 text-slate-100 bg-slate-500/10",
    skills: ["Vercel", "Firebase", "Streamlit", "Git", "GitHub", "PyCharm"],
  },
];

export default function SkillGlobe() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("Click a skill to highlight");

  const filters = [
    "All",
    "Languages",
    "Frameworks & UI",
    "Backend & DB",
    "AI / ML",
    "Computer Vision",
    "Data Engineering",
    "Deployment & Tools",
  ];

  const normalizedFilterMap = {
    "Backend & DB": "Backend & Database",
  };

  const visibleGroups = useMemo(() => {
    if (activeFilter === "All") return skillGroups;
    const mapped = normalizedFilterMap[activeFilter] || activeFilter;
    return skillGroups.filter((group) => group.title === mapped);
  }, [activeFilter]);

  const totalSkills = skillGroups.reduce((acc, group) => acc + group.skills.length, 0);

  return (
    <div className="py-6">
      {/* Title */}
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-none">Skills</h2>
        <span className="text-cyan-400 tracking-[0.12em] uppercase text-xs font-semibold">Portfolio Stack</span>
      </div>

      {/* Globe */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="w-[310px] h-[310px] md:w-[340px] md:h-[340px] opacity-85 saturate-75">
          <IconCloud iconSlugs={skillSlugs} iconLabels={skillLabels} onIconClick={setSelectedSkill} />
        </div>
        <div className="px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-100 text-xs md:text-sm font-medium">
          {selectedSkill}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg border text-xs md:text-sm leading-tight transition-colors ${isActive
                  ? "border-cyan-400/70 bg-cyan-500/15 text-white"
                  : "border-white/25 bg-transparent text-white/90 hover:bg-white/5"
                }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {visibleGroups.map((group) => {
          const Icon = group.icon;
          return (
            <GlassCard
              key={group.title}
              className={`p-5 border bg-gradient-to-br ${group.cardClass} rounded-2xl`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className={`h-10 w-10 rounded-xl flex items-center justify-center ${group.iconClass}`}>
                    <Icon size={18} />
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-white">{group.title}</h3>
                </div>
                <span className="text-xs md:text-sm text-white/55">{group.skills.length} skills</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full border text-xs md:text-sm font-medium ${group.chipClass}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Stats */}
      <div className="mt-6 border-t border-white/10 pt-5 grid grid-cols-2 gap-4 max-w-md">
        <div>
          <div className="text-cyan-400 text-2xl md:text-3xl font-bold leading-none">{totalSkills}</div>
          <div className="text-white/45 text-xs tracking-wider mt-1 leading-tight">TOTAL SKILLS</div>
        </div>
        <div>
          <div className="text-cyan-400 text-2xl md:text-3xl font-bold leading-none">{skillGroups.length}</div>
          <div className="text-white/45 text-xs tracking-wider mt-1 leading-tight">CATEGORIES</div>
        </div>
      </div>
    </div>
  );
}
