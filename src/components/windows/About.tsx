"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function About() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = `$ whoami

Prabhdeep Singh
Full-stack developer & Linux enthusiast
focused on backend systems, security tools,
and cloud-native applications.

Currently pursuing BTech in Computer
Science Engineering at Bennett University
(2024-2028).

═══════════════════════════════════════

Experience Highlights:

• Deputy Minister - Digital Infrastructure
  Bennett University Student Cabinet
  → build internal tools & mentor teams

• SDE Intern at Lemma
  → secure AI-powered quiz platform
  → anti-cheating mechanisms

• Tech Co-Head at CLTI BU
  → led technical operations & mentoring

═══════════════════════════════════════

> echo "Building privacy-first systems & futuristic tools"`;

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [displayedText, fullText]);

  return (
    <motion.div
      className="font-mono text-xs sm:text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="whitespace-pre-wrap break-words leading-relaxed text-foreground/90">
        {displayedText}
        {displayedText.length < fullText.length && (
          <motion.span
            className="text-foreground-dim"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            █
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
