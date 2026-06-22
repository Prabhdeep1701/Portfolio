"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

interface TerminalCommand {
  input: string;
  output: string[];
}

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [commands, setCommands] = useState<TerminalCommand[]>([
    { input: "", output: ["prabhdeep@portfolio:~$ "] },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commandHelp: Record<string, string[]> = {
    help: [
      "Available commands:",
      "  about    - Show profile information",
      "  projects - List all projects",
      "  skills   - Display technical skills",
      "  contact  - Contact information",
      "  clear    - Clear terminal",
      "  ls       - List available commands",
      "  whoami   - Show current user",
      "  exit     - Close terminal",
    ],
    about: [
      "Full-stack developer & Linux enthusiast",
      "Focused on backend systems, security, and cloud-native apps",
      "Currently at Bennett University (2024-2028)",
      "Building privacy-first and futuristic tools",
    ],
    projects: [
      "RetroWraith - Minimal Linux Recovery Environment",
      "WRAITH - Darkweb Messenger with E2E Encryption",
      "Bug Bounty Tool - Automated Vulnerability Scanner",
    ],
    skills: [
      "Languages: Python, Java, C/C++, JavaScript, TypeScript, Rust",
      "Frameworks: Flask, FastAPI, Django, React, Next.js",
      "Tools: Linux, Git, Docker, Docker Compose, Kubernetes",
      "Platforms: AWS, GCP, DigitalOcean, Vercel",
    ],
    contact: [
      "email: prabhdeep1701@gmail.com",
      "phone: +91 94118 64565",
      "github: github.com/Prabhdeep1701",
      "linkedin: linkedin.com/in/prabhdeep-singh",
    ],
    ls: ["about      contact  help   ls      projects  skills   whoami"],
    whoami: ["root"],
    clear: [],
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: string[] = [];

    if (trimmedCmd === "clear") {
      setCommands([{ input: "", output: ["prabhdeep@portfolio:~$ "] }]);
      setCurrentInput("");
      return;
    }

    if (trimmedCmd === "exit") {
      setIsOpen(false);
      return;
    }

    if (trimmedCmd in commandHelp) {
      output = commandHelp[trimmedCmd];
    } else if (trimmedCmd === "") {
      output = [];
    } else {
      output = [`command not found: ${trimmedCmd}`, "Type 'help' for available commands"];
    }

    setCommands((prev) => [...prev, { input: cmd, output }]);
    setCurrentInput("");
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-[#080808]/90 backdrop-blur-xl border border-white/[0.04] rounded-xl text-foreground-dim hover:text-foreground hover:border-white/[0.1] transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <TerminalIcon size={14} strokeWidth={1.5} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-16 sm:bottom-20 right-2 sm:right-4 left-2 sm:left-auto sm:w-96 h-64 sm:h-80 bg-[#050505]/95 border border-white/[0.04] rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            <div className="flex-shrink-0 bg-[#080808] px-3 sm:px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between">
              <span className="text-[10px] sm:text-xs text-foreground font-mono tracking-wide">
                prabhdeep@portfolio:~$
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[10px] sm:text-xs text-foreground-dim hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            <div
              ref={terminalRef}
              className="flex-1 overflow-y-auto premium-scrollbar p-3 font-mono text-[11px] sm:text-xs space-y-1"
            >
              {commands.map((cmd, idx) => (
                <div key={idx}>
                  {cmd.input && (
                    <div className="text-foreground">
                      <span className="text-foreground-dim">$</span> {cmd.input}
                    </div>
                  )}
                  {cmd.output.map((line, outIdx) => (
                    <div key={outIdx} className="text-foreground-dim">
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex-shrink-0 border-t border-white/[0.04] px-3 py-2 flex items-center gap-1.5">
              <span className="text-foreground-dim text-[11px] sm:text-xs">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCommand(currentInput);
                }}
                className="flex-1 bg-transparent outline-none text-foreground font-mono text-[11px] sm:text-xs placeholder-foreground-dim/20"
                placeholder="Type command..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
