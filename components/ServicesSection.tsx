"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./ui/SectionLabel";
import Image from "next/image";

const SERVICES = [
  {
    num: "01",
    tag: "Acquire",
    title: "Caelis Purchase",
    desc: "Acquire private ownership of completed architectural structures, securing a sanctuary designed to withstand centuries, complete with personal concierge integration.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    num: "02",
    tag: "Lease",
    title: "Private Residency",
    desc: "Temporary custody of our signature environments. Fully serviced by our internal hospitality guild, curated with rare vintage furnishings and fine art.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    num: "03",
    tag: "Entrust",
    title: "Portfolio Exchange",
    desc: "Entrust your architectural masterpiece to our database. We connect high-value property portfolios with qualified international individuals through private channels.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section 
      id="services" 
      className="relative w-full h-screen bg-[var(--background)] flex flex-col justify-between py-12 overflow-hidden border-b border-[var(--stone)]/20"
      aria-label="Residency services"
    >
      {/* Top Section Header */}
      <div className="px-8 md:px-24 z-10">
        <SectionLabel number="05" text="Residencies" />
      </div>

      {/* 3-Column Interactive Accordion */}
      <div className="flex flex-col md:flex-row w-full h-[65vh] md:h-[60vh] mt-8 select-none relative z-10 border-y border-[var(--stone)]/20">
        {SERVICES.map((service, idx) => {
          const isHovered = hoveredIdx === idx;
          const isAnyHovered = hoveredIdx !== null;
          
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative flex-1 md:hover:flex-[1.8] flex flex-col justify-between p-8 md:p-12 border-b md:border-b-0 md:border-r border-[var(--stone)]/20 last:border-0 transition-all duration-700 ease-[var(--ease-out-caelis)] overflow-hidden group cursor-pointer"
            >
              {/* Background Image that reveals on hover */}
              <div 
                className="absolute inset-0 z-0 transition-opacity duration-700 ease-out"
                style={{ 
                  opacity: isHovered ? 0.35 : 0.0,
                  transform: isHovered ? "scale(1.03)" : "scale(1.0)",
                  transition: "opacity 0.7s ease, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="33vw"
                  className="object-cover filter grayscale contrast-125"
                />
              </div>

              {/* Dark Gradient Overlay for Legibility */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-[#17130f]/60 to-transparent z-[1] pointer-events-none transition-opacity duration-500"
                style={{ opacity: isHovered ? 0.8 : 0 }}
              />

              {/* Accordion Card Content */}
              <div className="relative z-10 flex md:flex-col justify-between md:justify-start gap-4 w-full">
                <span className="font-mono text-xs text-[var(--champagne)] font-semibold">
                  {service.num}
                </span>
                <span className="font-display text-[10px] uppercase tracking-[0.2em] text-[var(--muted-ink)] group-hover:text-white/80 transition-colors duration-500">
                  {service.tag}
                </span>
              </div>

              <div className="relative z-10 flex flex-col gap-4 mt-auto">
                <h3 
                  className="font-display text-xl md:text-3xl font-light tracking-tight text-[var(--ink)] group-hover:text-white transition-colors duration-500"
                >
                  {service.title}
                </h3>
                
                {/* Expanding details container */}
                <div 
                  className="overflow-hidden transition-all duration-700 ease-[var(--ease-out-caelis)]"
                  style={{ 
                    maxHeight: isHovered ? "200px" : "0px",
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(15px)"
                  }}
                >
                  <p className="font-editorial italic text-xs md:text-sm text-white/70 leading-relaxed max-w-md">
                    {service.desc}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Bottom Footer Details */}
      <div className="px-8 md:px-24 flex justify-between text-[10px] font-mono tracking-[0.25em] text-[var(--stone)] z-10 uppercase">
        <span>Residency Operations</span>
        <span>Caelis Guild</span>
      </div>
    </section>
  );
}
