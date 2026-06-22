"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const bootLogs = [
  "GNU/Linux 6.8.0 kernel loading...",
  "Initializing CPU cores [████████████████████] 100%",
  "Memory initialization complete: 16GB DDR5",
  "Loading kernel modules...",
  "  → pcie_aspm.ko loaded",
  "  → i915.ko loaded",
  "  → nvme.ko loaded",
  "  → intel_pmc_core.ko loaded",
  "Mounting filesystems...",
  "  → /dev/nvme0n1p1 → /boot",
  "  → /dev/nvme0n1p2 → /",
  "  → /dev/nvme0n1p3 → /home",
  "  → /dev/nvme0n1p4 → /var",
  "Initializing network interface eth0...",
  "  → IPv4: 192.168.1.100",
  "  → IPv6: fe80::1",
  "  → MTU: 1500",
  "Starting systemd services...",
  "  ✓ systemd-timesyncd.service started",
  "  ✓ systemd-logind.service started",
  "  ✓ sshd.service started [port 22]",
  "  ✓ cron.service started",
  "  ✓ docker.service started",
  "Running security scan...",
  "  ✓ Firewall initialized (UFW)",
  "  ✓ No suspicious processes detected",
  "  ✓ Secure boot verified",
  "  ✓ SELinux status: enforcing",
  "Portfolio environment initialized successfully.",
];

export default function BootSequence() {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [username] = useState("root");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (displayedLogs.length < bootLogs.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, bootLogs[prev.length]]);
      }, 60);
      return () => clearTimeout(timer);
    } else {
      const loginTimer = setTimeout(() => {
        setShowLogin(true);
      }, 300);
      return () => clearTimeout(loginTimer);
    }
  }, [displayedLogs]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLogs]);

  useEffect(() => {
    if (showLogin && !accessGranted && loginAttempts === 0) {
      let dotCount = 0;
      const interval = setInterval(() => {
        if (dotCount < 8) {
          setPasswordInput((prev) => prev + "●");
          dotCount++;
        } else {
          clearInterval(interval);
          setTimeout(() => setLoginAttempts(1), 200);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showLogin, loginAttempts, accessGranted]);

  const handleLoginSuccess = () => {
    setAccessGranted(true);
  };

  return (
    <div className="w-full h-screen bg-dark-bg flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      <motion.div
        className="w-full h-full flex flex-col relative z-10 p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex-1 flex flex-col bg-black border border-white/[0.04] rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-[#080808] px-3 sm:px-4 py-2.5 border-b border-white/[0.04] flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/15" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
            </div>
            <span className="text-xs text-foreground-dim ml-2 font-mono tracking-wide">root@system: ~</span>
          </div>

          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-3 sm:p-5 text-xs sm:text-sm font-mono text-foreground/80 space-y-1 premium-scrollbar"
          >
            {displayedLogs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                className="whitespace-pre-wrap break-words leading-relaxed"
              >
                <span className="text-white/20">→</span> {log}
              </motion.div>
            ))}

            {showLogin && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 sm:mt-8 space-y-4"
              >
                <motion.div className="text-center">
                  <motion.div
                    className="text-white/60 text-base sm:text-lg font-bold tracking-widest"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.1)",
                        "0 0 20px rgba(255,255,255,0.2)",
                        "0 0 10px rgba(255,255,255,0.1)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    UNAUTHORIZED ACCESS PROHIBITED
                  </motion.div>
                </motion.div>

                {!accessGranted && (
                  <div className="flex gap-2 text-foreground/80">
                    <span>root@system:~</span>
                    <span className="text-white/30"># login</span>
                  </div>
                )}

                {loginAttempts > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2"
                  >
                    <span className="text-white/40">username:</span>
                    <span className="text-foreground">{username}</span>
                  </motion.div>
                )}

                {loginAttempts > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2"
                  >
                    <span className="text-white/40">password:</span>
                    <span className="text-foreground/80 italic">
                      {passwordInput}
                      {!accessGranted && loginAttempts === 1 && (
                        <span className="animate-pulse ml-1">_</span>
                      )}
                    </span>
                  </motion.div>
                )}

                {accessGranted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring" }}
                    className="space-y-3 mt-4 text-center"
                  >
                    <div className="text-white font-bold text-base sm:text-lg tracking-wider">
                      ACCESS GRANTED
                    </div>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-white/40 text-xs sm:text-sm"
                    >
                      launching desktop environment...
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {loginAttempts > 0 && !accessGranted && (
          <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 z-20">
            <motion.button
              onClick={handleLoginSuccess}
              className="px-5 sm:px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-foreground-dim hover:text-foreground font-mono text-xs sm:text-sm transition-all tracking-wider"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              [ ENTER ]
            </motion.button>
          </div>
        )}
      </motion.div>

      {accessGranted && (
        <motion.div
          className="absolute inset-0 bg-black z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
      )}
    </div>
  );
}
