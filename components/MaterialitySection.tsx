"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import Image from "next/image";

const MATERIALS = [
  {
    name: "Travertine",
    spec: "Roman Lapis Tiburtinus — Vein Cut",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Bronze",
    spec: "Hammered Patinated 92% CU Alloy",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "White Oak",
    spec: "Shou Sugi Ban — Triple Fired",
    image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=600&q=80",
  },
];

export default function MaterialitySection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".material-card");
    if (!cards) return;

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="materiality"
      className="relative w-full py-24 md:py-40 px-8 md:px-24 bg-[var(--surface)] border-b border-[var(--stone)]/20"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <SectionLabel number="11" text="Materiality" />

        <div className="flex flex-col md:flex-row gap-8">
          {MATERIALS.map((mat, idx) => (
            <div
              key={idx}
              className="material-card flex-1 flex flex-col gap-4 opacity-0"
            >
              <div className="relative w-full h-80 overflow-hidden bg-[#17130f]">
                <Image
                  src={mat.image}
                  alt={mat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover filter grayscale-[20%]"
                />
              </div>
              <div className="flex flex-col gap-1 border-t border-[var(--stone)]/20 pt-4">
                <h3 className="font-display text-xl font-light text-[var(--ink)] tracking-tight">
                  {mat.name}
                </h3>
                <p className="font-mono text-[9px] tracking-[0.25em] text-[var(--stone)] uppercase">
                  {mat.spec}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
