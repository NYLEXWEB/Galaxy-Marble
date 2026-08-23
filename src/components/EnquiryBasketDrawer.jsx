"use client";

import React, { useState } from "react";
import { X, Trash2, MessageSquare, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, ShieldAlert, Sparkles } from "lucide-react";
import { buildBasketWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

// Official WhatsApp Brand SVG Icon
const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
  </svg>
);

export default function EnquiryBasketDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearBasket,
  onExploreCollection
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSendWhatsAppEnquiry = (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    const whatsappMsg = buildBasketWhatsAppMessage(items, {
      name,
      phone,
      location,
      message
    });

    openWhatsApp(whatsappMsg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#171717]/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-[#FBF9F5] border-l border-[#DED8CF] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#171717] text-white flex items-center justify-between border-b border-[#333333]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#A8875A] text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-white leading-tight">
                  Enquiry Basket
                </h2>
                <span className="text-[11px] font-sans text-[#DED8CF]">
                  {items.length} {items.length === 1 ? "Slab Selected" : "Slabs Selected"}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer"
              aria-label="Close Enquiry Basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body: Items & Form */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Disclaimer Banner */}
            <div className="p-4 bg-white border border-[#DED8CF] rounded-xl text-xs text-[#817970] flex items-start gap-3 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#A8875A] flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Add your required granite &amp; marble slabs below. Click <strong className="text-[#171717]">Send Enquiry on WhatsApp</strong> to confirm live stock &amp; pricing with our Mukkam team.
              </p>
            </div>

            {/* Selected Items List */}
            {items.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#171717]">
                  <span>Selected Slabs ({items.length})</span>
                  <button
                    onClick={onClearBasket}
                    className="text-red-700 hover:underline cursor-pointer text-[11px]"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3.5 bg-white border border-[#DED8CF] hover:border-[#A8875A] rounded-xl flex items-center gap-3.5 relative shadow-xs transition-colors group"
                    >
                      {/* Image Thumbnail */}
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg border border-[#DED8CF]"
                      />

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-base font-bold text-[#171717] line-clamp-1">
                            {item.product.name}
                          </h4>
                          
                          {/* Delete Item Button */}
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1 text-[#817970] hover:text-red-700 transition-colors"
                            title="Remove stone"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-[11px] text-[#817970]">
                          {item.product.finish} Finish • {item.product.category}
                        </p>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[11px] font-bold text-[#171717]">Estimated Sq.Ft:</span>
                          <div className="flex items-center border border-[#DED8CF] rounded-lg bg-[#F5F1EA] overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(10, (parseInt(item.quantity, 10) || 40) - 10))}
                              className="px-2 py-1 text-xs text-[#171717] hover:bg-[#DED8CF]/60 transition-colors cursor-pointer"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => onUpdateQuantity(item.product.id, e.target.value)}
                              className="w-14 text-center text-xs font-bold focus:outline-none text-[#171717] bg-transparent"
                            />
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, (parseInt(item.quantity, 10) || 40) + 10)}
                              className="px-2 py-1 text-xs text-[#171717] hover:bg-[#DED8CF]/60 transition-colors cursor-pointer"
                              title="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Empty Basket View */
              <div className="text-center py-12 space-y-4 bg-white border border-[#DED8CF] rounded-2xl p-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#F5F1EA] text-[#A8875A] flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#171717]">
                  Your enquiry list is empty
                </h3>
                <p className="text-xs text-[#817970] max-w-xs mx-auto leading-relaxed">
                  Browse our natural granite and Italian marble catalogue to add your preferred stone slabs.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreCollection();
                  }}
                  className="px-6 py-3 bg-[#171717] hover:bg-[#A8875A] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-4 h-4 text-[#A8875A]" />
                </button>
              </div>
            )}

            {/* Customer Information Form (Only if items exist) */}
            {items.length > 0 && (
              <form onSubmit={handleSendWhatsAppEnquiry} className="space-y-4 pt-4 border-t border-[#DED8CF]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                    Contact Details (Optional)
                  </p>
                  <span className="text-[10px] text-[#A8875A] font-semibold">
                    Direct WhatsApp Dispatch
                  </span>
                </div>

                <div className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Rahul Verma)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#DED8CF] focus:border-[#A8875A] rounded-xl px-4 py-2.5 text-xs text-[#171717] outline-none transition-all"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#DED8CF] focus:border-[#A8875A] rounded-xl px-4 py-2.5 text-xs text-[#171717] outline-none transition-all"
                  />

                  <input
                    type="text"
                    placeholder="City / Location (e.g. Mukkam, Kozhikode)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-[#DED8CF] focus:border-[#A8875A] rounded-xl px-4 py-2.5 text-xs text-[#171717] outline-none transition-all"
                  />

                  <textarea
                    rows={2}
                    placeholder="Additional message or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-[#DED8CF] focus:border-[#A8875A] rounded-xl px-4 py-2.5 text-xs text-[#171717] outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs uppercase tracking-[0.18em] rounded-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>Send Enquiry on WhatsApp</span>
                </button>
              </form>
            )}

          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-[#F5F1EA] border-t border-[#DED8CF] text-[11px] font-semibold text-[#817970] text-center">
            Galaxy Granite &amp; Marble • Mukkam, Kozhikode
          </div>

        </div>

      </div>
    </div>
  );
}
