"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const skillSets = [
  {
    category: "Languages",
    items: [
      { name: "Python", level: 95 },
      { name: "Java", level: 85 },
      { name: "C/C++", level: 80 },
      { name: "JavaScript", level: 88 },
      { name: "TypeScript", level: 80 },
      { name: "Rust", level: 60 },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "Flask", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "Django", level: 75 },
      { name: "React", level: 85 },
      { name: "Next.js", level: 88 },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Linux", level: 92 },
      { name: "Git", level: 90 },
      { name: "Docker", level: 80 },
      { name: "API Development", level: 88 },
      { name: "TCP/IP", level: 85 },
    ],
  },
  {
    category: "Agentic Tools",
    items: [
      { name: "Stitch", level: 85 },
      { name: "Claude-code", level: 90 },
      { name: "Ollama", level: 75 },
      { name: "n8n", level: 80 },
      { name: "Langflow", level: 78 },
    ],
  },
];

export default function Skills() {
  const [animateIndexes, setAnimateIndexes] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIndexes(Array.from({ length: skillSets.length }, (_, i) => i));
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-foreground-dim/60 mb-3 text-xs sm:text-sm font-mono">$ cat /proc/skills.txt</div>

      {skillSets.map((skillSet, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={animateIndexes.includes(idx) ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="text-foreground text-xs sm:text-sm font-medium tracking-wide mb-2.5">
            <span className="text-foreground-dim/40">→</span> {skillSet.category}
          </div>
          <div className="space-y-2">
            {skillSet.items.map((skill, skillIdx) => (
              <motion.div
                key={skillIdx}
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={animateIndexes.includes(idx) ? { opacity: 1 } : {}}
                transition={{ delay: idx * 0.1 + skillIdx * 0.05 }}
              >
                <span className="text-[10px] sm:text-xs text-foreground-dim/50 w-20 sm:w-24 truncate">
                  {skill.name}
                </span>
                <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground/30 rounded-full"
                    initial={{ width: 0 }}
                    animate={animateIndexes.includes(idx) ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.2, delay: idx * 0.1 + skillIdx * 0.05, ease: "easeOut" }}
                  />
                </div>
                <span className="text-[10px] sm:text-xs text-foreground-dim w-7 text-right">
                  {skill.level}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
