"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Taskbar from "./Taskbar";
import FloatingWindow from "./FloatingWindow";
import ParticleBackground from "./ParticleBackground";
import About from "./windows/About";
import Projects from "./windows/Projects";
import Skills from "./windows/Skills";
import Contact from "./windows/Contact";
import Landing from "./Landing";
import { Search, Power, Settings, Maximize2 } from "lucide-react";

interface Window {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  component: React.ReactNode;
}

interface WindowPosition {
  x: number;
  y: number;
}

const desktopApps = [
  { id: "about", label: "whoami", icon: "~" },
  { id: "projects", label: "projects", icon: "#" },
  { id: "skills", label: "skills", icon: "%" },
  { id: "contact", label: "contact", icon: "@" },
];

const getInitialPosition = (id: string): WindowPosition => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(`window-pos-${id}`);
    if (stored) {
      try { return JSON.parse(stored); } catch {}
    }
  }
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  if (isMobile) return { x: 0, y: 0 };
  const offsets: Record<string, WindowPosition> = {
    about: { x: 40, y: 40 },
    projects: { x: 80, y: 80 },
    skills: { x: 120, y: 120 },
    contact: { x: 160, y: 160 },
  };
  return offsets[id] || { x: Math.random() * 160, y: Math.random() * 160 };
};

function AnimatedBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,${0.04 + i * 0.02}), transparent)`,
            top: `${30 + i * 25}%`,
          }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function Desktop() {
  const [windows, setWindows] = useState<Window[]>([
    { id: "about", title: "whoami", icon: "~", isOpen: false, isMinimized: false, component: <About /> },
    { id: "projects", title: "projects", icon: "#", isOpen: false, isMinimized: false, component: <Projects /> },
    { id: "skills", title: "skills", icon: "%", isOpen: false, isMinimized: false, component: <Skills /> },
    { id: "contact", title: "contact", icon: "@", isOpen: false, isMinimized: false, component: <Contact /> },
  ]);

  const [windowPositions, setWindowPositions] = useState<Record<string, WindowPosition>>({});
  const [windowZIndices, setWindowZIndices] = useState<Record<string, number>>({});
  const [time, setTime] = useState("");
  const [activeApp, setActiveApp] = useState<string | null>(null);

  useEffect(() => {
    const positions: Record<string, WindowPosition> = {};
    const zIndices: Record<string, number> = {};
    windows.forEach((w, index) => {
      positions[w.id] = getInitialPosition(w.id);
      zIndices[w.id] = 40 + index;
    });
    setWindowPositions(positions);
    setWindowZIndices(zIndices);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: !w.isOpen, isMinimized: false } : w))
    );
    bringToFront(id);
    setActiveApp(id);
  };

  const toggleMinimize = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  };

  const closeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
    setActiveApp((prev) => (prev === id ? null : prev));
  };

  const bringToFront = (id: string) => {
    setWindowZIndices((prev) => {
      const maxZ = Math.max(...Object.values(prev), 40);
      return { ...prev, [id]: maxZ + 1 };
    });
    setActiveApp(id);
  };

  const updateWindowPosition = (id: string, position: WindowPosition) => {
    setWindowPositions((prev) => ({ ...prev, [id]: position }));
    localStorage.setItem(`window-pos-${id}`, JSON.stringify(position));
  };

  const openWindows = windows.filter((w) => w.isOpen);

  return (
    <div className="w-full h-screen bg-dark-bg overflow-hidden flex flex-col relative">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-[60] bg-[linear-gradient(90deg,transparent,#8b7bff_20%,#6b5fd6_50%,#8b7bff_80%,transparent)] opacity-70" />

      <AnimatedBg />
      <ParticleBackground />

      {/* Top bar */}
      <motion.div
        className="h-10 sm:h-11 flex items-center px-3 sm:px-5 justify-between text-xs font-mono z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.03]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <span className="text-white/70 text-[10px] sm:text-xs tracking-[0.2em] font-medium">
            SYS.OS_V2.0 <span className="text-accent">//</span> PRABHDEEP
          </span>
          <div className="hidden md:flex items-center gap-1.5 ml-2">
            {openWindows.length > 0 && (
              <div className="flex gap-1">
                {openWindows.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => toggleWindow(w.id)}
                    className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                      activeApp === w.id
                        ? "bg-white/10 text-white"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    {w.icon} {w.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-foreground-dim">
          <button className="hidden sm:flex items-center gap-1.5 text-white/35 hover:text-white/70 transition-colors">
            <Search size={11} strokeWidth={1.5} />
            <span className="text-[10px] tracking-widest">SEARCH_SYS</span>
          </button>
          <Maximize2 size={11} strokeWidth={1.5} className="hidden sm:block text-white/30" />
          <Settings size={11} strokeWidth={1.5} className="hidden sm:block text-white/30" />
          <Power size={11} strokeWidth={1.5} className="hidden sm:block text-white/30" />
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="text-[10px] sm:text-xs tracking-wide tabular-nums text-white/60">{time}</span>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Desktop shortcut icons - left sidebar (hidden on landing) */}
        <motion.div
          className={`absolute left-3 sm:left-5 top-4 sm:top-6 z-10 flex-col gap-2 ${
            openWindows.length === 0 ? "hidden" : "flex"
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          {desktopApps.map((app) => {
            const isOpen = windows.find(w => w.id === app.id)?.isOpen;
            return (
              <motion.button
                key={app.id}
                onClick={() => toggleWindow(app.id)}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-white/[0.03] transition-all group"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
              >
                <div
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-base sm:text-lg font-mono border transition-all ${
                    isOpen
                      ? "bg-white/[0.08] border-white/20 text-white shadow-lg shadow-white/5"
                      : "bg-black/40 border-white/[0.06] text-white/30 group-hover:border-white/20 group-hover:text-white/60 group-hover:bg-white/[0.04]"
                  }`}
                >
                  {app.icon}
                </div>
                <span
                  className={`text-[9px] sm:text-[10px] font-mono tracking-wider transition-all ${
                    isOpen
                      ? "text-white/60"
                      : "text-white/20 group-hover:text-white/40"
                  }`}
                >
                  {app.label}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Landing content */}
        {openWindows.length === 0 && <Landing onOpen={toggleWindow} />}

        <AnimatePresence>
          {openWindows.map((window) => (
            <FloatingWindow
              key={window.id}
              title={window.title}
              icon={window.icon}
              isMinimized={window.isMinimized}
              position={windowPositions[window.id] || { x: 0, y: 0 }}
              zIndex={windowZIndices[window.id] || 40}
              onMinimize={() => toggleMinimize(window.id)}
              onClose={() => closeWindow(window.id)}
              onSetActive={() => bringToFront(window.id)}
              onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
            >
              {window.component}
            </FloatingWindow>
          ))}
        </AnimatePresence>
      </div>

      <Taskbar
        windows={windows}
        onToggleWindow={toggleWindow}
        activeApp={activeApp}
      />
    </div>
  );
}
