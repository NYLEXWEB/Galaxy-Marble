import React from "react";
import { Star, MapPin, Building2, ExternalLink } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { GOOGLE_RATING_SUMMARY } from "../data/reviews";

export default function TrustBar() {
  const items = [
    {
      id: "category",
      label: "Store Category",
      icon: <Building2 className="w-4 h-4 text-amber-500" />,
      value: <span>{BUSINESS_CONFIG.category}</span>
    },
    {
      id: "rating",
      label: "Google Rating",
      icon: null,
      value: (
        <div className="flex items-center gap-1.5">
          <span>{GOOGLE_RATING_SUMMARY.rating}</span>
          <div className="flex text-amber-500">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
            ))}
            <Star className="w-4 h-4 fill-amber-500/20 stroke-amber-500 text-amber-500" />
          </div>
        </div>
      )
    },
    {
      id: "feedback",
      label: "Verified Feedback",
      icon: null,
      value: <span>{GOOGLE_RATING_SUMMARY.totalReviews} Reviews</span>
    },
    {
      id: "location",
      label: "Showroom Location",
      icon: <MapPin className="w-4 h-4 text-amber-500" />,
      value: (
        <a
          href={BUSINESS_CONFIG.location.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-light text-stone-bg/85 hover:text-white transition-colors"
        >
          <span>Mukkam, Kozhikode</span>
          <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
        </a>
      )
    }
  ];

  return (
    <div className="bg-stone-dark text-stone-bg py-5 border-b border-stone-border/10 overflow-hidden relative">
      <div className="max-w-[100rem] mx-auto">
        <div className="w-full overflow-hidden">
          <div className="animate-marquee-left hover:[animation-play-state:paused] flex items-center gap-16 whitespace-nowrap">
            {/* Double the list for continuous marquee looping */}
            {[...items, ...items].map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center gap-16 shrink-0">
                <div className="flex flex-col items-start space-y-0.5">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-stone-bg/50 font-semibold">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2 font-serif text-sm sm:text-base text-stone-bg font-light leading-none">
                    {item.icon}
                    {item.value}
                  </div>
                </div>
                {/* Divider Line separator */}
                <div className="w-px h-6 bg-white/10 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
