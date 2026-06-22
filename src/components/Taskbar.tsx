"use client";

import { motion } from "framer-motion";

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

export default function Taskbar({ windows, onToggleWindow, activeApp }: TaskbarProps) {
  return (
    <motion.div
      className="h-16 sm:h-20 flex justify-center items-end sm:items-center pb-2 sm:pb-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div className="bg-[#080808]/95 backdrop-blur-xl border border-white/[0.04] px-2 sm:px-3 py-2 rounded-2xl flex gap-1 sm:gap-1.5 items-center mx-2 shadow-2xl">
        {windows.map((window) => (
          <motion.button
            key={window.id}
            onClick={() => onToggleWindow(window.id)}
            className={`relative flex flex-col items-center gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all ${
              window.isOpen
                ? "bg-white/[0.07]"
                : "hover:bg-white/[0.03]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className={`text-base sm:text-lg font-mono ${
              window.isOpen ? "text-foreground" : "text-foreground-dim/50"
            }`}>
              {window.icon}
            </span>
            <span className={`text-[9px] sm:text-[10px] font-mono tracking-wider ${
              window.isOpen ? "text-foreground-dim" : "text-foreground-dim/30"
            }`}>
              {window.title}
            </span>
            {window.isOpen && (
              <motion.div
                className={`absolute -bottom-0.5 w-1 h-1 rounded-full ${
                  activeApp === window.id ? "bg-white" : "bg-white/20"
                }`}
                layoutId="activeDot"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}
