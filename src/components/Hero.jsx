import React from "react";
import { MessageSquare, ArrowRight, ShieldCheck, Star, Sparkles } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { buildQuoteRequestWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function Hero({ onOpenQuoteModal, onOpenCalculator }) {
  const handleWhatsAppHero = () => {
    const msg = buildQuoteRequestWhatsAppMessage({
      name: "Valued Visitor",
      phone: "",
      requirement: "General Digital Showroom Enquiry"
    });
    openWhatsApp(msg);
  };

  return (
    <section id="hero" className="relative py-12 lg:py-24 overflow-hidden border-b border-[#DED8CF]/80 bg-gradient-to-b from-[#F5F1EA] via-[#FBF9F5] to-[#F5F1EA]">
      
      {/* Background Decorative Subtle Gold Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#A8875A]/10 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717]/5 border border-[#A8875A]/30 text-xs font-semibold uppercase tracking-[0.25em] text-[#A8875A] shadow-xs hover:border-[#A8875A] transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-[#A8875A]" />
              <span>Architectural Stone Showroom • Mukkam</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[1.12]">
              Natural Granite & Marble. <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#A8875A]">Designed for Beautiful Spaces.</span>
            </h1>

            {/* Descriptive Subhead */}
            <p className="text-base sm:text-lg text-[#817970] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Discover premium black galaxy granite, imported Italian white marble slabs, kitchen countertops, and precision staircases directly from our Mukkam showroom.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              
              {/* Primary CTA: Explore Collection */}
              <a
                href="#catalogue"
                className="w-full sm:w-auto px-8 py-4 bg-[#171717] hover:bg-[#A8875A] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-3 group cursor-pointer shimmer-hover"
              >
                <span>Explore Slabs Collection</span>
                <ArrowRight className="w-4 h-4 text-[#A8875A] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </a>

              {/* Secondary CTA: Get Price on WhatsApp */}
              <button
                onClick={handleWhatsAppHero}
                className="w-full sm:w-auto px-7 py-4 bg-[#FBF9F5] hover:bg-[#DED8CF]/40 text-[#171717] font-semibold text-xs uppercase tracking-[0.15em] rounded-lg border border-[#DED8CF] hover:border-[#A8875A] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-[#A8875A]" />
                <span>Get Price on WhatsApp</span>
              </button>

            </div>

            {/* Quick Metrics / Micro Trust Highlights */}
            <div className="pt-6 border-t border-[#DED8CF]/60 grid grid-cols-3 gap-4 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">50+</span>
                <span className="block text-[11px] text-[#817970] font-medium uppercase tracking-wider mt-0.5">Slab Varieties</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">3.8 ★</span>
                <span className="block text-[11px] text-[#817970] font-medium uppercase tracking-wider mt-0.5">35 Google Reviews</span>
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">Mukkam</span>
                <span className="block text-[11px] text-[#817970] font-medium uppercase tracking-wider mt-0.5">Physical Showroom</span>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Architectural Visual Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FBF9F5] bg-[#171717] group gold-glow-hover transition-all duration-500">
              
              <img
                src="/images/granite_kitchen_hero_1787249036600.png"
                alt="Galaxy Granite Kitchen Slab Installation"
                className="w-full h-[440px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/20 to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />

              {/* Floating Live Badge Overlay on Hero Card */}
              <div className="absolute top-4 right-4 glass-panel-dark px-3.5 py-2 rounded-lg text-white space-y-0.5 shadow-lg border border-[#A8875A]/40 animate-float">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#A8875A] text-[#A8875A]" />
                  <span>3.8 Google Rating</span>
                </div>
                <p className="text-[10px] text-[#DED8CF]">Verified Customer Feedback</p>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-3 py-1 bg-[#A8875A] text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-sm inline-block">
                  Featured Slabs
                </span>
                
                <h3 className="font-serif text-2xl font-bold text-white">
                  Black Galaxy & Italian White Slabs
                </h3>

                <p className="text-xs text-[#DED8CF] line-clamp-2 font-sans">
                  Mirror-polished surface finish, high durability, suitable for modern modular kitchens & luxury flooring.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
