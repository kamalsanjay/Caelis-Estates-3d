"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";

export default function ManifestoSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const phrases = content.querySelectorAll(".manifesto-phrase");

    const ctx = gsap.context(() => {
      // Pin section smoothly while scrubbing the progressive revelation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      phrases.forEach((phrase, idx) => {
        tl.fromTo(
          phrase,
          {
            opacity: 0.15,
            y: 20,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          idx * 0.8
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative w-full h-screen flex flex-col justify-between px-8 md:px-24 bg-[var(--surface)] overflow-hidden select-none"
      aria-label="Manifesto"
    >
      {/* Top Header Bar with comfortable clearance from floating nav */}
      <div className="pt-24 md:pt-28 flex justify-between items-center z-10 border-b border-[var(--stone)]/20 pb-4">
        <SectionLabel number="01" text="Manifesto" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--stone)] hidden md:inline">
          Core Thesis • Architectural Genesis
        </span>
      </div>

      {/* Subtle Background Watermark Crest */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none z-0">
        <span className="font-editorial text-[40vw] font-light text-[var(--ink)] leading-none">
          C
        </span>
      </div>

      {/* Main Editorial Typographic Composition */}
      <div 
        ref={contentRef}
        className="max-w-5xl mx-auto flex flex-col justify-center my-auto gap-6 md:gap-9 z-10 py-6"
      >
        {/* Phrase 1: The Opening Premise */}
        <div className="manifesto-phrase will-change-[transform,opacity]">
          <p className="font-display text-[clamp(1.4rem,2.8vw,2.4rem)] text-[var(--ink)] font-light tracking-[-0.02em] leading-snug">
            Some structures are built to withstand the elements.
          </p>
        </div>

        {/* Phrase 2: The Core Transcendent Tenet */}
        <div className="manifesto-phrase will-change-[transform,opacity]">
          <h2 className="font-editorial italic text-[clamp(2.4rem,5.5vw,5rem)] text-[var(--champagne)] font-normal leading-[1.02] tracking-tight">
            Others are summoned to transcend them.
          </h2>
        </div>

        {/* Phrase 3: The Brand Statement */}
        <div className="manifesto-phrase will-change-[transform,opacity]">
          <p className="font-display text-[clamp(1.3rem,2.5vw,2.2rem)] text-[var(--ink)] font-light leading-snug tracking-tight">
            <span className="font-medium tracking-[0.06em] text-[var(--bronze)] uppercase border-b border-[var(--champagne)]/40 pb-0.5 mr-2">
              CAELIS ESTATES
            </span>{" "}
            shapes impossible private worlds suspended beyond expectation,
          </p>
        </div>

        {/* Phrase 4: The Materiality & Poetry */}
        <div className="manifesto-phrase will-change-[transform,opacity]">
          <p className="font-editorial italic text-[clamp(1.35rem,2.7vw,2.3rem)] text-[var(--muted-ink)] leading-relaxed">
            crafted in raw <span className="text-[var(--ink)] not-italic font-display text-[0.88em] tracking-wide uppercase px-1.5 py-0.5 rounded bg-[var(--stone)]/15 border border-[var(--stone)]/30">travertine</span>, forged <span className="text-[var(--bronze)] not-italic font-display text-[0.88em] tracking-wide uppercase px-1.5 py-0.5 rounded bg-[var(--champagne)]/10 border border-[var(--champagne)]/30">bronze</span>, and absolute silence.
          </p>
        </div>
      </div>

      {/* Bottom Footer Metadata Line */}
      <div className="pb-8 flex justify-between items-center text-[9px] font-mono tracking-[0.25em] text-[var(--stone)] uppercase z-10 border-t border-[var(--stone)]/15 pt-3">
        <span>Scroll to Absorb</span>
        <span>01 / 07 Statement</span>
      </div>
    </section>
  );
}
