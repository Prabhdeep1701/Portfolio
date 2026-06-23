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
import NeuralBackground from "./NeuralBackground";
import { Search, Power, Settings, Maximize2, Menu, X, User, Code2, BarChart3, AtSign, type LucideIcon } from "lucide-react";

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

const appIcons: Record<string, LucideIcon> = {
  about: User,
  projects: Code2,
  skills: BarChart3,
  contact: AtSign,
};

const appMeta: Record<string, { name: string; hint: string }> = {
  about: { name: "whoami", hint: "Who I am & experience" },
  projects: { name: "projects", hint: "What I've built" },
  skills: { name: "skills", hint: "Tech & tooling" },
  contact: { name: "contact", hint: "Get in touch" },
};

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="w-full h-screen h-[100dvh] bg-dark-bg overflow-hidden flex flex-col relative">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-[60] bg-[linear-gradient(90deg,transparent,#8b7bff_20%,#6b5fd6_50%,#8b7bff_80%,transparent)] opacity-70" />

      {/* Neural flow-field background — behind everything, on every screen */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <NeuralBackground color="#8b7bff" particleCount={500} trailOpacity={0.12} speed={0.9} />
      </div>
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
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="sm:hidden -ml-1 p-1 text-white/60 hover:text-white transition-colors"
            aria-label="open menu"
          >
            <Menu size={16} strokeWidth={1.8} />
          </button>
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

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed left-0 top-0 bottom-0 z-[70] w-[78%] max-w-[300px] bg-[#080808] border-r border-white/[0.08] sm:hidden flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,#8b7bff,#6b5fd6,transparent)] opacity-70" />
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/[0.06]">
                <div>
                  <div className="font-sans font-bold text-white/90 tracking-wide">PRABHDEEP SINGH</div>
                  <div className="font-mono text-[9px] tracking-[0.3em] text-white/35 mt-1 uppercase">
                    System Menu
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-white/40 hover:text-white transition-colors"
                  aria-label="close menu"
                >
                  <X size={18} strokeWidth={1.8} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto premium-scrollbar p-3 space-y-1.5">
                {desktopApps.map((app) => {
                  const Icon = appIcons[app.id] ?? User;
                  const meta = appMeta[app.id];
                  const isOpen = windows.find((w) => w.id === app.id)?.isOpen;
                  return (
                    <button
                      key={app.id}
                      onClick={() => {
                        toggleWindow(app.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl border transition-colors text-left ${
                        isOpen
                          ? "bg-white/[0.06] border-white/15"
                          : "bg-white/[0.015] border-white/[0.05] hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-9 h-9 rounded-lg border ${
                          isOpen ? "border-accent/40 text-accent bg-accent/10" : "border-white/[0.08] text-white/55"
                        }`}
                      >
                        <Icon size={17} strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[13px] text-white/85">{meta.name}</span>
                        <span className="block text-[11px] text-white/35 truncate">{meta.hint}</span>
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="px-5 py-4 border-t border-white/[0.06] font-mono text-[9px] tracking-widest text-white/25 space-y-1">
                <div>SECURE_CONNECTION: <span className="text-white/45">ESTABLISHED</span></div>
                <div>SESSION_ID: <span className="text-white/45">9X-228-ALPHA</span></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
