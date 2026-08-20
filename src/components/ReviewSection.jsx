import React from "react";
import { Star, ExternalLink, Quote, ShieldCheck } from "lucide-react";
import { REVIEWS, GOOGLE_RATING_SUMMARY } from "../data/reviews";
import { BUSINESS_CONFIG } from "../config/business";

export default function ReviewSection() {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#F5F1EA] border-b border-[#DED8CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#A8875A]">
              Customer Experience
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              See what our customers say
            </h2>
            <p className="text-sm text-[#817970] max-w-lg">
              Verified feedback from Google Business listing for Galaxy Granite & Marble in Mukkam.
            </p>
          </div>

          {/* Rating Summary Pill */}
          <div className="p-4 bg-[#FBF9F5] border border-[#DED8CF] rounded flex items-center gap-4">
            <div className="text-center">
              <span className="font-serif text-3xl font-bold text-[#171717]">{GOOGLE_RATING_SUMMARY.rating}</span>
              <span className="text-xs text-[#817970] block">out of 5</span>
            </div>
            <div className="space-y-1">
              <div className="flex text-[#A8875A]">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#A8875A]" />
                ))}
                <Star className="w-4 h-4 fill-[#A8875A]/30 text-[#A8875A]" />
              </div>
              <p className="text-xs font-medium text-[#171717]">
                {GOOGLE_RATING_SUMMARY.totalReviews} Google Business Reviews
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-[#FBF9F5] border border-[#DED8CF] rounded space-y-4 shadow-xs relative flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-[#A8875A]/20 absolute top-4 right-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#A8875A]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#A8875A]" />
                  ))}
                </div>

                <p className="font-serif text-lg text-[#171717] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#DED8CF]/60 flex items-center justify-between text-xs text-[#817970]">
                <div className="flex items-center gap-1.5 font-semibold text-[#171717]">
                  <ShieldCheck className="w-4 h-4 text-[#A8875A]" />
                  <span>{rev.author}</span>
                </div>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Business Direct Link Banner */}
        <div className="p-6 bg-[#171717] text-white rounded border border-[#A8875A]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg font-bold">Have you visited our Mukkam showroom?</h3>
            <p className="text-xs text-[#DED8CF]">
              View all 35 Google Reviews or share your stone selection experience.
            </p>
          </div>

          <a
            href={BUSINESS_CONFIG.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#A8875A] hover:bg-[#8F7148] text-white text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Read All Google Reviews</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
