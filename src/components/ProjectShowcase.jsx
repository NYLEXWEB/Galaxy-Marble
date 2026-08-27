"use client";

import React, { useState } from "react";
import { X, ZoomIn, Image as ImageIcon } from "lucide-react";
import { GALLERY_IMAGES } from "../data/projects";
import { BUSINESS_CONFIG } from "../config/business";

export default function ProjectShowcase() {
  const [activePreviewImage, setActivePreviewImage] = useState(null);

  // Divide 12 gallery images into 3 distinct rows (4 images each)
  const row1 = GALLERY_IMAGES.slice(0, 4);
  const row2 = GALLERY_IMAGES.slice(4, 8);
  const row3 = GALLERY_IMAGES.slice(8, 12);

  // Helper component to render a single gallery card
  const GalleryCard = ({ item }) => (
    <div
      onClick={() => setActivePreviewImage(item)}
      className="group relative w-72 sm:w-80 h-56 sm:h-64 rounded-none overflow-hidden border border-stone-border hover:border-amber-500/80 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer bg-stone-dark flex-shrink-0 mx-3"
    >
      {/* Image */}
      <img
        src={item.image}
        alt={`${item.title} - Natural Stone Installation by Galaxy Granite & Marble`}
        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      {/* Subtle Vignette Overlay on Hover */}
      <div className="absolute inset-0 bg-stone-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Zoom Hover Icon */}
      <div className="absolute top-3 right-3 p-2 rounded-full bg-stone-dark/80 text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 border border-amber-500/30">
        <ZoomIn className="w-4 h-4" />
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-16 sm:py-24 bg-stone-surface border-b border-stone-border overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
        
        {/* Section Header */}
        <div className="space-y-4 text-left max-w-2xl">
          <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-stone-dark">
            <span className="w-6 h-px bg-amber-500" />
            <span>Showroom &amp; Stone Gallery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-gold">
            {BUSINESS_CONFIG.name} Gallery
          </h2>
          <p className="text-sm text-stone-taupe font-sans font-light leading-relaxed">
            Explore our Mukkam, Kozhikode showroom exterior, premium natural granite gangsaw slab displays, and imported marble installations across Kerala.
          </p>
        </div>

        {/* 3 Auto-Scrolling Marquee Rows */}
        <div className="space-y-6 pt-2">
          
          {/* Row 1: Auto-Scroll Left */}
          <div className="relative overflow-hidden w-full py-1">
            <div className="animate-marquee-left flex items-center hover:[animation-play-state:paused] active:[animation-play-state:paused]">
              {/* Duplicate array for seamless 360 loop */}
              {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
                <GalleryCard key={`r1-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Row 2: Auto-Scroll Right */}
          <div className="relative overflow-hidden w-full py-1">
            <div className="animate-marquee-right flex items-center hover:[animation-play-state:paused] active:[animation-play-state:paused]">
              {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
                <GalleryCard key={`r2-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Row 3: Auto-Scroll Left */}
          <div className="relative overflow-hidden w-full py-1">
            <div className="animate-marquee-left flex items-center hover:[animation-play-state:paused] active:[animation-play-state:paused]">
              {[...row3, ...row3, ...row3, ...row3].map((item, idx) => (
                <GalleryCard key={`r3-${idx}`} item={item} />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Fullscreen Preview Modal */}
      {activePreviewImage && (
        <div
          className="fixed inset-0 z-50 bg-stone-dark/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActivePreviewImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-stone-dark rounded-2xl overflow-hidden border border-stone-border shadow-2xl space-y-4 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between text-white border-b border-stone-border/40 pb-4">
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {activePreviewImage.title}
                  </h3>
                  <span className="text-xs text-amber-500 font-semibold">
                    {activePreviewImage.stoneName}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActivePreviewImage(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-amber-600 text-white transition-colors cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Large Image */}
            <div className="relative max-h-[75vh] overflow-hidden rounded-xl bg-black flex items-center justify-center">
              <img
                src={activePreviewImage.image}
                alt={`${activePreviewImage.title} project image - Galaxy Granite & Marble`}
                className="max-h-[75vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
