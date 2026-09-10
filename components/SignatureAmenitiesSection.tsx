"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import Image from "next/image";

const AMENITIES = [
  {
    num: "01",
    title: "Thermal Basalt Spa",
    desc: "A subterranean thermal sanctuary carved into volcanic basalt. Geothermal waters filter through natural silica channels, illuminated by concealed linear brass highlights.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    num: "02",
    title: "Climate Art Vault",
    desc: "A museum-grade subterranean vault featuring state-of-the-art particulate filtration and precise climate profiles, designed to house and display invaluable private masterpieces.",
    image: "https://images.unsplash.com/photo-1582555762489-77a8e5a2f5f8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    num: "03",
    title: "Zero-Edge Sky Pool",
    desc: "An outdoor 25-meter infinity lap pool suspended at the edge of the cantilevered slab, dissolving the boundary between thermal water and the horizon.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function SignatureAmenitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textBlocks = leftRef.current?.querySelectorAll(".amenity-text-block");
    const imagePanels = rightRef.current?.querySelectorAll(".amenity-image-panel");
    
    if (!container || !textBlocks || !imagePanels) return;

    const ctx = gsap.context(() => {
      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Animate transition between amenities
      imagePanels.forEach((panel, idx) => {
        if (idx > 0) {
          // Slide/clip reveal the image panel
          tl.fromTo(
            panel,
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
            { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 1, ease: "power2.inOut" },
            idx * 0.9 - 0.4
          );

          // Parallax translate the image itself in the opposite direction
          const img = panel.querySelector(".amenity-img");
          if (img) {
            tl.fromTo(
              img,
              { yPercent: 12 },
              { yPercent: 0, duration: 1, ease: "power2.inOut" },
              idx * 0.9 - 0.4
            );
          }
        }

        if (idx < textBlocks.length) {
          const textBlock = textBlocks[idx];
          
          if (idx === 0) {
            tl.to(textBlock, { opacity: 0, y: -40, duration: 0.5 }, 0.3);
          } else {
            tl.fromTo(
              textBlock,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.5 },
              idx * 0.9 - 0.3
            );
            
            if (idx < textBlocks.length - 1) {
              tl.to(textBlock, { opacity: 0, y: -40, duration: 0.5 }, idx * 0.9 + 0.3);
            }
          }
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[var(--surface)] overflow-hidden border-b border-[var(--stone)]/20">
      <div className="w-full h-full flex flex-col md:flex-row">
        
        {/* Left Side: Amenity Metadata and Narrative */}
        <div ref={leftRef} className="w-full md:w-1/2 h-[45vh] md:h-full flex flex-col justify-between p-8 md:p-24 z-10 bg-[var(--surface)] md:bg-transparent">
          <SectionLabel number="04" text="Amenities" />
          
          <div className="relative h-[25vh] md:h-[35vh] flex items-center">
            {AMENITIES.map((amenity, idx) => (
              <div
                key={amenity.num}
                className="amenity-text-block absolute inset-x-0 flex flex-col gap-3 md:gap-5 will-change-[transform,opacity]"
                style={{ opacity: idx === 0 ? 1 : 0 }}
              >
                <span className="font-mono text-xs text-[var(--champagne)] font-semibold tracking-wider">
                  Amenity Suite {amenity.num}
                </span>
                <h3 className="font-display text-2xl md:text-5xl font-light text-[var(--ink)] tracking-tight">
                  {amenity.title}
                </h3>
                <p className="font-editorial italic text-xs md:text-base leading-relaxed text-[var(--muted-ink)] max-w-md">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="font-mono text-[9px] tracking-[0.25em] text-[var(--stone)] uppercase">
            Signature Amenities — Private Suite
          </div>
        </div>

        {/* Right Side: Curtain Images Container */}
        <div ref={rightRef} className="w-full md:w-1/2 h-[55vh] md:h-full relative overflow-hidden bg-[#17130f]">
          {AMENITIES.map((amenity, idx) => (
            <div
              key={idx}
              className="amenity-image-panel absolute inset-0 w-full h-full overflow-hidden will-change-[clip-path]"
              style={{ 
                zIndex: idx + 1,
                clipPath: idx === 0 ? "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
              }}
            >
              <div className="amenity-img absolute inset-0 w-full h-[115%] -top-[10%] will-change-transform">
                <Image
                  src={amenity.image}
                  alt={amenity.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover filter contrast-[1.03] brightness-[0.88]"
                />
              </div>
              {/* Luxury gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/30 to-transparent" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
