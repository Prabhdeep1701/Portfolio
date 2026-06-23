"use client";

import { motion } from "framer-motion";
import { User, Code2, BarChart3, AtSign, type LucideIcon } from "lucide-react";

interface Window {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
}

interface TaskbarProps {
  windows: Window[];
  onToggleWindow: (id: string) => void;
  activeApp: string | null;
}

const dockIcons: Record<string, LucideIcon> = {
  about: User,
  projects: Code2,
  skills: BarChart3,
  contact: AtSign,
};

export default function Taskbar({ windows, onToggleWindow, activeApp }: TaskbarProps) {
  return (
    <motion.div
      className="h-16 sm:h-20 flex justify-center items-center pb-2 sm:pb-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/[0.06] px-2.5 py-2 rounded-2xl flex gap-1.5 items-center shadow-2xl">
        {windows.map((window) => {
          const Icon = dockIcons[window.id] ?? User;
          const active = window.isOpen;
          return (
            <motion.button
              key={window.id}
              onClick={() => onToggleWindow(window.id)}
              title={window.title}
              className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl transition-colors ${
                active
                  ? "bg-white text-black shadow-lg shadow-white/10"
                  : "text-white/45 hover:text-white/80 hover:bg-white/[0.05]"
              }`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={18} strokeWidth={1.8} />
              {active && (
                <motion.div
                  layoutId="activeDot"
                  className={`absolute -bottom-1 w-1 h-1 rounded-full ${
                    activeApp === window.id ? "bg-accent" : "bg-white/30"
                  }`}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
