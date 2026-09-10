"use client";

import { useEffect, useRef, useState } from "react";
import SectionLabel from "./ui/SectionLabel";

export default function PrivateAccessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const coordsRef = useRef({ x: 0, y: 0 });
  const targetCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetCoords.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Smooth lerp loop directly on DOM node — zero React re-renders!
    const updateCoords = () => {
      const dx = targetCoords.current.x - coordsRef.current.x;
      const dy = targetCoords.current.y - coordsRef.current.y;
      
      coordsRef.current.x += dx * 0.18;
      coordsRef.current.y += dy * 0.18;

      const x = coordsRef.current.x;
      const y = coordsRef.current.y;

      if (maskLayerRef.current) {
        const maskVal = `radial-gradient(circle 240px at ${x}px ${y}px, black 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.0) 100%)`;
        maskLayerRef.current.style.webkitMaskImage = maskVal;
        maskLayerRef.current.style.maskImage = maskVal;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 48}px, ${y - 48}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(updateCoords);
    };

    el.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(updateCoords);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="private-access"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[110vh] flex flex-col justify-between py-12 px-8 md:px-24 bg-[#0d0a08] overflow-hidden select-none cursor-crosshair border-b border-[var(--stone)]/10"
      aria-label="Private Access Gate"
    >
      {/* Editorial Label */}
      <div className="z-10">
        <SectionLabel number="06" text="Private Access" className="!text-[var(--stone)]" />
      </div>

      {/* Dark Cover Layout - Instruction */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none z-10">
        <div className="max-w-2xl flex flex-col items-center gap-6">
          <p className="text-[var(--champagne)] font-mono text-[9px] tracking-[0.3em] uppercase">
            Restricted Portfolio
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-[var(--background)] leading-tight uppercase tracking-tight">
            Off-Market <br />
            <span className="font-editorial italic text-[var(--champagne)] lowercase">invisible</span> Estates
          </h2>
          <p className="font-editorial italic text-sm md:text-base text-white/50 max-w-md leading-relaxed">
            Move your cursor across the darkness to illuminate our highly confidential, unlisted architectural estates.
          </p>
        </div>
      </div>

      {/* Background Mansion Image (fully dark by default) */}
      <div 
        className="absolute inset-0 z-0 bg-[#0d0a08]"
        style={{
          backgroundImage: "url('/images/private-mansion.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.08) contrast(1.1)",
        }}
      />

      {/* Flashlight revealed highlight layer — zero React re-render, direct DOM updates */}
      <div
        ref={maskLayerRef}
        className="absolute inset-0 z-0 transition-opacity duration-500 pointer-events-none will-change-[mask-image]"
        style={{
          backgroundImage: "url('/images/private-mansion.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Subtle border outline for spotlight cursor */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-24 h-24 border border-[var(--champagne)]/35 rounded-full pointer-events-none z-20 mix-blend-screen transition-opacity duration-300 will-change-transform"
        style={{
          boxShadow: "0 0 24px rgba(200, 169, 106, 0.25)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Footer copyright */}
      <div className="z-10 flex justify-between text-[10px] font-mono tracking-[0.25em] text-white/20 uppercase">
        <span>Sub-surface Estate Registry</span>
        <span>Credentials Required</span>
      </div>
    </section>
  );
}
