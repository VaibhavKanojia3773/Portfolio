"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "portfolio-intro-played";

const lines = [
  { prompt: "~$", command: "Who am I", delay: 380 },
  {
    prompt: "",
    command: "vaibhav_kanojia · DTU '27 · CGPA 8.5",
    delay: 320,
    isOutput: true,
  },
  { prompt: "~$", command: "cat ./signal", delay: 320 },
  {
    prompt: "",
    command: "1 paper (IJCNLP–AACL '25) · 4 hackathon wins",
    delay: 280,
    isOutput: true,
  },
  {
    prompt: "",
    command: "top 1% amazon ml · top 2% wunder quant",
    delay: 320,
    isOutput: true,
  },
  { prompt: "~$", command: "./portfolio --launch", delay: 400 },
  {
    prompt: "",
    command: "▸ doors open in 3… 2… 1…",
    delay: 500,
    isOutput: true,
  },
];

export default function TerminalIntro() {
  // Skip the intro if it has already played this session.
  const [shouldPlay, setShouldPlay] = useState<boolean | null>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);

  // Decide whether to play on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const played = sessionStorage.getItem(SESSION_KEY);
      if (played === "1") {
        setShouldPlay(false);
        setIsDone(true);
      } else {
        setShouldPlay(true);
      }
    } catch {
      setShouldPlay(true);
    }
  }, []);

  // Persist the played flag on completion.
  useEffect(() => {
    if (isDone && typeof window !== "undefined") {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  }, [isDone]);

  // Skip hint after 1.5s.
  useEffect(() => {
    if (!shouldPlay || isDone) return;
    const t = setTimeout(() => setShowSkipHint(true), 1500);
    return () => clearTimeout(t);
  }, [shouldPlay, isDone]);

  // Click/key to skip.
  const handleSkip = useCallback(() => setIsDone(true), []);
  useEffect(() => {
    if (!shouldPlay || isDone) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shouldPlay, isDone, handleSkip]);

  // Typewriter loop.
  useEffect(() => {
    if (!shouldPlay || isDone) return;
    if (visibleLines >= lines.length) {
      const timer = setTimeout(() => setIsDone(true), 500);
      return () => clearTimeout(timer);
    }

    const line = lines[visibleLines];
    const fullText = line.prompt
      ? `${line.prompt} ${line.command}`
      : line.command;

    if (line.isOutput) {
      const timer = setTimeout(() => {
        setCurrentText("");
        setVisibleLines((v) => v + 1);
      }, line.delay);
      return () => clearTimeout(timer);
    }

    let charIndex = 0;
    setIsTyping(true);
    const typeTimer = setInterval(() => {
      charIndex++;
      setCurrentText(fullText.slice(0, charIndex));
      if (charIndex >= fullText.length) {
        clearInterval(typeTimer);
        setIsTyping(false);
        setTimeout(() => {
          setCurrentText("");
          setVisibleLines((v) => v + 1);
        }, line.delay);
      }
    }, 32);

    return () => clearInterval(typeTimer);
  }, [shouldPlay, visibleLines, isDone]);

  // Avoid flicker before the session check resolves.
  if (shouldPlay === null) return null;

  return (
    <AnimatePresence>
      {!isDone && shouldPlay && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712] cursor-pointer"
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
          }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          onClick={handleSkip}
        >
          {/* radial glow behind window */}
          <div
            className="absolute inset-0 opacity-40"
            aria-hidden
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(34,211,238,0.18), transparent 55%)",
            }}
          />

          <div className="w-full max-w-lg mx-6 relative">
            <div className="rounded-xl border border-slate-700/60 bg-slate-900/95 shadow-[0_30px_120px_rgba(34,211,238,0.15)] overflow-hidden backdrop-blur">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/40">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs font-mono text-slate-500">
                  vaibhav@portfolio: ~
                </span>
              </div>

              {/* Body */}
              <div className="p-5 font-mono text-sm leading-relaxed min-h-[220px]">
                {lines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className="flex gap-2">
                    {line.prompt && (
                      <span className="text-cyan-400 shrink-0">
                        {line.prompt}
                      </span>
                    )}
                    <span
                      className={
                        line.isOutput
                          ? "text-slate-400"
                          : "text-slate-200"
                      }
                    >
                      {line.command}
                    </span>
                  </div>
                ))}

                {visibleLines < lines.length && (
                  <div className="flex gap-2">
                    {lines[visibleLines].prompt &&
                      !lines[visibleLines].isOutput && (
                        <span className="text-cyan-400 shrink-0">
                          {lines[visibleLines].prompt}
                        </span>
                      )}
                    {lines[visibleLines].isOutput ? (
                      <span className="text-slate-400">
                        {lines[visibleLines].command}
                      </span>
                    ) : (
                      <span className="text-slate-200">
                        {currentText}
                        {isTyping && (
                          <span className="text-cyan-400 animate-blink">
                            █
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Skip hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showSkipHint ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-5 text-center text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500"
              aria-hidden
            >
              press any key · or click to skip
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
