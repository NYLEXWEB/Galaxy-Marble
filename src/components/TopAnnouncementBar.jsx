import React from "react";
import { MapPin, Clock, Phone } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";

export default function TopAnnouncementBar() {

  return (
    <div className="bg-[#171717] text-[#FBF9F5] text-xs font-sans py-2.5 px-4 border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Left: Location & Hours */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[#DED8CF]">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#A8875A]" />
            <span>{BUSINESS_CONFIG.location.address}, {BUSINESS_CONFIG.location.district}</span>
          </span>
          <span className="hidden md:inline text-[#444]">•</span>
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Clock className="w-3.5 h-3.5 text-[#A8875A]" />
            <span>{BUSINESS_CONFIG.openingHours.scheduleText}</span>
          </span>
        </div>

        {/* Right: Quick Contacts */}
        <div className="flex items-center gap-4 text-[#DED8CF]">
          <a
            href={`tel:${BUSINESS_CONFIG.contact.phoneDisplay}`}
            className="flex items-center gap-1.5 hover:text-[#A8875A] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#A8875A]" />
            <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
