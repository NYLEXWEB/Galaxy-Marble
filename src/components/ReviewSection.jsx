import React from "react";
import { Star, ExternalLink, Quote, ShieldCheck } from "lucide-react";
import { REVIEWS, GOOGLE_RATING_SUMMARY } from "../data/reviews";
import { BUSINESS_CONFIG } from "../config/business";

export default function ReviewSection() {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-stone-bg border-b border-stone-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-stone-dark">
              <span className="w-6 h-px bg-amber-500" />
              <span>Customer Experience</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-dark">
              See what our customers say
            </h2>
            <p className="text-sm text-stone-taupe max-w-lg">
              Verified feedback from Google Business listing for Galaxy Granite & Marble in Mukkam.
            </p>
          </div>

          {/* Rating Summary Pill */}
          <div className="p-4 bg-stone-surface border border-stone-border rounded flex items-center gap-4">
            <div className="text-center">
              <span className="font-serif text-3xl font-bold text-stone-dark">{GOOGLE_RATING_SUMMARY.rating}</span>
              <span className="text-xs text-stone-taupe block">out of 5</span>
            </div>
            <div className="space-y-1">
              <div className="flex text-amber-500">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                ))}
                <Star className="w-4 h-4 fill-amber-500/20 stroke-amber-500 text-amber-500" />
              </div>
              <p className="text-xs font-medium text-stone-dark">
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
              className="p-6 bg-stone-surface border border-stone-border rounded space-y-4 shadow-xs relative flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-stone-accent/20 absolute top-4 right-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                  ))}
                </div>

                <p className="font-serif text-lg text-stone-dark leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-border/60 flex items-center justify-between text-xs text-stone-taupe">
                <div className="flex items-center gap-1.5 font-semibold text-stone-dark">
                  <ShieldCheck className="w-4 h-4 text-stone-accent" />
                  <span>{rev.author}</span>
                </div>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Business Direct Link Banner */}
        <div className="p-6 bg-stone-dark text-white rounded border border-stone-accent/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg font-bold">Have you visited our Mukkam showroom?</h3>
            <p className="text-xs text-stone-border">
              View all 35 Google Reviews or share your stone selection experience.
            </p>
          </div>

          <a
            href={BUSINESS_CONFIG.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-stone-accent hover:bg-stone-accent-dark text-white text-xs font-bold uppercase tracking-wider rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Read All Google Reviews</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
