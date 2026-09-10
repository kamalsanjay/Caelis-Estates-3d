"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";
import { Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Anthology", href: "#anthology" },
  { label: "Craft", href: "#craft" },
  { label: "Residencies", href: "#services" },
  { label: "Inquire", href: "#cta" },
];

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 80);

      const sections = ["hero", "manifesto", "anthology", "craft", "services", "cta"];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    const target = document.querySelector(href);
    if (!target) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.8 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }

    setIsMobileMenuOpen(false);
  }, []);

  return (
    <motion.nav
      ref={navRef}
      id="floating-nav"
      role="navigation"
      aria-label="Main navigation"
      initial={{ opacity: 0, y: -24 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -24,
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-5 left-1/2 -translate-x-1/2 z-[var(--z-nav)]",
        "pointer-events-auto select-none"
      )}
    >
      {/* ── Outer Liquid Splashes & Water Droplets (Reference Image Style) ── */}
      <div className="absolute -inset-x-8 -inset-y-5 pointer-events-none z-0 overflow-visible hidden md:block">
        {/* Organic Water Splash Backdrop with Caustic Cyan/Warm Reflections */}
        <svg
          className="absolute inset-0 w-full h-full filter drop-shadow-[0_8px_16px_rgba(78,160,220,0.25)] opacity-85"
          viewBox="0 0 720 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#AEE2FF" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#E2F4FF" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#FFF9EE" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#89CFF0" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="liquidRim" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#CDEEFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#5CAEE0" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          {/* Curving liquid wave hugging behind the pill */}
          <path
            d="M 60,50 C 90,15 150,12 210,30 C 270,48 330,22 410,18 C 500,12 560,35 630,22 C 670,15 700,45 680,68 C 650,92 590,82 520,74 C 440,65 370,88 280,82 C 200,76 130,88 80,72 C 55,62 45,55 60,50 Z"
            fill="url(#liquidGrad)"
            stroke="url(#liquidRim)"
            strokeWidth="1.2"
          />
        </svg>

        {/* Floating Glossy Water Droplets matching reference */}
        {/* Droplet 1: Top-Left floating bead */}
        <div 
          className="liquid-water-drop w-4 h-4 -top-3 left-10 animate-pulse" 
          style={{ animationDuration: "3s" }} 
        />
        {/* Droplet 2: Small upper-left micro-bead */}
        <div className="liquid-water-drop w-2 h-2 -top-1 left-24 opacity-80" />
        {/* Droplet 3: Top-Center bulging droplet */}
        <div 
          className="liquid-water-drop w-5 h-5 -top-4.5 left-1/2 -translate-x-12" 
          style={{ transform: "scale(1.05)" }}
        />
        {/* Droplet 4: Top-Right splash bead */}
        <div className="liquid-water-drop w-3.5 h-3.5 -top-2.5 right-20" />
        {/* Droplet 5: Far-Right tiny micro-droplet */}
        <div className="liquid-water-drop w-2.5 h-2.5 top-1 -right-3" />
        {/* Droplet 6: Bottom-Left puddle drop */}
        <div className="liquid-water-drop w-4 h-4 -bottom-3.5 left-28" />
        {/* Droplet 7: Bottom-Right dipping water tear */}
        <div 
          className="liquid-water-drop w-5 h-5 -bottom-4 right-32"
          style={{ borderRadius: "50% 50% 60% 40% / 50% 40% 60% 50%" }}
        />
        {/* Droplet 8: Bottom micro bead */}
        <div className="liquid-water-drop w-2 h-2 -bottom-2 right-14 opacity-75" />
      </div>

      {/* ── Main Desktop Pill Bar (Glossy Sandy Glassmorphism) ── */}
      <div
        className={cn(
          "hidden md:flex items-center gap-1.5",
          "px-3 py-1.5 rounded-full relative z-10",
          "glass-liquid-sandy"
        )}
      >
        {/* Specular Top-Rim Glint Line */}
        <div 
          className="absolute top-1 inset-x-6 h-[1px] rounded-full pointer-events-none opacity-80"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.95) 80%, transparent 100%)",
          }}
        />

        {/* ── Brand Monogram & Title ── */}
        <button
          onClick={() => handleNavClick("#hero")}
          className="group flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-white/40 transition-all duration-300 relative overflow-hidden"
          aria-label="Caelis Estates Home"
        >
          {/* Architectural Crest Icon */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-[#C8A96A]/20 via-white/80 to-[#C8A96A]/30 border border-[#C8A96A]/40 shadow-[0_2px_8px_rgba(200,169,106,0.3)]">
            <span className="font-editorial text-xs font-semibold text-[var(--ink)] tracking-tighter">
              CE
            </span>
          </div>

          <div className="flex flex-col text-left">
            <span className="font-display text-[11px] font-semibold text-[var(--ink)] tracking-[0.2em] uppercase leading-none group-hover:text-[var(--bronze)] transition-colors duration-300">
              Caelis
            </span>
            <span className="font-mono text-[7px] text-[var(--muted-ink)] tracking-[0.25em] uppercase leading-none mt-0.5 opacity-80">
              Estates
            </span>
          </div>
        </button>

        {/* Subtle Vertical Glass Divider */}
        <div className="w-[1px] h-4 bg-[var(--stone)]/30 mx-1" />

        {/* ── Navigation Links ── */}
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <button
                key={item.href}
                id={`nav-${sectionId}`}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-full",
                  "text-[10px] font-semibold uppercase tracking-[0.18em]",
                  "transition-all duration-300 ease-out",
                  isActive
                    ? "text-[var(--ink)]"
                    : "text-[var(--muted-ink)] hover:text-[var(--ink)]"
                )}
              >
                {/* Active Pill Glaze */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-white/90 to-[rgba(240,230,215,0.7)] border border-[rgba(200,169,106,0.35)] shadow-[0_2px_12px_rgba(200,169,106,0.2)]"
                    transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Quick Action / Invitation Pill ── */}
        <button
          onClick={() => handleNavClick("#cta")}
          className="ml-1.5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[var(--champagne)] to-[#B38F48] hover:from-[#d4b77b] hover:to-[var(--champagne)] text-white text-[9px] font-display font-medium tracking-[0.2em] uppercase shadow-[0_2px_10px_rgba(180,140,70,0.35)] transition-all duration-300 hover:scale-[1.03]"
        >
          <Sparkles className="w-3 h-3 text-white/90" />
          <span>Access</span>
        </button>
      </div>

      {/* ── Mobile Nav Bar (Glossy Sandy Glass) ── */}
      <div className="md:hidden flex items-center justify-between gap-3 px-4 py-2 rounded-full glass-liquid-sandy">
        {/* Brand */}
        <button
          onClick={() => handleNavClick("#hero")}
          className="flex items-center gap-2"
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--champagne)]/20 border border-[var(--champagne)]/40">
            <span className="font-editorial text-[10px] font-semibold text-[var(--ink)]">
              CE
            </span>
          </div>
          <span className="font-display text-[11px] font-semibold text-[var(--ink)] tracking-[0.18em] uppercase">
            Caelis Estates
          </span>
        </button>

        {/* Mobile Toggle Hamburger */}
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/60 border border-white/80"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <div className="flex flex-col gap-1">
            <motion.span
              className="w-3.5 h-[1.5px] bg-[var(--ink)] block rounded-full"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 2.5 : 0,
              }}
            />
            <motion.span
              className="w-3.5 h-[1.5px] bg-[var(--ink)] block rounded-full"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -2.5 : 0,
              }}
            />
          </div>
        </button>
      </div>

      {/* ── Mobile Menu Dropdown (Glossy Sandy Glass) ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "md:hidden absolute top-14 left-0 right-0",
              "p-3 rounded-2xl",
              "glass-liquid-sandy"
            )}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "w-full text-left px-4 py-2.5 rounded-xl",
                  "text-[10px] font-medium uppercase tracking-[0.16em]",
                  "transition-colors duration-200",
                  activeSection === item.href.replace("#", "")
                    ? "text-[var(--ink)] bg-white/60 font-semibold"
                    : "text-[var(--muted-ink)] hover:text-[var(--ink)] hover:bg-white/30"
                )}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#cta")}
              className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[var(--champagne)] to-[#B38F48] text-white text-[10px] font-display font-semibold tracking-[0.2em] uppercase text-center"
            >
              Request Access
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
