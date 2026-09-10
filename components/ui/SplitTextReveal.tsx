"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerHook?: string;
}

export default function SplitTextReveal({
  text,
  className,
  delay = 0,
  duration = 0.8,
  stagger = 0.02,
  triggerHook = "top 85%",
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".reveal-word-inner");
    if (!words.length) return;

    gsap.fromTo(
      words,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: triggerHook,
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay, duration, stagger, triggerHook]);

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className={cn("flex flex-wrap overflow-hidden leading-normal", className)}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden mr-[0.25em] py-[0.1em]"
        >
          <span className="reveal-word-inner inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </p>
  );
}
