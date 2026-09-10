"use client";

import SectionLabel from "./ui/SectionLabel";

const AWARDS = [
  { year: "2025", award: "Dezeen Awards", category: "Residential Architecture of the Year", gold: true },
  { year: "2024", award: "Wallpaper* Design Awards", category: "Best Private Residence — Global", gold: true },
  { year: "2024", award: "Architizer A+ Awards", category: "Jury Special Recognition", gold: false },
  { year: "2023", award: "World Architecture Festival", category: "Future Projects — Housing", gold: true },
];

export default function AwardsSection() {
  return (
    <section
      id="awards"
      className="relative w-full py-24 md:py-40 px-8 md:px-24 bg-[var(--surface)] border-b border-[var(--stone)]/20"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        <SectionLabel number="08" text="Recognition" />

        <div className="flex flex-col divide-y divide-[var(--stone)]/20">
          {AWARDS.map((award) => (
            <div
              key={award.award + award.year}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-8 group"
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-[var(--champagne)] tracking-widest">
                  {award.year}
                </span>
                {award.gold && (
                  <span className="text-[8px] font-mono tracking-[0.25em] uppercase border border-[var(--champagne)]/40 text-[var(--champagne)] px-2 py-1">
                    Gold
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 flex-1 md:text-center">
                <h3 className="font-display text-lg font-light text-[var(--ink)] tracking-tight">
                  {award.award}
                </h3>
                <p className="font-editorial italic text-sm text-[var(--muted-ink)]">
                  {award.category}
                </p>
              </div>
              <div className="md:text-right">
                <span className="font-mono text-[9px] text-[var(--stone)] tracking-widest uppercase group-hover:text-[var(--champagne)] transition-colors duration-300">
                  Awarded
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
