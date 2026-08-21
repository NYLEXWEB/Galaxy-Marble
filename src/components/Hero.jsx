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
    <section id="hero" className="relative min-h-[560px] lg:min-h-[660px] flex items-center overflow-hidden border-b border-[#DED8CF]/80 bg-[#F5F1EA] -mt-20 sm:-mt-24 pt-28 sm:pt-36 lg:pt-40">
      
      {/* 1. Background Image with Seamless Top Flow & Soft Left Blend */}
      <div className="absolute inset-0 lg:left-auto lg:right-0 w-full lg:w-7/12 overflow-hidden pointer-events-none">
        <img
          src="/images/granite_kitchen_hero_1787249036600.png"
          alt="Galaxy Granite & Marble Showroom"
          className="w-full h-full object-cover object-right lg:object-center opacity-85 lg:opacity-95"
        />
        {/* Soft edge blending gradient on Desktop (right to left) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F5F1EA]" />
        
        {/* Warm ambient scrim on Mobile so text sits cleanly on top without needing a box card container */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-[#F5F1EA] via-[#F5F1EA]/80 to-[#F5F1EA]/60" />
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Clean Unboxed Editorial Copy & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Showroom Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717]/5 border border-[#A8875A]/40 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A8875A]">
              <Sparkles className="w-3.5 h-3.5 text-[#A8875A]" />
              <span>Architectural Stone Showroom • Mukkam</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[1.12]">
              Natural Granite & Marble. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#A8875A]">Designed for Beautiful Spaces.</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-[#817970] max-w-xl leading-relaxed font-sans">
              Discover premium black galaxy granite, imported Italian white marble slabs, kitchen countertops, and precision staircases directly from our Mukkam showroom.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#catalogue"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#171717] hover:bg-[#A8875A] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-xl flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>Explore Slabs Collection</span>
                <ArrowRight className="w-4 h-4 text-[#A8875A] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </a>

              <button
                onClick={handleWhatsAppHero}
                className="px-6 sm:px-7 py-3.5 sm:py-4 bg-[#FBF9F5] hover:bg-[#DED8CF]/40 text-[#171717] font-semibold text-xs uppercase tracking-[0.15em] rounded-lg border border-[#DED8CF] hover:border-[#A8875A] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#A8875A]" />
                <span>Get Price on WhatsApp</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-[#DED8CF]/80 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
              <div>
                <span className="font-serif text-xl sm:text-3xl font-bold text-[#171717]">50+</span>
                <span className="block text-[10px] sm:text-[11px] text-[#817970] font-semibold uppercase tracking-wider mt-0.5">Slab Varieties</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-3xl font-bold text-[#171717]">3.8 ★</span>
                <span className="block text-[10px] sm:text-[11px] text-[#817970] font-semibold uppercase tracking-wider mt-0.5">35 Google Reviews</span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-3xl font-bold text-[#171717]">Mukkam</span>
                <span className="block text-[10px] sm:text-[11px] text-[#817970] font-semibold uppercase tracking-wider mt-0.5">Physical Showroom</span>
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
