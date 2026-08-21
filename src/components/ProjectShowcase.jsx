import React, { useState } from "react";
import { PROJECTS } from "../data/projects";

export default function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Kitchens", "Staircases", "Flooring", "Interiors", "Exterior"];

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-20 bg-stone-surface border-b border-stone-border">
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-stone-dark">
              <span className="w-6 h-px bg-amber-500" />
              <span>Architectural Showcase</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-dark">
              Natural Stone in Real Spaces
            </h2>
            <p className="text-sm text-stone-taupe max-w-lg">
              Explore completed residential kitchen slabs, marble flooring elevations, and precision staircases.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-stone-dark text-white shadow-xs"
                    : "bg-stone-bg text-stone-text hover:bg-stone-border/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Editorial Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="group bg-stone-bg border border-stone-border rounded overflow-hidden hover:border-stone-accent transition-all duration-300 shadow-xs hover:shadow-md"
            >
              <div className="relative h-64 overflow-hidden bg-stone-dark">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/80 via-transparent to-transparent opacity-80" />
                
                <span className="absolute top-3 left-3 bg-stone-dark/95 text-amber-500 text-[9px] font-semibold uppercase tracking-[0.22em] px-2.5 py-1 rounded border border-amber-500/30">
                  {proj.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif text-xl font-light text-stone-dark group-hover:text-stone-accent transition-colors">
                  {proj.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-stone-taupe pt-1">
                  <span>Stone: <strong className="text-stone-dark">{proj.stoneUsed}</strong></span>
                  <span>{proj.locationTag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
