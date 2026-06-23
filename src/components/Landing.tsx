"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

interface LandingProps {
  onOpen: (id: string) => void;
}

const diagnostics = [
  { label: "BACKEND ENGINE", value: 98 },
  { label: "CLOUD ARCH", value: 92 },
  { label: "DISTRIBUTED SYS", value: 85 },
];

const previewProjects = [
  {
    name: "RetroWraith OS",
    status: "RUNNING" as const,
    desc: "Bootable Arch-based recovery ISO with terminal-only ncurses workflow & offline disk inspection.",
  },
  {
    name: "WRAITH Messenger",
    status: "IDLE" as const,
    desc: "End-to-end encrypted private messaging. Flask + SocketIO backend with a PyQt desktop client.",
  },
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
});

function SegmentedBar({ value }: { value: number }) {
  const total = 26;
  const filled = Math.round((value / 100) * total);
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          className="h-2.5 flex-1 rounded-[1px]"
          initial={{ opacity: 0, scaleY: 0.4 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.9 + i * 0.012 }}
          style={{
            background:
              i < filled
                ? "linear-gradient(180deg,#fff,rgba(255,255,255,0.75))"
                : "rgba(255,255,255,0.07)",
          }}
        />
      ))}
    </div>
  );
}

export default function Landing({ onOpen }: LandingProps) {
  const [showProjects, setShowProjects] = useState(true);

  // typed terminal cursor blink handled purely with framer
  return (
    <div className="absolute inset-0 overflow-y-auto premium-scrollbar">
      <div className="relative min-h-full w-full px-5 sm:px-10 lg:px-14 py-8 sm:py-10">
        {/* Hero */}
        <motion.h1
          {...fade(0.1)}
          className="font-sans font-extrabold tracking-tight text-[clamp(2.6rem,9vw,6.5rem)] leading-[0.9] text-white/85"
        >
          PRABHDEEP
          <br className="sm:hidden" /> SINGH
        </motion.h1>
        <motion.p
          {...fade(0.22)}
          className="mt-3 sm:mt-4 font-mono text-[10px] sm:text-sm tracking-[0.35em] text-white/35 uppercase"
        >
          Full-Stack Dev{"  "}|{"  "}Linux Builder{"  "}|{"  "}Security Systems
        </motion.p>

        {/* Floating cluster */}
        <div className="relative mt-10 lg:mt-0 grid grid-cols-1 lg:block gap-5">
          {/* PROJECTS.EXE — top right on desktop */}
          {showProjects && (
            <motion.div
              {...fade(0.5)}
              className="lg:absolute lg:right-0 lg:top-[-3.5rem] w-full lg:w-[340px] glass-panel rounded-xl overflow-hidden shadow-premium order-1"
            >
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/[0.05] bg-white/[0.015]">
                <span className="font-mono text-[10px] tracking-widest text-white/40">PROJECTS.EXE</span>
                <button
                  onClick={() => setShowProjects(false)}
                  className="text-white/25 hover:text-white/70 transition-colors"
                  aria-label="close projects panel"
                >
                  <X size={13} strokeWidth={1.5} />
                </button>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {previewProjects.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => onOpen("projects")}
                    className="w-full text-left px-3.5 py-3.5 hover:bg-white/[0.025] transition-colors group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-sans font-semibold text-sm text-white/85 group-hover:text-white">
                        {p.name}
                      </span>
                      <span
                        className={`font-mono text-[8px] tracking-widest px-1.5 py-0.5 rounded-sm border ${
                          p.status === "RUNNING"
                            ? "text-accent border-accent/40 bg-accent/10"
                            : "text-white/40 border-white/15"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                    <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-white/35">{p.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* CONSOLE.EXE — center */}
          <motion.div
            {...fade(0.36)}
            className="w-full max-w-[680px] lg:mx-auto lg:mt-16 glass-panel rounded-xl overflow-hidden shadow-premium order-2"
          >
            <div className="flex items-center justify-center relative px-4 py-2 border-b border-white/[0.05] bg-white/[0.015]">
              <div className="absolute left-3.5 flex gap-1.5">
                <span className="w-[9px] h-[9px] rounded-full bg-white/15" />
                <span className="w-[9px] h-[9px] rounded-full bg-white/15" />
                <span className="w-[9px] h-[9px] rounded-full bg-white/15" />
              </div>
              <span className="font-mono text-[10px] tracking-widest text-white/40">CONSOLE.EXE</span>
            </div>
            <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-[13px] leading-relaxed space-y-4">
              <div>
                <div className="text-white/45"><span className="text-accent">$</span> whoami</div>
                <div className="mt-1.5 pl-3 text-white/80">Prabhdeep Singh // Full-Stack &amp; Systems Builder</div>
              </div>
              <div>
                <div className="text-white/45"><span className="text-accent">$</span> status --full</div>
                <div className="mt-1.5 pl-3 space-y-0.5 text-white/55">
                  <div>Building scalable microservices...</div>
                  <div>Shipping Linux &amp; security tooling...</div>
                  <div>Optimizing throughput @ 100ms...</div>
                </div>
              </div>
              <div className="text-white/45 flex items-center gap-1">
                <span className="text-accent">$</span> uptime
                <motion.span
                  className="inline-block w-[7px] h-[15px] bg-white/70 ml-0.5"
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                />
              </div>
            </div>
          </motion.div>

          {/* SYSTEM_DIAGNOSTICS — bottom left */}
          <motion.div
            {...fade(0.62)}
            className="lg:absolute lg:left-0 lg:bottom-[-13rem] w-full lg:w-[320px] glass-panel rounded-xl p-4 shadow-premium order-3"
          >
            <div className="font-mono text-[10px] tracking-widest text-white/45 mb-4 flex items-center gap-2">
              <span className="text-accent">▣</span> SYSTEM_DIAGNOSTICS
            </div>
            <div className="space-y-3.5">
              {diagnostics.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between font-mono text-[9px] tracking-wider text-white/45 mb-1.5">
                    <span>{d.label}</span>
                    <span className="text-white/70">{d.value}%</span>
                  </div>
                  <SegmentedBar value={d.value} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Status footer (desktop) */}
        <motion.div
          {...fade(0.8)}
          className="hidden lg:block absolute right-10 bottom-6 text-right font-mono text-[9px] tracking-widest text-white/25 space-y-1 leading-relaxed"
        >
          <div>SECURE_CONNECTION: <span className="text-white/45">ESTABLISHED</span></div>
          <div>ENCRYPTION: <span className="text-white/45">AES-256</span></div>
          <div>SESSION_ID: <span className="text-white/45">9X-228-ALPHA</span></div>
        </motion.div>

        {/* spacer so absolute panels have room on desktop */}
        <div className="hidden lg:block h-56" />
      </div>
    </div>
  );
}
