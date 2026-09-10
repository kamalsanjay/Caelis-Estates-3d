"use client";

import SectionLabel from "./ui/SectionLabel";
import MagneticButton from "./ui/MagneticButton";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  { label: "Architectural Design", desc: "End-to-end architectural development from visioning through construction administration." },
  { label: "Interior Curation", desc: "Private procurement of rare furnishings, art, and materials sourced through our international network." },
  { label: "Estate Management", desc: "Ongoing property stewardship including staffing, maintenance scheduling, and seasonal preparation." },
  { label: "Advisory & Access", desc: "Confidential introductions to unlisted properties and off-market architectural opportunities worldwide." },
];

export default function ConciergeSection() {
  return (
    <section
      id="concierge"
      className="relative w-full py-24 md:py-40 px-8 md:px-24 bg-[#17130F] border-b border-[var(--stone)]/10 overflow-hidden"
    >
      {/* Subtle radial warm gradient */}
      <div className="absolute inset-0 gradient-radial-warm pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col gap-20 relative z-10">
        <div className="flex flex-col gap-4">
          <SectionLabel number="10" text="Concierge" className="!text-[var(--stone)]" />
          <h2 className="font-display text-section-title text-[var(--surface)] uppercase font-light mt-4 tracking-tight">
            An Invisible <br />
            <span className="font-editorial italic text-[var(--champagne)] lowercase">hand</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="flex flex-col gap-3 border-t border-white/10 pt-8">
              <span className="font-mono text-[9px] text-[var(--champagne)] tracking-[0.3em] uppercase">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg font-light text-white tracking-tight">
                {service.label}
              </h3>
              <p className="font-editorial italic text-sm text-white/50 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <MagneticButton
            className="px-8 py-4 border border-[var(--champagne)]/30 hover:border-[var(--champagne)] text-[var(--champagne)] text-[11px] font-display tracking-[0.2em] uppercase flex items-center gap-3 transition-colors duration-500"
          >
            Initiate Concierge Access <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
