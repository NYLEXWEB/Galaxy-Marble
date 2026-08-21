import React from "react";
import { Phone, MessageSquare, Navigation, FileText } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { buildQuoteRequestWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function MobileStickyBar({ onOpenQuoteModal }) {
  const handleWhatsApp = () => {
    const msg = buildQuoteRequestWhatsAppMessage({
      name: "Mobile Visitor",
      phone: "",
      requirement: "Mobile Showroom Enquiry"
    });
    openWhatsApp(msg);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-dark/95 backdrop-blur-lg border-t border-stone-border/10 px-3 py-2 text-white shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        
        {/* Call Button */}
        <a
          href={`tel:${BUSINESS_CONFIG.contact.phoneDisplay}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-stone-dark/40 hover:bg-stone-border/20 rounded text-center transition-colors border border-stone-border/10"
        >
          <Phone className="w-4 h-4 text-amber-500" />
          <span className="text-[11px] font-semibold tracking-wide text-white mt-1">Call</span>
        </a>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-stone-accent hover:bg-stone-accent-dark rounded text-center transition-colors shadow-sm cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-white" />
          <span className="text-[11px] font-bold tracking-wide text-white mt-1">WhatsApp</span>
        </button>

        {/* Get Quote / Directions */}
        <button
          onClick={onOpenQuoteModal}
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-stone-dark/40 hover:bg-stone-border/20 rounded text-center transition-colors border border-stone-border/10 cursor-pointer"
        >
          <FileText className="w-4 h-4 text-amber-500" />
          <span className="text-[11px] font-semibold tracking-wide text-white mt-1">Get Quote</span>
        </button>

      </div>
    </div>
  );
}
