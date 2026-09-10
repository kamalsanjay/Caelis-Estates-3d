"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  strength = 35,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const hx = rect.left + rect.width / 2;
      const hy = rect.top + rect.height / 2;
      
      const dx = e.clientX - hx;
      const dy = e.clientY - hy;

      // Magnetic pull translation
      gsap.to(el, {
        x: (dx / rect.width) * strength,
        y: (dy / rect.height) * strength,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const onMouseLeave = () => {
      // Return to center
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [strength]);

  return (
    <button
      ref={containerRef}
      onClick={onClick}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </button>
  );
}
