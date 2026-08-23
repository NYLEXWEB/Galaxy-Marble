import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { BUSINESS_CONFIG } from "../../config/business";

export const metadata = {
  title: `Privacy Policy | ${BUSINESS_CONFIG.name}`,
  description: `Privacy policy and information handling terms for ${BUSINESS_CONFIG.name}, Mukkam, Kerala.`,
};

export default function PrivacyPage() {
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
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold">Trust &amp; Privacy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#111111] leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#6B7280] font-light">
            Last Updated: August 23, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm sm:text-base font-light leading-relaxed text-[#333333]">
          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal">
              1. Overview
            </h2>
            <p>
              At <strong>{BUSINESS_CONFIG.name}</strong>, we are committed to respecting and protecting the privacy of visitors to our digital showroom. This policy describes how we handle information gathered when you request quotes, use our requirements calculator, or book showroom visits.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal">
              2. Information We Process
            </h2>
            <p>
              Our website functions primarily as an interactive digital showroom redirecting enquiries directly to WhatsApp:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>WhatsApp Redirection:</strong> When you request pricing, submit calculated requirements, or request site visits, the details you enter (name, phone, area, notes) are compiled into a WhatsApp link template. These details are processed locally in your browser and are not saved on our web servers.
              </li>
              <li>
                <strong>Local Storage:</strong> We use local storage (cookie-like client browser cache) to persist your active Enquiry Basket. This keeps your stone selections saved while you browse, and can be cleared by you at any time.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal">
              3. Service Areas and GBP Context
            </h2>
            <p>
              We operate as a physical building materials store located at:
              <br />
              <span className="inline-block mt-2 font-semibold text-[#111111]">{BUSINESS_CONFIG.location.fullAddress}</span>
            </p>
            <p>
              We serve customers across Kozhikode district and surrounding regions in Kerala, India. Information processed via our WhatsApp redirects is only utilized to respond to your direct commercial pricing requests.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal">
              4. Contact Us
            </h2>
            <p>
              If you have any questions about this privacy policy, you can contact us directly at our physical showroom address or call us at <strong>{BUSINESS_CONFIG.contact.phoneDisplay}</strong>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
