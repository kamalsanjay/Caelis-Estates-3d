"use client";

import SectionLabel from "./ui/SectionLabel";
import Image from "next/image";

const MATERIALS = [
  {
    name: "Roman Travertine",
    desc: "Quarried from the Tivoli region near Rome. Each slab is handpicked by our master fabricators for grain and density alignment.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Hammered Bronze",
    desc: "Cast using ancient Chinese sand-casting methods. The oxidation process takes 18 months in a controlled mountain environment.",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Charred White Oak",
    desc: "Treated via the Japanese Shou Sugi Ban technique over three cycles of fire and oil, yielding century-long durability.",
    image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=800&q=80",
  },
];

export default function BespokeCraftSection() {
  return (
    <section
      id="bespoke-craft"
      className="relative w-full py-24 md:py-40 px-8 md:px-24 bg-[var(--background)] border-b border-[var(--stone)]/20"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <SectionLabel number="09" text="Material Lexicon" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {MATERIALS.map((mat, idx) => (
            <div key={idx} className="flex flex-col gap-5 group cursor-pointer">
              <div className="relative w-full h-64 overflow-hidden bg-[#17130f]">
                <Image
                  src={mat.image}
                  alt={mat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[30%] contrast-[1.05]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--champagne)] uppercase">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-light text-[var(--ink)] tracking-tight">
                  {mat.name}
                </h3>
                <p className="font-editorial italic text-sm text-[var(--muted-ink)] leading-relaxed">
                  {mat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
