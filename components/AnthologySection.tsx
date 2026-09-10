"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import Image from "next/image";

const PROJECTS = [
  {
    id: "villa-01",
    num: "01",
    title: "Caelis Cliffside Sky Villa",
    location: "Amalfi Coast, Italy",
    type: "Residential Monolith",
    description: "Suspended 300 meters above the Tyrrhenian Sea, a raw travertine fragment blending gravity with absolute transparency.",
    image: "/images/cloud-villa.png",
  },
  {
    id: "tower-01",
    num: "02",
    title: "The Bronze Obelisk Tower",
    location: "Tokyo, Japan",
    type: "Bespoke Residence",
    description: "A vertical sanctuary forged in textured dark bronze, clad in reflective glass that captures the passing clouds.",
    image: "/images/tower.png",
  },
  {
    id: "estate-01",
    num: "03",
    title: "The Midnight Travertine Estate",
    location: "Reykjavik, Iceland",
    type: "Private Sanctuary",
    description: "An subterranean art sanctuary carved into basalt rock, featuring thermal pools that dissolve into the misty horizon.",
    image: "/images/private-mansion.png",
  },
];

export default function AnthologySection() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const trigger = triggerRef.current;
    if (!scrollContainer || !trigger) return;

    const sections = scrollContainer.querySelectorAll(".project-card");
    const totalMove = scrollContainer.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Horizontal translation timeline
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${scrollContainer.scrollWidth}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      pinTimeline.to(scrollContainer, {
        x: -totalMove,
        ease: "none",
      });

      // Parallax translation for images
      sections.forEach((sec) => {
        const img = sec.querySelector(".project-image");
        if (!img) return;

        gsap.fromTo(
          img,
          { x: "-10%" },
          {
            x: "10%",
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              containerAnimation: pinTimeline,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    }, trigger);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} id="anthology" className="relative w-full overflow-hidden bg-[var(--background)]">
      <section ref={containerRef} className="h-screen w-full flex flex-col justify-between py-12 relative">
        {/* Top Header Label */}
        <div className="px-8 md:px-24 flex justify-between items-center z-10">
          <SectionLabel number="02" text="Anthology" />
          <span className="font-editorial italic text-sm text-[var(--muted-ink)] hidden md:inline">
            A curation of impossible architectures
          </span>
        </div>

        {/* Scroll Container */}
        <div 
          ref={scrollRef} 
          className="flex h-[70vh] items-center pl-8 md:pl-24 gap-12 md:gap-24 select-none will-change-transform pr-24"
          style={{ width: "fit-content" }}
        >
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="project-card relative w-[75vw] md:w-[50vw] h-[55vh] flex-shrink-0 flex flex-col justify-between group cursor-pointer"
            >
              {/* Image Frame with Parallax inside */}
              <div className="w-full h-[75%] overflow-hidden relative rounded-sm bg-[#17130f]">
                <div className="project-image absolute inset-y-0 -left-[10%] w-[120%] h-full will-change-transform transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 75vw, 50vw"
                    priority
                    className="object-cover opacity-85 filter contrast-[1.05] brightness-[0.9]"
                  />
                </div>
                {/* Subtle dark luxury overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/60 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                <span className="absolute bottom-4 left-6 font-mono text-[10px] text-white/50 tracking-[0.2em] uppercase">
                  {project.type}
                </span>
              </div>

              {/* Text Meta Info */}
              <div className="flex flex-col gap-1.5 mt-4">
                <div className="flex justify-between items-baseline border-b border-[var(--stone)]/20 pb-2">
                  <h3 className="font-display text-xl md:text-2xl font-light text-[var(--ink)] tracking-tight">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-[var(--champagne)] font-semibold">
                    {project.num}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between text-xs text-[var(--muted-ink)] pt-1 gap-2">
                  <span className="font-display tracking-wider uppercase">{project.location}</span>
                  <p className="font-editorial italic max-w-sm text-right md:text-left leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom indicators */}
        <div className="px-8 md:px-24 flex justify-between text-[10px] font-mono tracking-[0.25em] text-[var(--stone)] z-10 uppercase">
          <span>Explore horizontally</span>
          <span>© Caelis Collection</span>
        </div>
      </section>
    </div>
  );
}
