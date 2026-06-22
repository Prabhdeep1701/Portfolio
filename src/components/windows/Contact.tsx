"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Send, X } from "lucide-react";

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const contactInfo = [
    { icon: Mail, label: "email", value: "prabhdeep1701@gmail.com", href: "mailto:prabhdeep1701@gmail.com" },
    { icon: Phone, label: "phone", value: "+91 94118 64565", href: "tel:+919411864565" },
    { icon: Github, label: "github", value: "github.com/Prabhdeep1701", href: "https://github.com/Prabhdeep1701" },
    { icon: Linkedin, label: "linkedin", value: "linkedin.com/in/prabhdeep-singh", href: "https://linkedin.com/in/prabhdeep-singh" },
  ];

  const handleSendMessage = () => {
    console.log("Message:", message);
    setMessage("");
    setShowForm(false);
  };

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-foreground-dim/60 mb-3 text-xs sm:text-sm font-mono">$ contact --info</div>

      <div className="space-y-2">
        {contactInfo.map((contact) => {
          const IconComponent = contact.icon;
          return (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors group"
              whileHover={{ x: 3 }}
            >
              <IconComponent size={14} className="text-foreground-dim/50 group-hover:text-foreground transition-colors" strokeWidth={1.5} />
              <span className="text-[10px] sm:text-xs text-foreground-dim/50 min-w-14 sm:min-w-16">{contact.label}:</span>
              <span className="text-[10px] sm:text-xs text-foreground-dim/70 group-hover:text-foreground transition-colors truncate">
                {contact.value}
              </span>
            </motion.a>
          );
        })}
      </div>

      <div className="border-t border-white/[0.06]" />

      <div className="space-y-3">
        <div className="text-foreground-dim/60 text-[10px] sm:text-xs font-mono">$ send message</div>

        <AnimatePresence>
          {!showForm ? (
            <motion.button
              key="compose-btn"
              onClick={() => setShowForm(true)}
              className="w-full px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] rounded-xl text-[10px] sm:text-xs text-foreground-dim hover:text-foreground transition-all font-mono"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              [ Compose Message ]
            </motion.button>
          ) : (
            <motion.div
              key="form"
              className="space-y-2.5 bg-white/[0.02] border border-white/[0.08] rounded-xl p-3 sm:p-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <textarea
                autoFocus
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-20 sm:h-24 bg-black/30 text-foreground text-[10px] sm:text-xs p-2.5 border border-white/[0.06] rounded-lg focus:outline-none focus:border-white/[0.15] focus:ring-0 resize-none font-mono placeholder-foreground-dim/20 premium-scrollbar"
              />
              <div className="flex gap-2 justify-end">
                <motion.button
                  onClick={() => setShowForm(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] rounded-lg text-[10px] sm:text-xs text-foreground-dim hover:text-foreground transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <X size={11} strokeWidth={1.5} />
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 rounded-lg text-[10px] sm:text-xs text-foreground/70 hover:text-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={11} strokeWidth={1.5} />
                  Send
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-white/[0.06] pt-4 text-[10px] sm:text-xs text-foreground-dim/30 space-y-1 font-mono">
        <div><span className="text-foreground-dim/50">&gt;</span> Response time: 24-48 hours</div>
        <div><span className="text-foreground-dim/50">&gt;</span> Prefer async communication</div>
        <div><span className="text-foreground-dim/50">&gt;</span> Available for opportunities</div>
      </div>
    </motion.div>
  );
}
