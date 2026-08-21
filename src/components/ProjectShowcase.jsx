import React, { useState } from "react";
import { PROJECTS } from "../data/projects";

export default function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Kitchens", "Staircases", "Flooring", "Interiors", "Exterior"];

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-16 sm:py-20 bg-[#FBF9F5] border-b border-[#DED8CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#A8875A]">
              Architectural Showcase
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              Natural Stone in Real Spaces
            </h2>
            <p className="text-sm text-[#817970] max-w-lg">
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
                    ? "bg-[#171717] text-white shadow-xs"
                    : "bg-[#F5F1EA] text-[#222] hover:bg-[#DED8CF]"
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
              className="group bg-[#F5F1EA] border border-[#DED8CF] rounded overflow-hidden hover:border-[#A8875A] transition-all duration-300 shadow-xs hover:shadow-md"
            >
              <div className="relative h-64 overflow-hidden bg-[#171717]">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent opacity-80" />
                
                <span className="absolute top-3 left-3 bg-[#171717]/90 text-[#A8875A] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-[#A8875A]/30">
                  {proj.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#171717] group-hover:text-[#A8875A] transition-colors">
                  {proj.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-[#817970] pt-1">
                  <span>Stone: <strong className="text-[#171717]">{proj.stoneUsed}</strong></span>
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
