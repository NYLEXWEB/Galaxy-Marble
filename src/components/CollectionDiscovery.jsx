import React from "react";
import { ArrowRight, Sparkles, UtensilsCrossed, Layers, Grid, LayoutGrid, Home } from "lucide-react";
import { COLLECTIONS, APPLICATION_DISCOVERY } from "../data/collections";
import { BUSINESS_CONFIG } from "../config/business";

export default function CollectionDiscovery({ onSelectCategory, onSelectApplication }) {
  return (
    <section id="collections" className="py-16 sm:py-24 bg-stone-bg border-b border-stone-border">
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* Category Collections Header */}
        <div className="text-left max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-stone-accent">
            <span className="w-6 h-px bg-stone-accent/40" />
            <span>Galaxy Stone Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-gold">
            Premium Granite &amp; <br />
            <em className="italic font-light opacity-80">Imported Marble Slabs</em>
          </h2>
          <p className="text-sm text-stone-taupe font-sans font-light leading-relaxed max-w-md">
            At {BUSINESS_CONFIG.name}, our curated slab collections are hand-selected from the finest quarries to guarantee structural durability for Kerala homes.
          </p>
        </div>

        {/* Categories Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COLLECTIONS.filter(c => c.id !== "all").map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative h-80 rounded-2xl overflow-hidden border border-stone-border hover:border-stone-accent shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer shimmer-hover"
            >
              {/* Background Image */}
              <img
                src={cat.image || "/images/black_galaxy.png"}
                alt={`${cat.name} stone collection - Galaxy Granite & Marble`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/90 via-stone-dark/40 to-transparent group-hover:via-stone-dark/50 transition-colors" />

              {/* Glass Card Details */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <span className="glass-panel-dark text-stone-accent text-[9px] font-semibold uppercase tracking-[0.22em] px-2.5 py-1 rounded border border-stone-accent/40">
                    Collection
                  </span>
                  <span className="text-[10px] tracking-wider font-mono text-stone-bg bg-stone-dark/60 px-2 py-0.5 rounded">
                    {cat.count} Slabs
                  </span>
                </div>

                <div className="space-y-2 transform group-hover:-translate-y-1 transition-transform">
                  <h3 className="font-serif text-2xl font-light text-white group-hover:text-amber-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-bg/80 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-[10px] font-semibold text-amber-500 uppercase tracking-[0.22em] group-hover:text-white transition-colors">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Application-based Discovery Section (Automatic Continuous Marquee Scroll Towards Left) */}
        <div className="pt-8 border-t border-stone-border/60 space-y-8 overflow-hidden">
          
          <div className="text-left space-y-4">
            <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-stone-dark">
              <span className="w-6 h-px bg-amber-500" />
              <span>Application Guide</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gradient-gold">
              Select Stone by Architectural Use
            </h3>
          </div>

          {/* Continuous Infinite Automatic Scroll Container (Leftward Marquee) */}
          <div className="w-full overflow-hidden relative py-4">
            <div className="animate-marquee-left hover:[animation-play-state:paused] flex gap-6">
              {/* Duplicate array twice for seamless continuous infinite marquee scroll */}
              {[...APPLICATION_DISCOVERY, ...APPLICATION_DISCOVERY].map((app, index) => (
                <div
                  key={`${app.id}-${index}`}
                  onClick={() => onSelectApplication(app.title)}
                  className="w-72 sm:w-80 h-44 shrink-0 rounded-2xl overflow-hidden border border-stone-border hover:border-amber-500 relative transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group shadow-sm hover:shadow-xl"
                >
                  {/* Background Image */}
                  <img
                    src={app.image}
                    alt={`${app.title} application - Galaxy Granite & Marble`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/95 via-stone-dark/45 to-transparent group-hover:via-stone-dark/55 transition-colors" />

                  {/* Content Container */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between text-white z-10">
                    <div className="flex justify-between items-start">
                      <div className="w-9 h-9 rounded-full bg-stone-dark/70 backdrop-blur-xs flex items-center justify-center text-amber-500 border border-white/10 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                        {app.icon === "UtensilsCrossed" && <UtensilsCrossed className="w-4 h-4" />}
                        {app.icon === "Layers" && <Layers className="w-4 h-4" />}
                        {app.icon === "Grid" && <Grid className="w-4 h-4" />}
                        {app.icon === "Sparkles" && <Sparkles className="w-4 h-4" />}
                        {app.icon === "LayoutGrid" && <LayoutGrid className="w-4 h-4" />}
                        {app.icon === "Home" && <Home className="w-4 h-4" />}
                      </div>
                      <span className="text-[9px] tracking-[0.2em] font-sans font-semibold text-white/50 uppercase">
                        View Slabs
                      </span>
                    </div>

                    <div className="space-y-1 text-left">
                      <h4 className="font-serif text-lg font-light text-white group-hover:text-amber-400 transition-colors leading-tight">
                        {app.title}
                      </h4>
                      <p className="text-[11px] text-white/70 line-clamp-2 leading-relaxed font-sans font-light">
                        {app.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
