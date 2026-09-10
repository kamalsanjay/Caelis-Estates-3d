"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface CloudTransitionProps {
  triggerRef?: React.RefObject<HTMLElement>;
}

export default function CloudTransition({ triggerRef }: CloudTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = triggerRef?.current ?? el.parentElement;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: "40vh" },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger,
            start: "60% top",
            end: "90% top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [triggerRef]);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden z-[6] opacity-0"
      style={{ height: "60vh", mixBlendMode: "screen" }}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/cloud-overlay.png"
        alt=""
        className="w-full h-full object-cover"
        style={{
          transform: "scaleY(-1) scale(1.2)",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}
