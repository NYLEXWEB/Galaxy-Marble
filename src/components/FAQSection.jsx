"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What products are available at Galaxy Granite & Marble?",
      answer: "We offer premium natural stone slabs including imported white Italian marble, Black Galaxy granite, Khammam Black, Honey Blue, Leather Black, Steel Grey granite, kitchen countertops, staircases, and custom cut-to-size stones."
    },
    {
      question: "Where is Galaxy Granite & Marble showroom located?",
      answer: `Our physical showroom is located on Edavanna–Koyilandy Road, Mukkam, Kozhikode, Kerala (Pincode: 673602). We serve Kozhikode district and surrounding regions in Kerala.`
    },
    {
      question: "How can I get a price quotation?",
      answer: "You can select products from our online catalogue, add them to your enquiry basket, specify your required slab area in square feet, and submit the details to receive an instant price quote on WhatsApp."
    },
    {
      question: "What are your business operating hours?",
      answer: `Our physical showroom is open from Monday through Saturday, starting daily at ${BUSINESS_CONFIG.openingHours.opensAt}. You can easily schedule an appointment slot online using our Site Visit Booking form.`
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-stone-bg border-b border-stone-border">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-[#A8875A]">
            <HelpCircle className="w-4 h-4" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold">FAQ</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#111111] leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-taupe text-xs sm:text-sm max-w-md mx-auto font-light leading-relaxed">
            Find quick answers to common questions about our natural stones, showroom location, and price quotation process.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className="bg-stone-surface border border-stone-border rounded-xl overflow-hidden transition-all duration-300 shadow-xs"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-serif text-base sm:text-lg font-normal text-[#111111] hover:text-[#A8875A] transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#A8875A] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-taupe shrink-0" />
                  )}
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-48 border-t border-stone-border/60" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-stone-taupe text-xs sm:text-sm font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
