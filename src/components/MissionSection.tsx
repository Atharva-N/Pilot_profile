"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RefreshCcw } from "lucide-react";

const stats = [
  { value: "9.35", label: "CGPA", unit: "" },
  { value: "8+", label: "AWARDS", unit: "" },
  { value: "CLASS 1", label: "DGCA + FAA MEDICAL", unit: "" },
  { value: "DONE", label: "GROUND CLASSES", unit: "" },
];

const missionItems = [
  {
    heading: "Passion for Flight",
    body:
      "From watching aircraft trace lines across the sky to studying how they stay aloft, aviation has always fascinated me. That curiosity grew into a commitment to pursue the cockpit and master the science and art of flying.",
    icon: "✈",
    color: "from-amber-400/20 to-amber-400/0",
    border: "border-amber-400/20 hover:border-amber-400/50",
    glow: "shadow-[0_0_60px_rgba(245,158,11,0.07)]",
    backBg: "bg-amber-500/10",
    accent: "text-amber-500",
  },
  {
    heading: "Discipline of the Cockpit",
    body:
      "Flying demands precision, responsibility, and the ability to stay calm under pressure. I am drawn to the discipline of the cockpit—where preparation, situational awareness, and sound decisions define every flight.",
    icon: "🎯",
    color: "from-sky-400/20 to-sky-400/0",
    border: "border-sky-400/20 hover:border-sky-400/50",
    glow: "shadow-[0_0_60px_rgba(56,189,248,0.07)]",
    backBg: "bg-sky-500/10",
    accent: "text-sky-500",
  },
  {
    heading: "Flying with Purpose",
    body:
      "Aviation is more than reaching destinations; it is about connecting people, cultures, and opportunities. As a pilot, I want to be part of the system that keeps the world moving safely and efficiently.",
    icon: "🌍",
    color: "from-cyan-400/20 to-cyan-400/0",
    border: "border-cyan-400/20 hover:border-cyan-400/50",
    glow: "shadow-[0_0_60px_rgba(34,211,238,0.07)]",
    backBg: "bg-cyan-500/10",
    accent: "text-cyan-500",
  },
];

const FlipCard = ({ item, i }: { item: typeof missionItems[0]; i: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.12, duration: 0.7, ease: "easeOut" as const }}
      className="perspective-1000 w-full h-[320px] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 15 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* --- FRONT: HEADING & ICON --- */}
        <div className="absolute inset-0 backface-hidden">
          <div className={`w-full h-full flex flex-col items-center justify-center p-8 rounded-[2.5rem] border border-slate-200/60 dark:border-white/5 bg-gradient-to-br ${item.color} ${item.border} ${item.glow} backdrop-blur-xl transition-all duration-700 shadow-lg shadow-black/[0.02] dark:shadow-none`}>
            {/* Floating icon */}
            <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500">
              {item.icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-center text-slate-800 dark:text-white leading-tight" style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.02em" }}>
              {item.heading}
            </h3>
            {/* Removed Inquire Deeply hint */}
          </div>
        </div>

        {/* --- BACK: ELABORATION --- */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className={`w-full h-full flex flex-col items-center justify-center p-10 rounded-[2rem] border border-sky-400/20 ${item.backBg} backdrop-blur-xl text-center shadow-2xl overflow-hidden relative`}>
            <div className="absolute top-6 right-6 opacity-20">
              <RefreshCcw size={20} className="animate-spin-slow" />
            </div>

            <h4 className={`text-xs font-bold uppercase tracking-[0.3em] mb-6 ${item.accent}`}>{item.heading}</h4>

            <p className="text-sm md:text-base dark:text-white/80 text-slate-700 leading-relaxed font-medium">
              {item.body}
            </p>

            {/* Removed Click to return hint */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const MissionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Parallax layers
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section ref={ref} className="relative bg-white dark:bg-[#060a14] overflow-hidden py-32 px-6 md:px-20 transition-colors duration-300">
      {/* Parallax ambient blobs */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] rounded-full bg-amber-400/5 blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ y: blob2Y }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-sky-400/6 blur-[100px] pointer-events-none"
      />

      {/* Runway grid lines — decorative */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.7) 60px, rgba(255,255,255,0.7) 61px),
            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.7) 60px, rgba(255,255,255,0.7) 61px)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats strip */}
        <motion.div
          style={{ y: textY }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" as const }}
              className="relative p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md text-center group hover:bg-white/60 dark:hover:bg-white/[0.05] hover:border-amber-400/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-amber-400/5 overflow-hidden noise-overlay"
            >
              {/* MFD Scanline effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/10 to-transparent h-24 w-full animate-scanline" />
              </div>

              <div
                className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-300 mb-2 group-hover:scale-105 transition-transform origin-bottom text-shadow-amber"
                style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.04em" }}
              >
                {s.value}
              </div>
              <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-white/40 group-hover:text-amber-500 transition-colors">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-amber-500 dark:text-amber-400 text-sm tracking-[0.4em] uppercase font-bold mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-amber-500/30" />
            Flight Mission
          </p>
          <h2
            className="text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-white/30 leading-tight transition-colors tracking-tight"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            Why I Fly
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {missionItems.map((item, i) => (
            <FlipCard key={i} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
