"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { buildQuoteRequestWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleWhatsAppClick = () => {
    const msg = buildQuoteRequestWhatsAppMessage({
      name: "Valued Visitor",
      phone: "",
      requirement: "Direct WhatsApp Showroom Enquiry"
    });
    openWhatsApp(msg);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
      
      {/* 1. Scroll To Top Arrow Button (Top) - White Circle Background */}
      <button
        onClick={scrollToTop}
        className={`p-3 rounded-full bg-white hover:bg-stone-dark text-stone-dark hover:text-white border border-stone-border shadow-lg shadow-black/10 transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center group ${
          showScrollTop
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-90 pointer-events-none"
        }`}
        title="Scroll to Top"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* 2. Google Business Profile Icon Button (Middle) - White Circle Background */}
      <a
        href={BUSINESS_CONFIG.location.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-white hover:bg-gray-100 border border-stone-border shadow-lg shadow-black/10 transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center group"
        title="View Google Business Profile & Customer Reviews"
        aria-label="Google Business Profile"
      >
        {/* Official Multi-Color Google G Icon */}
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.3 7.31 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.99 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      </a>

      {/* 3. Official WhatsApp Direct Chat Button (Bottom) */}
      <button
        onClick={handleWhatsAppClick}
        className="p-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl shadow-emerald-900/40 transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center group relative shimmer-hover"
        title="Direct WhatsApp Enquiry"
        aria-label="Direct WhatsApp Enquiry"
      >
        {/* Official WhatsApp Brand Logo SVG */}
        <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
        
        {/* Subtle Pulse Badge indicator */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-[#25D366] animate-ping" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-[#25D366]" />
      </button>

    </div>
  );
}
