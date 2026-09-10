"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "./ui/SectionLabel";
import MagneticButton from "./ui/MagneticButton";
import { X, ArrowRight, Loader2 } from "lucide-react";

export default function FinalCTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Floating ambient dust particles background with viewport intersection optimization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isIntersecting = true;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; opacity: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      const count = Math.min(Math.floor(window.innerWidth / 20), 60);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: -Math.random() * 0.35 - 0.1, // Drifting upwards
          r: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.35 + 0.1,
        });
      }
    };

    const animate = () => {
      if (!isIntersecting) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#C8A96A"; // Warm champagne color

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Only render particles when section is actually on screen
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    });

    const sec = document.getElementById("cta");
    if (sec) observer.observe(sec);

    window.addEventListener("resize", resize, { passive: true });
    resize();
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <section
      id="cta"
      className="relative w-full h-[95vh] flex flex-col justify-between py-12 px-8 md:px-24 bg-[#17130F] overflow-hidden"
      aria-label="Invitation consultation"
    >
      {/* Dynamic drifting canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Top section label */}
      <div className="z-10">
        <SectionLabel number="07" text="Initiation" className="!text-[var(--stone)]" />
      </div>

      {/* Core CTA */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 z-10 my-auto">
        <h2 className="font-display text-hero text-[var(--surface)] uppercase font-light leading-[0.8] tracking-tight">
          Summon <br />
          <span className="font-editorial italic text-[var(--champagne)] lowercase">your</span> World
        </h2>
        <p className="font-editorial italic text-lg md:text-xl text-[var(--stone)] max-w-xl leading-relaxed">
          Some structures are built. Others are summoned. Request a private credentials interview to enter the unlisted registry.
        </p>

        {/* Premium Magnetic CTA Button */}
        <MagneticButton
          onClick={() => setIsOpen(true)}
          className="mt-6 px-10 py-5 rounded-full border border-[var(--champagne)]/30 hover:border-[var(--champagne)] bg-transparent hover:bg-[var(--champagne)]/5 text-[var(--champagne)] text-xs font-display tracking-[0.25em] uppercase transition-colors duration-500 flex items-center gap-3 select-none"
        >
          Request Invitation <ArrowRight className="w-4 h-4" />
        </MagneticButton>
      </div>

      {/* Footer metadata */}
      <div className="z-10 flex justify-between text-[10px] font-mono tracking-[0.25em] text-[var(--stone)]/30 uppercase">
        <span>Caelis Guild Advisory</span>
        <span>Stardust Collection © 2026</span>
      </div>

      {/* Consultation Glassmorphic Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl p-8 md:p-12 rounded-sm bg-[#1e1914] border border-[var(--champagne)]/20 shadow-2xl overflow-hidden"
            >
              {/* Decorative light reflection gradient */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--champagne)]/45 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => { setIsOpen(false); setIsSuccess(false); }}
                className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/10 hover:border-white/20 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Success State */}
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
                  <span className="font-mono text-[10px] text-[var(--champagne)] tracking-[0.3em] uppercase">
                    Verification Pending
                  </span>
                  <h3 className="font-display text-2xl font-light text-white uppercase tracking-tight">
                    Credentials Submitted
                  </h3>
                  <p className="font-editorial italic text-white/60 leading-relaxed text-sm max-w-sm">
                    A verification officer from our operations guild will contact you through encrypted channels within 72 hours.
                  </p>
                  <button
                    onClick={() => { setIsOpen(false); setIsSuccess(false); }}
                    className="mt-6 font-mono text-[10px] text-[var(--stone)] hover:text-white uppercase tracking-[0.2em] underline underline-offset-4"
                  >
                    Return to Anthology
                  </button>
                </div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-[var(--champagne)] tracking-[0.3em] uppercase">
                      Private Registry Initiation
                    </span>
                    <h3 className="font-display text-2xl font-light text-white uppercase tracking-tight">
                      Consultation Registry
                    </h3>
                  </div>

                  <div className="flex flex-col gap-5 mt-4">
                    {/* Inputs */}
                    <div className="flex flex-col gap-1 border-b border-white/10 focus-within:border-[var(--champagne)]/50 transition-colors duration-500 py-1">
                      <label className="font-mono text-[8px] tracking-widest text-[var(--stone)]/60 uppercase">
                        Legal Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="bg-transparent border-0 outline-none text-white text-sm placeholder-white/20 py-1"
                      />
                    </div>

                    <div className="flex flex-col gap-1 border-b border-white/10 focus-within:border-[var(--champagne)]/50 transition-colors duration-500 py-1">
                      <label className="font-mono text-[8px] tracking-widest text-[var(--stone)]/60 uppercase">
                        Contact Coordinates (Email)
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="coordinates@domain.com"
                        className="bg-transparent border-0 outline-none text-white text-sm placeholder-white/20 py-1"
                      />
                    </div>

                    <div className="flex flex-col gap-1 border-b border-white/10 focus-within:border-[var(--champagne)]/50 transition-colors duration-500 py-1">
                      <label className="font-mono text-[8px] tracking-widest text-[var(--stone)]/60 uppercase">
                        Target Location Profile
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Mediterranean cantilevers / Kyoto valleys"
                        className="bg-transparent border-0 outline-none text-white text-sm placeholder-white/20 py-1"
                      />
                    </div>

                    <div className="flex flex-col gap-1 border-b border-white/10 focus-within:border-[var(--champagne)]/50 transition-colors duration-500 py-1">
                      <label className="font-mono text-[8px] tracking-widest text-[var(--stone)]/60 uppercase">
                        Capital Capacity Range
                      </label>
                      <select
                        required
                        className="bg-transparent border-0 outline-none text-white/80 text-sm py-1 cursor-pointer"
                        style={{ colorScheme: "dark" }}
                      >
                        <option value="tier-1">$20M – $50M USD</option>
                        <option value="tier-2">$50M – $100M USD</option>
                        <option value="tier-3">$100M+ USD</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 py-4 bg-[var(--champagne)] hover:bg-[var(--bronze)] text-black hover:text-white text-[11px] font-display font-semibold tracking-[0.2em] uppercase transition-colors duration-500 flex items-center justify-center gap-2 select-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Verifying Credentials...
                      </>
                    ) : (
                      <>
                        Initiate Interview <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
