import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { BUSINESS_CONFIG } from "../../config/business";

export const metadata = {
  title: `Terms of Service | ${BUSINESS_CONFIG.name}`,
  description: `Showroom visit policies, quote request guidelines, and terms of service for ${BUSINESS_CONFIG.name}, Mukkam, Kerala.`,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-[#FAFAFA] py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#6B7280] hover:text-[#111111] transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Showroom</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-16 border-b border-[#E5E7EB] pb-8">
          <div className="flex items-center gap-2.5 text-[#A8875A]">
            <FileText className="w-5 h-5" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold">Policies &amp; Guidelines</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#111111] leading-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-[#6B7280] font-light">
            Last Updated: August 23, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm sm:text-base font-light leading-relaxed text-[#333333]">
          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the digital showroom of <strong>{BUSINESS_CONFIG.name}</strong> (`{BUSINESS_CONFIG.name}`), you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any local laws in Kozhikode, Kerala, or India.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal">
              2. Slabs Inventory &amp; Showroom Quotes
            </h2>
            <p>
              The products listed in our digital catalogue represent natural granite and marble slab categories. 
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Price on Request:</strong> Because natural stone pricing varies based on lot size, thickness, color variations, and market availability, all prices displayed are indicative or provided on request. Exact quotations are issued only when verified by our showroom representatives.
              </li>
              <li>
                <strong>Calculated Estimates:</strong> All area calculations generated using our interactive requirements calculator are approximate margins. Customers are advised to have final sizes verified by their site architects or masonry workers before ordering.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal">
              3. Booking Showroom Site Visits
            </h2>
            <p>
              We provide slot scheduling requests for physical slab inspection at our showroom located at {BUSINESS_CONFIG.location.address}. Scheduling a slot does not guarantee priority availability of specific premium lots, as natural stone is sold on a first-come, first-served basis. Please contact us via phone/WhatsApp if you require urgent confirmations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal">
              4. Governing Law
            </h2>
            <p>
              These terms are governed by and construed in accordance with the laws of Kozhikode, Kerala, India, and you irrevocably submit to the exclusive jurisdiction of the courts in Kozhikode.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
