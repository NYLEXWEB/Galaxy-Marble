import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { COLLECTIONS, APPLICATION_DISCOVERY } from "../data/collections";

export default function CollectionDiscovery({ onSelectCategory, onSelectApplication }) {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll loop for Architectural Use cards
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId;
    const scrollSpeed = 0.8; // Smooth px scroll speed per frame

    const step = () => {
      if (!isPaused && el) {
        el.scrollLeft += scrollSpeed;
        // Infinite loop reset when reaching end of scroll
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  return (
    <section id="collections" className="py-16 sm:py-24 bg-[#FBF9F5] border-b border-[#DED8CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Category Collections Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#A8875A]">
            Slab Collections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717]">
            Discover Stone Collections
          </h2>
          <p className="text-sm text-[#817970] font-sans">
            From deep galaxy black granites to imported pristine Italian white marble slabs.
          </p>
        </div>

        {/* Categories Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COLLECTIONS.filter(c => c.id !== "all").map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative h-80 rounded-2xl overflow-hidden border border-[#DED8CF] hover:border-[#A8875A] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer shimmer-hover"
            >
              {/* Background Image */}
              <img
                src={cat.image || "/images/black_galaxy.png"}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/40 to-transparent group-hover:via-[#171717]/50 transition-colors" />

              {/* Glass Card Details */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <span className="glass-panel-dark text-[#A8875A] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-[#A8875A]/40">
                    Collection
                  </span>
                  <span className="text-xs font-mono text-[#DED8CF] bg-[#171717]/60 px-2 py-0.5 rounded">
                    {cat.count} Slabs
                  </span>
                </div>

                <div className="space-y-2 transform group-hover:-translate-y-1 transition-transform">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#A8875A] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#DED8CF] line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#A8875A] uppercase tracking-wider group-hover:text-white transition-colors">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Application-based Discovery Section (Auto-Scrolling & Touch Swipeable Carousel) */}
        <div className="pt-8 border-t border-[#DED8CF]/60 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#A8875A]">
                Application Guide
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
                Select Stone by Architectural Use
              </h3>
            </div>

            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="p-2.5 rounded-full bg-[#F5F1EA] hover:bg-[#171717] hover:text-white border border-[#DED8CF] transition-colors cursor-pointer"
                title="Scroll Left"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                className="p-2.5 rounded-full bg-[#F5F1EA] hover:bg-[#171717] hover:text-white border border-[#DED8CF] transition-colors cursor-pointer"
                title="Scroll Right"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Auto-scrolling & Swipeable Horizontal Container */}
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex gap-4 overflow-x-auto scrollbar-none py-2 px-1 scroll-smooth snap-x touch-pan-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Repeat cards array to ensure smooth continuous marquee loop */}
            {[...APPLICATION_DISCOVERY, ...APPLICATION_DISCOVERY].map((app, index) => (
              <div
                key={`${app.id}-${index}`}
                onClick={() => onSelectApplication(app.title)}
                className="flex-none w-52 sm:w-60 p-5 bg-[#F5F1EA] hover:bg-[#171717] border border-[#DED8CF] hover:border-[#A8875A] rounded-xl text-center transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer shadow-xs hover:shadow-lg snap-start"
              >
                <div className="w-11 h-11 mx-auto rounded-full bg-[#171717] group-hover:bg-[#A8875A] text-white flex items-center justify-center transition-colors mb-3">
                  <Sparkles className="w-5 h-5 text-[#A8875A] group-hover:text-white" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#171717] group-hover:text-white transition-colors">
                  {app.title}
                </h4>
                <p className="text-xs text-[#817970] group-hover:text-[#DED8CF] mt-1.5 line-clamp-2 leading-relaxed">
                  {app.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
