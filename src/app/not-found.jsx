import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, ShoppingBag, Phone } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";

export const metadata = {
  title: `Page Not Found | ${BUSINESS_CONFIG.name}`,
  description: "Sorry, the page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans antialiased flex flex-col items-center justify-center p-6 selection:bg-[#111111] selection:text-[#FAFAFA]">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Error Code & Graphic */}
        <div className="space-y-2">
          <span className="font-serif text-8xl sm:text-9xl font-extralight text-[#A8875A]/20 tracking-tighter block select-none">
            404
          </span>
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#A8875A] font-semibold block">
            Entry Not Found
          </span>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#111111]">
            Lost in the details.
          </h1>
          <p className="text-sm text-[#6B7280] font-light leading-relaxed">
            The page you are looking for has either been moved, renamed, or is temporarily unavailable. Let us guide you back to our natural stone collections.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Link
            href="/"
            className="px-6 py-3.5 bg-[#111111] hover:bg-[#A8875A] text-white font-medium text-xs uppercase tracking-[0.2em] transition-all rounded flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Showroom</span>
          </Link>

          <Link
            href="/#catalogue"
            className="px-6 py-3.5 bg-transparent hover:bg-stone-border/20 text-[#111111] border border-[#111111]/20 hover:border-[#111111] font-medium text-xs uppercase tracking-[0.2em] transition-all rounded flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#A8875A]" />
            <span>Browse Slabs Inventory</span>
          </Link>
        </div>

        {/* Footer Business Context */}
        <div className="pt-8 border-t border-[#E5E7EB] text-[10px] text-[#6B7280] tracking-widest uppercase">
          {BUSINESS_CONFIG.name} · Est. 1998
        </div>

      </div>
    </div>
  );
}
