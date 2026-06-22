"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, X } from "lucide-react";

interface WindowPosition {
  x: number;
  y: number;
}

interface FloatingWindowProps {
  title: string;
  icon: string;
  isMinimized: boolean;
  position: WindowPosition;
  zIndex: number;
  onMinimize: () => void;
  onClose: () => void;
  onSetActive: () => void;
  onPositionChange: (position: WindowPosition) => void;
  children: React.ReactNode;
}

export default function FloatingWindow({
  title,
  icon,
  isMinimized,
  position,
  zIndex,
  onMinimize,
  onClose,
  onSetActive,
  onPositionChange,
  children,
}: FloatingWindowProps) {
  const dragRef = useRef({ active: false, x: 0, y: 0, cx: position.x, cy: position.y });
  const posRef = useRef(position);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    posRef.current = position;
    dragRef.current.cx = position.x;
    dragRef.current.cy = position.y;
    const el = document.getElementById(`window-${title}`);
    if (el) {
      el.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
    setMounted(true);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, input, textarea, select, a")) return;
    if (isMobile) return;
    e.preventDefault();
    onSetActive();
    dragRef.current.active = true;
    dragRef.current.x = e.clientX;
    dragRef.current.y = e.clientY;
    const el = document.getElementById(`window-${title}`);
    if (el) el.style.transition = "none";
  }, [onSetActive, isMobile, title]);

  useEffect(() => {
    if (isMobile) return;
    const el = document.getElementById(`window-${title}`);
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      const nx = dragRef.current.cx + dx;
      const ny = dragRef.current.cy + dy;
      const cx = Math.max(-500, Math.min(nx, window.innerWidth - 80));
      const cy = Math.max(40, Math.min(ny, window.innerHeight - 60));
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      dragRef.current.cx = cx;
      dragRef.current.cy = cy;
      dragRef.current.x = e.clientX;
      dragRef.current.y = e.clientY;
    };

    const onUp = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      if (el) el.style.transition = "";
      onPositionChange({ x: dragRef.current.cx, y: dragRef.current.cy });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isMobile, title, onPositionChange]);

  const w = isMobile ? "100%" : isFullScreen ? "90vw" : "560px";
  const h = isMobile ? "100%" : isFullScreen ? "85vh" : "480px";

  return (
    <div
      id={`window-${title}`}
      className={`absolute ${isMobile ? "inset-0" : "rounded-2xl"} overflow-hidden select-none flex flex-col`}
      style={{
        width: isMinimized ? "auto" : w,
        height: isMinimized ? "auto" : h,
        zIndex,
        background: "#060606",
        border: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset",
        touchAction: isMobile ? "auto" : "none",
        opacity: mounted ? 1 : 0,
      }}
    >
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            className="flex flex-col h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 240 }}
          >
            {/* Title bar */}
            <div
              className={`flex-shrink-0 px-3 sm:px-4 py-2.5 border-b border-white/[0.04] flex items-center justify-between ${
                isMobile ? "" : "cursor-grab active:cursor-grabbing"
              }`}
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)" }}
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex gap-1.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="w-[10px] h-[10px] rounded-full bg-white/[0.08] hover:bg-red-400/70 transition-colors"
                    title="Close"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                    className="w-[10px] h-[10px] rounded-full bg-white/[0.08] hover:bg-yellow-400/70 transition-colors"
                    title="Minimize"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsFullScreen(!isFullScreen); }}
                    className="w-[10px] h-[10px] rounded-full bg-white/[0.08] hover:bg-green-400/70 transition-colors hidden sm:block"
                    title="Maximize"
                  />
                </div>
                <span className="text-[11px] text-white/40 font-mono truncate ml-1.5 tracking-wide">
                  {icon} {title}
                </span>
              </div>
              <div className="flex gap-1 sm:hidden">
                <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="p-1 text-white/30 hover:text-white">
                  <Minus size={11} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-1 text-white/30 hover:text-white">
                  <X size={11} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto premium-scrollbar p-3 sm:p-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
