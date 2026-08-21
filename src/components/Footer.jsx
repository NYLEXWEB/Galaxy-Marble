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
    <footer className="bg-stone-dark text-white pt-16 pb-24 lg:pb-12 border-t border-stone-border/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-tight text-white leading-none">
                GALAXY <span className="italic font-light text-amber-500">Stone</span>
              </span>
              <span className="text-[9px] tracking-[0.32em] uppercase font-sans font-semibold text-stone-bg/60 mt-1">
                Marble · Granite · Tile
              </span>
            </a>

            <p className="text-xs text-stone-border leading-relaxed max-w-sm">
              Digital Showroom & Product Catalogue for natural granite slabs, imported white marble, kitchen countertops, and staircase stone solutions.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-bg/75 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>{BUSINESS_CONFIG.category} • Mukkam, Kerala</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-light uppercase tracking-wider text-stone-bg/90">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-border">
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
            <h4 className="font-serif text-sm font-light uppercase tracking-wider text-stone-bg/90">
              Showroom Tools
            </h4>
            <ul className="space-y-2 text-xs text-stone-border">
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
            <h4 className="font-serif text-sm font-light uppercase tracking-wider text-stone-bg/90">
              Showroom Contact
            </h4>
            <div className="space-y-2 text-xs text-stone-border">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.location.fullAddress}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <a href={`tel:${BUSINESS_CONFIG.contact.phoneDisplay}`} className="hover:text-white transition-colors">
                  {BUSINESS_CONFIG.contact.phoneDisplay}
                </a>
              </p>
              <div className="pt-2">
                <button
                  onClick={handleWhatsAppFooter}
                  className="w-full py-2 px-3 bg-stone-accent hover:bg-stone-accent-dark text-white text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Get Price on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-stone-border/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-taupe">
          <div>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-stone-border hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
