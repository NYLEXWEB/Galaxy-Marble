import React, { useState } from "react";
import { X, Calendar, MessageSquare, MapPin } from "lucide-react";
import { buildSiteVisitWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function SiteVisitModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [requirement, setRequirement] = useState("Showroom Slabs Selection");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = buildSiteVisitWhatsAppMessage({
      name,
      phone,
      location,
      requirement,
      preferredDate,
      message
    });
    openWhatsApp(msg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#171717]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      <div className="relative bg-[#F5F1EA] border border-[#DED8CF] rounded-lg shadow-2xl max-w-lg w-full overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-[#171717] text-white flex items-center justify-between border-b border-[#333]">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#A8875A]" />
            <h2 className="font-serif text-xl font-bold">Request Showroom Visit</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#333] text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="p-3 bg-[#FBF9F5] border border-[#DED8CF] rounded text-xs text-[#817970] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#A8875A]" />
            <span>Visit Galaxy Granite & Marble showroom in Edavanna–Koyilandy, Mukkam, Kerala.</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#817970] mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Anish Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#A8875A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#817970] mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              placeholder="+91 94474 20000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded p-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#A8875A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#817970] mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded p-2.5 text-xs text-[#171717]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#817970] mb-1">
                Primary Interest
              </label>
              <select
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded p-2.5 text-xs text-[#171717]"
              >
                <option value="Showroom Slabs Inspection">Granite Slabs Inspection</option>
                <option value="Marble Flooring Selection">Marble Selection</option>
                <option value="Kitchen Countertop Selection">Kitchen Slab Selection</option>
                <option value="General Home Building Consultation">Home Building Consultation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#817970] mb-1">
              Location / City
            </label>
            <input
              type="text"
              placeholder="e.g. Mukkam, Kozhikode"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded p-2.5 text-xs text-[#171717]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#817970] mb-1">
              Notes for Showroom Team
            </label>
            <textarea
              rows={2}
              placeholder="Any specific stone shade or slab dimensions you wish to inspect..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded p-2.5 text-xs text-[#171717]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-[#171717] hover:bg-[#A8875A] text-white font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <MessageSquare className="w-4 h-4 text-[#A8875A]" />
            <span>Confirm Visit via WhatsApp</span>
          </button>

        </form>

      </div>
    </div>
  );
}
