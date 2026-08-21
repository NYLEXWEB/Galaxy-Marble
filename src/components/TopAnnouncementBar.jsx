import React from "react";
import { Phone, Mail } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";

export default function TopAnnouncementBar() {
  return (
    <div className="bg-stone-dark text-stone-bg border-b border-stone-dark/30 transition-transform duration-500">
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-3 py-2.5 text-[10px] sm:text-[11px]">
          <p className="tracking-[0.22em] uppercase text-stone-bg/80 hidden md:block truncate">
            Complimentary Kerala-wide consultation &amp; site visit
          </p>
          <div className="flex items-center gap-6 ml-auto">
            <a
              href={`mailto:${BUSINESS_CONFIG.contact.email || "sales@galaxy.stone"}`}
              className="hover:text-amber-500 tracking-[0.22em] uppercase transition-colors whitespace-nowrap hidden sm:inline-flex items-center gap-2"
            >
              <Mail className="w-3 h-3 text-stone-bg/70" />
              <span>Email Us</span>
            </a>
            <span className="hidden sm:inline text-stone-bg/30">·</span>
            <a
              href={`tel:${BUSINESS_CONFIG.contact.phoneDisplay}`}
              className="inline-flex items-center gap-2 hover:text-amber-500 tracking-[0.22em] uppercase transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-stone-bg/70" />
              <span>Call</span>
              <span className="tabular-nums normal-case tracking-normal text-[11px] ml-1">{BUSINESS_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
