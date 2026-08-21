import React from "react";
import { MapPin, Clock, Phone, Navigation, Calendar, MessageSquare } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { buildQuoteRequestWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function ShowroomLocationSection({ onOpenSiteVisitModal }) {
  const handleWhatsAppContact = () => {
    const msg = buildQuoteRequestWhatsAppMessage({
      name: "Showroom Visitor",
      phone: "",
      requirement: "Location & Visit Information"
    });
    openWhatsApp(msg);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-stone-surface border-b border-stone-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-stone-dark justify-center w-full">
            <span className="w-6 h-px bg-amber-500" />
            <span>Visit Our Showroom</span>
            <span className="w-6 h-px bg-amber-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-dark">
            Inspect Slabs in Person
          </h2>
          <p className="text-sm text-stone-taupe">
            Experience natural granite textures, book-matched marble slabs, and custom edge profiling at our Mukkam digital & physical showroom.
          </p>
        </div>

        {/* Location Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Information Card Column (5 cols) */}
          <div className="lg:col-span-5 bg-stone-bg border border-stone-border rounded-lg p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
            
            <div className="space-y-6">
              <div className="border-b border-stone-border pb-4">
                <h3 className="font-serif text-2xl font-light text-stone-dark">
                  {BUSINESS_CONFIG.name}
                </h3>
                <p className="text-xs text-stone-accent font-semibold uppercase tracking-[0.18em] mt-1">
                  {BUSINESS_CONFIG.category}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-stone-accent flex-shrink-0 mt-1" />
                <div>
                  <span className="block text-xs font-bold text-stone-dark uppercase tracking-wider">
                    Address Location
                  </span>
                  <p className="text-sm text-stone-text mt-0.5">
                    {BUSINESS_CONFIG.location.fullAddress}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-stone-accent flex-shrink-0 mt-1" />
                <div>
                  <span className="block text-xs font-bold text-stone-dark uppercase tracking-wider">
                    Operating Schedule
                  </span>
                  <p className="text-sm text-stone-text mt-0.5">
                    {BUSINESS_CONFIG.openingHours.scheduleText}
                  </p>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-stone-accent flex-shrink-0 mt-1" />
                <div>
                  <span className="block text-xs font-bold text-stone-dark uppercase tracking-wider">
                    Direct Contact
                  </span>
                  <a
                    href={`tel:${BUSINESS_CONFIG.contact.phoneDisplay}`}
                    className="text-sm font-semibold text-stone-dark hover:text-stone-accent transition-colors"
                  >
                    {BUSINESS_CONFIG.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="pt-6 border-t border-stone-border space-y-2">
              
              {/* Get Directions Button */}
              <a
                href={BUSINESS_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-stone-dark hover:bg-stone-accent text-white font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <Navigation className="w-4 h-4 text-stone-accent" />
                <span>Get Directions on Google Maps</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                
                {/* WhatsApp */}
                <button
                  onClick={handleWhatsAppContact}
                  className="py-2.5 px-3 bg-stone-surface hover:bg-stone-border/40 border border-stone-border text-stone-dark text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-stone-accent" />
                  <span>WhatsApp</span>
                </button>

                {/* Schedule Visit */}
                <button
                  onClick={onOpenSiteVisitModal}
                  className="py-2.5 px-3 bg-stone-surface hover:bg-stone-border/40 border border-stone-border text-stone-dark text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-stone-accent" />
                  <span>Schedule Visit</span>
                </button>

              </div>

            </div>

          </div>

          {/* Interactive Map Visual Card (7 cols) */}
          <div className="lg:col-span-7 bg-stone-dark rounded-lg border border-stone-border overflow-hidden relative shadow-lg min-h-[380px] flex flex-col justify-between p-8 text-white">
            
            {/* Visual Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-tr from-stone-dark via-stone-dark/80 to-stone-dark opacity-90" />
            
            <div className="relative z-10 space-y-4">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-semibold uppercase tracking-[0.18em] rounded inline-block">
                Showroom Directions
              </span>
              
              <h3 className="font-serif text-3xl font-light">
                Located on Edavanna–Koyilandy Road
              </h3>

              <p className="text-xs text-stone-border max-w-md leading-relaxed">
                Conveniently accessible for clients from Mukkam, Kozhikode, Areacode, and surrounding Kerala districts. Direct parking available for visitors.
              </p>
            </div>

            <div className="relative z-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-border/10">
              <div className="text-xs text-stone-taupe">
                Coordinates & Directions available on Google Business Profile
              </div>

              <a
                href={BUSINESS_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-stone-accent hover:bg-stone-accent-dark text-white text-xs font-bold uppercase tracking-widest rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Open Google Maps</span>
                <Navigation className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
