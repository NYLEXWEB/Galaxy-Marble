"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Gem, Compass } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#DED8CF]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Slabs Showcase (5 cols) */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#A8875A]/20 to-transparent rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-700" />
            <div className="relative overflow-hidden rounded-2xl border border-[#DED8CF]/60 shadow-xl aspect-4/5 lg:aspect-[4/3]">
              <picture className="w-full h-full block">
                <source srcSet="/images/showroom_mobile.jpg" media="(max-width: 1023px)" />
                <img
                  src="/images/showroom_day.jpg"
                  alt="Galaxy Granite & Marble premium slab inventory showroom in Mukkam, Kerala"
                  className="w-full h-full object-cover object-left lg:object-center transform group-hover:scale-105 transition-transform duration-700"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-amber-400 block mb-1">
                  Mukkam Showroom
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-semibold">
                  Direct Slabs Selection
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column: Copywriting & Trust Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[#A8875A]">
                <Compass className="w-4 h-4" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold">
                  About Galaxy Granite &amp; Marble
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#111111] leading-tight">
                Premium Granite &amp; Marble Showroom <br />
                <span className="italic font-normal text-[#A8875A]">in Mukkam, Kozhikode</span>
              </h2>
              <p className="text-stone-taupe text-sm sm:text-base leading-relaxed font-light font-sans max-w-2xl">
                At Galaxy Granite &amp; Marble, we are the trusted natural stone suppliers in Kozhikode, Kerala. For over a decade, we have provided premium South Indian granites, imported white marble slabs, and custom kitchen countertop stones at direct factory prices to homeowners, architects, and builders. We guide you from initial selection to precise custom cut-to-size finishing.
              </p>
            </div>

            {/* Core Trust Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#A8875A]/10 rounded-xl shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#A8875A]" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#111111]">
                    Direct Slabs Inspection
                  </h4>
                  <p className="text-stone-taupe text-xs leading-relaxed font-light mt-1">
                    Touch and inspect your exact slab under natural daylight before fabrication begins.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#A8875A]/10 rounded-xl shrink-0">
                  <Gem className="w-5 h-5 text-[#A8875A]" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#111111]">
                    Premium Granite Slabs
                  </h4>
                  <p className="text-stone-taupe text-xs leading-relaxed font-light mt-1">
                    Curated selection of timeless South Indian granites and rare exotic blue wave slabs.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
