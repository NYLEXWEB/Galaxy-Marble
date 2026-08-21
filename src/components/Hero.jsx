import React from "react";
import { MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { buildQuoteRequestWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function Hero() {
  const handleWhatsAppHero = () => {
    const msg = buildQuoteRequestWhatsAppMessage({
      name: "Valued Visitor",
      phone: "",
      requirement: "General Digital Showroom Enquiry"
    });
    openWhatsApp(msg);
  };

  return (
    <section id="hero" className="relative min-h-[580px] lg:min-h-[660px] flex items-center overflow-hidden border-b border-stone-border bg-stone-dark -mt-20 sm:-mt-24 pt-28 sm:pt-36 lg:pt-40">
      
      {/* 1. Full-screen Background Image (Daytime Exterior Showroom Photo) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Mobile View Image (Portrait Crop) */}
        <img
          src="/images/showroom_mobile.jpg"
          alt="Galaxy Showroom Exterior"
          className="lg:hidden absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Desktop View Image (Landscape Crop) */}
        <img
          src="/images/showroom_day.jpg"
          alt="Galaxy Showroom Exterior"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover object-right"
        />
        {/* Adaptive Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-stone-dark/65 lg:bg-transparent lg:bg-gradient-to-r lg:from-stone-dark/95 lg:via-stone-dark/50 lg:to-transparent" />
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Clean Unboxed Editorial Copy & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left text-white">
            
            {/* Showroom Location Pill */}
            <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-white">
              <span className="w-6 h-px bg-amber-500" />
              <span>Est. 1998 · Mukkam's Premier Marble &amp; Granite Showroom</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.05]">
              The quiet <br />
              <span className="italic font-light pl-8 sm:pl-16 lg:pl-24 text-amber-500">authority</span> <br />
              of stone.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-stone-bg/85 max-w-md leading-relaxed font-sans font-light">
              Premium Black Galaxy granite, imported Italian white marble slabs, kitchen countertops, and precision staircases directly from our physical showroom address.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#catalogue"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-amber-500 text-stone-dark hover:text-white font-medium text-[11px] uppercase tracking-[0.22em] transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer border border-white"
              >
                <span>Explore Slabs Collection</span>
                <ArrowRight className="w-4 h-4 text-stone-dark group-hover:text-white group-hover:translate-x-1 transition-all" />
              </a>

              <button
                onClick={handleWhatsAppHero}
                className="px-6 sm:px-7 py-3.5 sm:py-4 bg-transparent hover:bg-white/10 text-white font-medium text-[11px] uppercase tracking-[0.22em] border border-white/30 hover:border-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <span>Get Price on WhatsApp</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light text-white">50<span className="text-amber-500 italic font-normal">+</span></span>
                <span className="block text-[10px] text-stone-bg/60 font-medium uppercase tracking-[0.22em] mt-1.5">Slab Varieties</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light text-white">3.8<span className="text-amber-500 font-normal ml-0.5">★</span></span>
                <span className="block text-[10px] text-stone-bg/60 font-medium uppercase tracking-[0.22em] mt-1.5">Google Reviews</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light text-white">Mukkam</span>
                <span className="block text-[10px] text-stone-bg/60 font-medium uppercase tracking-[0.22em] mt-1.5">Local Showroom</span>
              </div>
            </div>

          </div>

          {/* Right spacer column for desktop layout balance */}
          <div className="hidden lg:block lg:col-span-5" />

        </div>
      </div>

    </section>
  );
}
