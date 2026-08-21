import React, { useState } from "react";
import { MapPin, Clock, Phone, Send, Calendar, MessageSquare, Mail, CheckCircle2 } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";
import { buildQuoteRequestWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function ShowroomLocationSection({ onOpenSiteVisitModal }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    requirement: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsAppContact = () => {
    const msg = buildQuoteRequestWhatsAppMessage({
      name: "Showroom Visitor",
      phone: "",
      requirement: "Location & Visit Information"
    });
    openWhatsApp(msg);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;

    // Construct mailto link to launch email app with pre-filled values
    const recipientEmail = "galaxygranitemukkam@gmail.com";
    const subject = encodeURIComponent(`Stone Enquiry from ${formData.name} — Galaxy Marble Website`);
    const body = encodeURIComponent(
      `Hello Galaxy Granite & Marble Team,\n\nI am interested in natural stone slabs from your Mukkam showroom.\n\n` +
      `Client Details:\n` +
      `• Name: ${formData.name}\n` +
      `• Phone/Email: ${formData.contact}\n` +
      `• Requirement: ${formData.requirement || "General Stone Enquiry"}\n\n` +
      `Sent via Galaxy Granite & Marble Digital Showroom`
    );

    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FBF9F5] border-b border-[#DED8CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#171717] text-white text-[11px] font-bold uppercase tracking-[0.2em] justify-center">
            <Mail className="w-3.5 h-3.5 text-[#A8875A]" />
            <span>Direct Showroom Enquiries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gradient-gold">
            Get In Touch With Our Experts
          </h2>
          <p className="text-sm text-[#817970] font-sans leading-relaxed">
            Send us your requirement details via Email or WhatsApp. Our showroom specialists in Mukkam will respond promptly.
          </p>
        </div>

        {/* Contact Info & Email Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Information Card Column (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#DED8CF] rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-sm">
            
            <div className="space-y-6">
              <div className="border-b border-[#DED8CF]/60 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#171717]">
                  {BUSINESS_CONFIG.name}
                </h3>
                <p className="text-xs text-[#A8875A] font-bold uppercase tracking-[0.18em] mt-1">
                  {BUSINESS_CONFIG.category}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#F5F1EA] text-[#171717]">
                  <MapPin className="w-5 h-5 text-[#A8875A]" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#171717] uppercase tracking-wider">
                    Showroom Location
                  </span>
                  <p className="text-sm text-[#817970] mt-0.5 leading-relaxed">
                    {BUSINESS_CONFIG.location.fullAddress}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#F5F1EA] text-[#171717]">
                  <Clock className="w-5 h-5 text-[#A8875A]" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#171717] uppercase tracking-wider">
                    Operating Schedule
                  </span>
                  <p className="text-sm text-[#817970] mt-0.5">
                    {BUSINESS_CONFIG.openingHours.scheduleText}
                  </p>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#F5F1EA] text-[#171717]">
                  <Phone className="w-5 h-5 text-[#A8875A]" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-[#171717] uppercase tracking-wider">
                    Direct Phone Support
                  </span>
                  <a
                    href={`tel:${BUSINESS_CONFIG.contact.phoneDisplay}`}
                    className="text-sm font-bold text-[#171717] hover:text-[#A8875A] transition-colors"
                  >
                    {BUSINESS_CONFIG.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-6 border-t border-[#DED8CF]/60 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleWhatsAppContact}
                  className="py-3 px-4 bg-[#171717] hover:bg-[#A8875A] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#A8875A] group-hover:text-white" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={onOpenSiteVisitModal}
                  className="py-3 px-4 bg-[#F5F1EA] hover:bg-[#171717] hover:text-white text-[#171717] text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 border border-[#DED8CF] transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#A8875A]" />
                  <span>Site Visit</span>
                </button>
              </div>
            </div>

          </div>

          {/* New Email Contact Form Card (7 cols) replacing Showroom Directions */}
          <div className="lg:col-span-7 bg-[#171717] text-white rounded-2xl border border-[#A8875A]/40 overflow-hidden relative shadow-xl p-6 sm:p-8 flex flex-col justify-between">
            
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#A8875A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8875A]">
                    Email Enquiry Form
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Send Us a Direct Email
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-white/10 text-[#A8875A]">
                  <Send className="w-6 h-6" />
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#DED8CF]">
                    Your Name <span className="text-[#A8875A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 focus:border-[#A8875A] focus:ring-1 focus:ring-[#A8875A] rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-all"
                  />
                </div>

                {/* Phone / Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#DED8CF]">
                    Phone Number or Email <span className="text-[#A8875A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. +91 98765 43210 or name@example.com"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 focus:border-[#A8875A] focus:ring-1 focus:ring-[#A8875A] rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-all"
                  />
                </div>

                {/* Requirement Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#DED8CF]">
                    Stone Requirement / Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Looking for Black Galaxy granite countertops and white Italian marble for living room (500 sq.ft)"
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 focus:border-[#A8875A] focus:ring-1 focus:ring-[#A8875A] rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#A8875A] hover:bg-[#8F7148] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Opening Email App...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Send Message (Opens Email App)</span>
                    </>
                  )}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
