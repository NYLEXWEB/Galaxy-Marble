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
    <section id="contact" className="py-16 sm:py-20 bg-[#FBF9F5] border-b border-[#DED8CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#A8875A]">
            Visit Our Showroom
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
            Inspect Slabs in Person
          </h2>
          <p className="text-sm text-[#817970]">
            Experience natural granite textures, book-matched marble slabs, and custom edge profiling at our Mukkam digital & physical showroom.
          </p>
        </div>

        {/* Location Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Information Card Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#F5F1EA] border border-[#DED8CF] rounded-lg p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs">
            
            <div className="space-y-6">
              <div className="border-b border-[#DED8CF] pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#171717]">
                  {BUSINESS_CONFIG.name}
                </h3>
                <p className="text-xs text-[#A8875A] font-semibold uppercase tracking-wider mt-1">
                  {BUSINESS_CONFIG.category}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#A8875A] flex-shrink-0 mt-1" />
                <div>
                  <span className="block text-xs font-bold text-[#171717] uppercase tracking-wider">
                    Address Location
                  </span>
                  <p className="text-sm text-[#222] mt-0.5">
                    {BUSINESS_CONFIG.location.fullAddress}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#A8875A] flex-shrink-0 mt-1" />
                <div>
                  <span className="block text-xs font-bold text-[#171717] uppercase tracking-wider">
                    Operating Schedule
                  </span>
                  <p className="text-sm text-[#222] mt-0.5">
                    {BUSINESS_CONFIG.openingHours.scheduleText}
                  </p>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#A8875A] flex-shrink-0 mt-1" />
                <div>
                  <span className="block text-xs font-bold text-[#171717] uppercase tracking-wider">
                    Direct Contact
                  </span>
                  <a
                    href={`tel:${BUSINESS_CONFIG.contact.phoneDisplay}`}
                    className="text-sm font-semibold text-[#171717] hover:text-[#A8875A] transition-colors"
                  >
                    {BUSINESS_CONFIG.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="pt-6 border-t border-[#DED8CF] space-y-2">
              
              {/* Get Directions Button */}
              <a
                href={BUSINESS_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#171717] hover:bg-[#A8875A] text-white font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <Navigation className="w-4 h-4 text-[#A8875A]" />
                <span>Get Directions on Google Maps</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                
                {/* WhatsApp */}
                <button
                  onClick={handleWhatsAppContact}
                  className="py-2.5 px-3 bg-[#FBF9F5] hover:bg-[#DED8CF] border border-[#DED8CF] text-[#171717] text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#A8875A]" />
                  <span>WhatsApp</span>
                </button>

                {/* Schedule Visit */}
                <button
                  onClick={onOpenSiteVisitModal}
                  className="py-2.5 px-3 bg-[#FBF9F5] hover:bg-[#DED8CF] border border-[#DED8CF] text-[#171717] text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#A8875A]" />
                  <span>Schedule Visit</span>
                </button>

              </div>

            </div>

          </div>

          {/* Interactive Map Visual Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#171717] rounded-lg border border-[#DED8CF] overflow-hidden relative shadow-lg min-h-[380px] flex flex-col justify-between p-8 text-white">
            
            {/* Visual Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#171717] via-[#222] to-[#171717] opacity-90" />
            
            <div className="relative z-10 space-y-4">
              <span className="px-3 py-1 bg-[#A8875A]/20 border border-[#A8875A]/40 text-[#A8875A] text-[11px] font-bold uppercase tracking-widest rounded inline-block">
                Showroom Directions
              </span>
              
              <h3 className="font-serif text-3xl font-bold">
                Located on Edavanna–Koyilandy Road
              </h3>

              <p className="text-xs text-[#DED8CF] max-w-md leading-relaxed">
                Conveniently accessible for clients from Mukkam, Kozhikode, Areacode, and surrounding Kerala districts. Direct parking available for visitors.
              </p>
            </div>

            <div className="relative z-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#333]">
              <div className="text-xs text-[#817970]">
                Coordinates & Directions available on Google Business Profile
              </div>

              <a
                href={BUSINESS_CONFIG.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#A8875A] hover:bg-[#8F7148] text-white text-xs font-bold uppercase tracking-widest rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
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
