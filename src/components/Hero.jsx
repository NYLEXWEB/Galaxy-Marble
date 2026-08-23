import React from "react";
import { MessageSquare, ArrowRight } from "lucide-react";
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
    <section id="hero" className="relative min-h-[100dvh] lg:min-h-[660px] flex items-center overflow-hidden border-b border-stone-border bg-stone-dark -mt-20 sm:-mt-24 pt-28 sm:pt-36 lg:pt-40">
      
      {/* 1. Full-screen Background Video/Image (Showroom Walkthrough Video on Desktop, Portrait Image on Mobile) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Mobile View Portrait Image */}
        <img
          src="/images/showroom_mobile.jpg"
          alt="Galaxy Granite & Marble physical showroom in Mukkam, Kozhikode, Kerala - Mobile View"
          className="lg:hidden absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Desktop View Video */}
        <video
          src="/images/showroom_bg.webm"
          poster="/images/showroom_day.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="hidden lg:block absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Adaptive Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-stone-dark/70 lg:bg-transparent lg:bg-gradient-to-r lg:from-stone-dark/95 lg:via-stone-dark/60 lg:to-transparent" />
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Clean Unboxed Editorial Copy & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left text-white">
            
            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.08]">
              Natural Granite &amp; Marble. <br />
              <span className="italic font-normal text-[#A8875A]">Designed for Beautiful Spaces.</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-stone-bg/85 max-w-xl leading-relaxed font-sans font-light">
              Discover Black Markino, Khammam Black, Honey Blue, Leather Black, and Steel Grey granite slabs directly from our Mukkam showroom.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#catalogue"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#A8875A] hover:bg-[#8F7148] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>Explore Slabs Collection</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-all" />
              </a>

              <button
                onClick={handleWhatsAppHero}
                className="px-6 sm:px-7 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-[0.15em] rounded-lg border border-white/20 hover:border-[#A8875A] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shadow-xs backdrop-blur-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#A8875A]" />
                <span>Get Price on WhatsApp</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="font-serif text-2xl sm:text-4xl font-bold text-white">50<span className="text-[#A8875A] font-normal">+</span></span>
                <span className="block text-[10px] sm:text-[11px] text-stone-bg/60 font-medium uppercase tracking-[0.2em] mt-1">Slab Varieties</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-4xl font-bold text-white">3.8<span className="text-amber-500 font-normal ml-0.5">★</span></span>
                <span className="block text-[10px] sm:text-[11px] text-stone-bg/60 font-medium uppercase tracking-[0.2em] mt-1">35 Google Reviews</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-4xl font-bold text-white">Mukkam</span>
                <span className="block text-[10px] sm:text-[11px] text-stone-bg/60 font-medium uppercase tracking-[0.2em] mt-1">Local Showroom</span>
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
