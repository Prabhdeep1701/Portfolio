"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink, ChevronRight } from "lucide-react";

const projects = [
  {
    name: "RetroWraith",
    subtitle: "Minimal Linux Recovery Environment",
    description: `Built bootable Arch-based recovery ISO with:
• terminal-only workflow using ncurses
• offline disk inspection
• RetroCloud integration`,
    github: "https://github.com/Prabhdeep1701/RetroWraith",
  },
  {
    name: "WRAITH",
    subtitle: "Darkweb Messenger",
    description: `End-to-end encrypted private messaging:
• Flask + SocketIO real-time backend
• PyQt desktop UI
• Advanced encryption protocols`,
    github: "https://github.com/Prabhdeep1701/WRAITH",
  },
  {
    name: "Bug Bounty Tool",
    subtitle: "Automated Vulnerability Scanner",
    description: `Integrated security scanning tool:
• automated vulnerability detection
• Nmap, scraping, automation
• web application security testing`,
    github: "https://github.com/Prabhdeep1701",
  },
];

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <motion.div
      className="space-y-2.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-foreground-dim/60 mb-3 text-xs sm:text-sm font-mono">$ ls -la projects/</div>

      {projects.map((project, idx) => (
        <motion.div
          key={idx}
          className="group border border-white/[0.06] rounded-xl p-3 sm:p-4 hover:bg-white/[0.02] hover:border-white/[0.1] cursor-pointer transition-all"
          whileHover={{ x: 2 }}
          onClick={() =>
            setExpandedProject(
              expandedProject === project.name ? null : project.name
            )
          }
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <ChevronRight
                  size={12}
                  className={`text-foreground-dim/40 transition-transform ${
                    expandedProject === project.name ? "rotate-90" : ""
                  }`}
                  strokeWidth={1.5}
                />
                <span className="text-foreground text-xs sm:text-sm font-medium tracking-wide">
                  {project.name}
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-foreground-dim/50 mt-0.5 ml-6">
                {project.subtitle}
              </div>
            </div>
          </div>

          {expandedProject === project.name && (
            <motion.div
              className="mt-3 pt-3 border-t border-white/[0.06] text-[10px] sm:text-xs text-foreground-dim/70 space-y-3 ml-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <div className="whitespace-pre-wrap leading-relaxed">{project.description}</div>
              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-foreground-dim/50 hover:text-foreground transition-colors"
                >
                  <Github size={12} strokeWidth={1.5} />
                  <span>GitHub</span>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-foreground-dim/50 hover:text-foreground transition-colors"
                >
                  <ExternalLink size={12} strokeWidth={1.5} />
                  <span>Live</span>
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
