"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import { Loader2 } from "lucide-react";

// Load ThreeJS component dynamically so it doesn't block SSR
const ThreeArchitecturalFragment = dynamic(
  () => import("./ThreeArchitecturalFragment"),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--surface)] text-[var(--muted-ink)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--champagne)] mb-3" />
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase">
          Initializing WebGL Viewer...
        </span>
      </div>
    )
  }
);

const CRAFT_STEPS = [
  {
    num: "01",
    label: "Structure",
    title: "Impossible Geometry",
    desc: "A singular monolithic gesture cantilevered over the abyss, challenging standard load distributions and balancing on a structural pin.",
  },
  {
    num: "02",
    label: "Scale",
    title: "Proportion Made Emotional",
    desc: "Spaces designed not to shelter, but to elevate. Ceiling spans reaching toward double-height glazing, dissolving architectural barriers.",
  },
  {
    num: "03",
    label: "Form",
    title: "Travertine and Air",
    desc: "Rough-hewn stone meets hyper-polished glass. The material contrast highlights the void, turning silence into the primary spatial driver.",
  },
  {
    num: "04",
    label: "Precision",
    title: "Caelis Tolerances",
    desc: "Joints and junctions aligned to sub-millimeter precision, concealing structural connections to maintain the illusion of weightlessness.",
  },
];

export default function CraftSection() {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const cards = textContainerRef.current?.querySelectorAll(".craft-step-card");
    if (!trigger || !cards || !cards.length) return;

    const ctx = gsap.context(() => {
      // Pin the section while scrolling
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Animate the cards in sequence
      cards.forEach((card, idx) => {
        if (idx === 0) {
          // First card starts visible, then fades out
          pinTl.to(card, { opacity: 0, y: -40, duration: 0.5 }, 0.2);
        } else {
          // Middle cards fade in and then out
          pinTl.fromTo(
            card,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.5 },
            idx * 0.8 - 0.3
          );
          
          if (idx < cards.length - 1) {
            pinTl.to(card, { opacity: 0, y: -40, duration: 0.5 }, idx * 0.8 + 0.3);
          }
        }
      });
    }, trigger);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} id="craft" className="relative w-full overflow-hidden bg-[var(--surface)] border-b border-[var(--stone)]/20">
      <section ref={containerRef} className="h-screen w-full flex flex-col md:flex-row relative">
        
        {/* Left Side: Editorial Typography Sequence */}
        <div className="w-full md:w-2/5 h-[50vh] md:h-full flex flex-col justify-between p-8 md:p-24 z-10 bg-[var(--surface)]/90 backdrop-blur-sm md:bg-transparent">
          <SectionLabel number="03" text="Craft" />
          
          {/* Steps container */}
          <div ref={textContainerRef} className="relative h-[25vh] md:h-[40vh] flex items-center">
            {CRAFT_STEPS.map((step, idx) => (
              <div
                key={step.num}
                className="craft-step-card absolute inset-x-0 flex flex-col gap-4 md:gap-6 will-change-[transform,opacity]"
                style={{ opacity: idx === 0 ? 1 : 0 }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--champagne)] font-semibold">
                    {step.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-ink)] font-display">
                    {step.label}
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-4xl font-light text-[var(--ink)] tracking-tight">
                  {step.title}
                </h2>
                <p className="font-editorial italic text-sm md:text-base leading-relaxed text-[var(--muted-ink)] max-w-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="font-mono text-[9px] tracking-[0.25em] text-[var(--stone)] uppercase">
            3D Fragment — Click & Drag to Explore
          </div>
        </div>

        {/* Right Side: Pinned 3D Viewport */}
        <div className="w-full md:w-3/5 h-[50vh] md:h-full relative overflow-hidden bg-[#F8F3EA]">
          <ThreeArchitecturalFragment />
          {/* Subtle warm glass edge blend from left panel */}
          <div className="absolute inset-y-0 left-0 w-16 pointer-events-none bg-gradient-to-r from-[var(--surface)] to-transparent hidden md:block z-10" />
          
          {/* Interactive Floating Badge */}
          <div className="absolute bottom-8 right-8 z-10 pointer-events-none hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-liquid-sandy shadow-[0_4px_20px_rgba(23,19,15,0.06)] border border-white/80">
            <span className="w-2 h-2 rounded-full bg-[var(--champagne)] animate-ping" />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--ink)] font-medium">
              3D Monolith • Drag to Rotate • Scroll to Zoom
            </span>
          </div>
        </div>

      </section>
    </div>
  );
}
