import React from "react";
import { MapPin, Phone, MessageSquare, ShieldCheck, ArrowUp } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { buildQuoteRequestWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function Footer({ onOpenQuoteModal }) {
  const handleWhatsAppFooter = () => {
    const msg = buildQuoteRequestWhatsAppMessage({
      name: "Footer Visitor",
      phone: "",
      requirement: "General Digital Showroom Enquiry"
    });
    openWhatsApp(msg);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#171717] text-white pt-16 pb-24 lg:pb-12 border-t border-[#333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                GALAXY
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#A8875A] -mt-1">
                Granite & Marble
              </span>
            </a>

            <p className="text-xs text-[#DED8CF] leading-relaxed max-w-sm">
              Digital Showroom & Product Catalogue for natural granite slabs, imported white marble, kitchen countertops, and staircase stone solutions.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#A8875A] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{BUSINESS_CONFIG.category} • Mukkam, Kerala</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#A8875A]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#DED8CF]">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Collections</a></li>
              <li><a href="#catalogue" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Our Work</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Customer Tools */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#A8875A]">
              Showroom Tools
            </h4>
            <ul className="space-y-2 text-xs text-[#DED8CF]">
              <li>
                <button onClick={onOpenQuoteModal} className="hover:text-white transition-colors cursor-pointer">
                  Request a Quote
                </button>
              </li>
              <li>
                <button onClick={handleWhatsAppFooter} className="hover:text-white transition-colors cursor-pointer">
                  WhatsApp Direct Enquiry
                </button>
              </li>
              <li>
                <a href={BUSINESS_CONFIG.location.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Google Maps Location
                </a>
              </li>
            </ul>
          </div>

          {/* Showroom Contacts */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#A8875A]">
              Showroom Contact
            </h4>
            <div className="space-y-2 text-xs text-[#DED8CF]">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A8875A] flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.location.fullAddress}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#A8875A]" />
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneDisplay}`} className="hover:text-white">
                  {BUSINESS_CONFIG.contact.phoneDisplay}
                </a>
              </p>
              <div className="pt-2">
                <button
                  onClick={handleWhatsAppFooter}
                  className="w-full py-2 px-3 bg-[#A8875A] hover:bg-[#8F7148] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Get Price on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-[#333] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#817970]">
          <div>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#DED8CF] hover:text-[#A8875A] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
