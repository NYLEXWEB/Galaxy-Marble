import React from "react";
import { Star, MapPin, Building2, ExternalLink } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { GOOGLE_RATING_SUMMARY } from "../data/reviews";

export default function TrustBar() {
  return (
    <div className="bg-[#171717] text-white py-8 border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center divide-y md:divide-y-0 md:divide-x divide-[#333]">
          
          {/* Store Name & Category */}
          <div className="pt-4 md:pt-0 space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#A8875A] font-semibold">Store Category</span>
            <div className="flex items-center justify-center gap-1.5 font-serif text-lg text-white font-medium">
              <Building2 className="w-4 h-4 text-[#A8875A]" />
              <span>{BUSINESS_CONFIG.category}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="pt-4 md:pt-0 space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#A8875A] font-semibold">Google Rating</span>
            <div className="flex items-center justify-center gap-1.5 text-xl font-bold font-serif text-white">
              <span>{GOOGLE_RATING_SUMMARY.rating}</span>
              <div className="flex text-[#A8875A]">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#A8875A]" />
                ))}
                <Star className="w-4 h-4 fill-[#A8875A]/40 text-[#A8875A]" />
              </div>
            </div>
          </div>

          {/* Reviews Count */}
          <div className="pt-4 md:pt-0 space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#A8875A] font-semibold">Verified Feedback</span>
            <div className="flex items-center justify-center gap-1 text-lg font-serif text-white font-medium">
              <span>{GOOGLE_RATING_SUMMARY.totalReviews} Google Reviews</span>
            </div>
          </div>

          {/* Location */}
          <div className="pt-4 md:pt-0 space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#A8875A] font-semibold">Showroom Location</span>
            <a
              href={BUSINESS_CONFIG.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[#DED8CF] hover:text-[#A8875A] transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#A8875A]" />
              <span>Mukkam, Kerala 673602</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
