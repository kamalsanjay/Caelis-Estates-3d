"use client";

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  number: string;
  text: string;
  className?: string;
}

export default function SectionLabel({ number, text, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 text-section-label select-none",
        className
      )}
    >
      <span className="font-mono text-[10px] text-[var(--champagne)] font-semibold tracking-wider">
        {number}
      </span>
      <span className="w-8 h-[1px] bg-[var(--stone)]/40" />
      <span className="font-display font-medium tracking-[0.25em] text-[var(--muted-ink)] uppercase">
        {text}
      </span>
    </div>
  );
}
