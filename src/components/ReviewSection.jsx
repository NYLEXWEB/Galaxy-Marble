"use client";

import React, { useState } from "react";
import { Star, ExternalLink, Quote, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { REVIEWS, GOOGLE_RATING_SUMMARY } from "../data/reviews";

// Official Google 'G' Multi-Color SVG Icon
const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} flex-shrink-0`} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

function ReviewCard({ rev }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 110;
  const isLongText = rev.comment.length > maxLength;

  const displayText = isExpanded || !isLongText
    ? rev.comment
    : `${rev.comment.substring(0, maxLength)}...`;

  return (
    <div className="w-72 sm:w-84 shrink-0 p-5 bg-white border border-[#DED8CF] hover:border-[#A8875A] rounded-xl space-y-4 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
      
      {/* Top Badge & Rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <GoogleIcon className="w-3.5 h-3.5" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#A8875A] bg-[#F5F1EA] px-2 py-0.5 rounded">
            Google Review
          </span>
        </div>

        <div className="flex text-amber-500">
          {[...Array(rev.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
          ))}
        </div>
      </div>

      {/* Quote Content */}
      <div className="space-y-2 flex-1">
        <Quote className="w-5 h-5 text-[#A8875A]/25" />
        <p className="font-sans text-xs text-[#171717] leading-relaxed">
          "{displayText}"
        </p>

        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700 mt-1 cursor-pointer underline transition-colors"
          >
            <span>{isExpanded ? "Read Less" : "Read More"}</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* Author Footer */}
      <div className="pt-3 border-t border-[#DED8CF]/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#171717] text-white font-serif font-bold flex items-center justify-center text-[11px] shrink-0">
            {rev.author.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 font-bold text-[#171717] truncate">
              <span className="truncate">{rev.author}</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-600 fill-emerald-100 shrink-0" />
            </div>
            {rev.tagline && (
              <span className="text-[9px] text-[#817970] font-sans block truncate">
                {rev.tagline}
              </span>
            )}
          </div>
        </div>

        <span className="text-[10px] font-mono text-[#817970] shrink-0 pl-1">
          {rev.date}
        </span>
      </div>

    </div>
  );
}

export default function ReviewSection() {
  return (
    <section id="reviews" className="py-14 sm:py-20 bg-[#FBF9F5] border-b border-[#DED8CF] relative overflow-hidden">
      
      {/* Ambient Decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#A8875A]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 space-y-12 relative z-10">
        
        {/* Header with Official Google Business Branding */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-[#DED8CF]/60">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#171717] text-white text-[11px] font-bold uppercase tracking-[0.2em]">
              <GoogleIcon className="w-4 h-4" />
              <span>Verified Google Reviews</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gradient-gold">
              Customer Reviews for Galaxy Granite &amp; Marble
            </h2>

            <p className="text-xs sm:text-sm text-[#817970] font-sans leading-relaxed">
              Authentic customer reviews for premium granites and custom kitchen countertop stones from our Google Business Profile in Mukkam, Kozhikode.
            </p>
          </div>

          {/* Official Google Business Score Badge Card */}
          <div className="p-4 bg-white border border-[#DED8CF] rounded-xl shadow-sm flex items-center gap-4 shrink-0">
            <div className="p-2.5 rounded-lg bg-[#F5F1EA] flex items-center justify-center">
              <GoogleIcon className="w-7 h-7" />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold text-[#171717]">
                  {GOOGLE_RATING_SUMMARY.rating}
                </span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                  ))}
                </div>
              </div>

              <p className="text-[11px] font-semibold text-[#817970]">
                Based on <span className="text-[#171717] font-bold">{GOOGLE_RATING_SUMMARY.totalReviews} Google Reviews</span>
              </p>
            </div>
          </div>

        </div>

        {/* Reviews Single Row Auto-Scrolling Marquee */}
        <div className="w-full overflow-hidden relative py-2">
          <div className="animate-marquee-right hover:[animation-play-state:paused] flex gap-5">
            {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((rev, index) => (
              <ReviewCard key={`${rev.id}-${index}`} rev={rev} />
            ))}
          </div>
        </div>

        {/* Direct Google Maps Review Link Banner */}
        <div className="p-6 sm:p-8 bg-[#171717] text-white rounded-2xl border border-[#A8875A]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          
          <div className="space-y-2 text-center sm:text-left relative z-10 max-w-xl">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <GoogleIcon className="w-5 h-5" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#A8875A]">
                Google Business Listing • Mukkam
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Have you bought stone slabs from Galaxy Marble?
            </h3>

            <p className="text-xs text-[#DED8CF] leading-relaxed">
              Read all verified customer reviews on Google Maps or leave your own feedback.
            </p>
          </div>

          <a
            href={GOOGLE_RATING_SUMMARY.googleMapsReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-[0.18em] rounded-xl inline-flex items-center gap-2.5 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shrink-0 cursor-pointer relative z-10"
          >
            <GoogleIcon className="w-4 h-4" />
            <span>Read Google Maps Reviews</span>
            <ExternalLink className="w-3.5 h-3.5 text-white" />
          </a>

        </div>

      </div>
    </section>
  );
}
