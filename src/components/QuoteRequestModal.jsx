"use client";

import React, { useState } from "react";
import { X, MessageSquare, Image as ImageIcon } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { buildQuoteRequestWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function QuoteRequestModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState("Kitchen Countertop");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = buildQuoteRequestWhatsAppMessage({
      name,
      phone,
      requirement,
      product: selectedProduct,
      quantity,
      location,
      message
    });
    openWhatsApp(msg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-dark/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      <div className="relative bg-stone-bg border border-stone-border rounded-lg shadow-2xl max-w-lg w-full overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-stone-dark text-white flex items-center justify-between border-b border-stone-border/10">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-500" />
            <h2 className="font-serif text-xl font-bold">Request a Stone Quote</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-border/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-stone-taupe mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Nair"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-stone-surface border border-stone-border rounded p-2.5 text-xs text-stone-dark focus:outline-none focus:border-stone-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-taupe mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98470 00000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-stone-surface border border-stone-border rounded p-2.5 text-xs text-stone-dark focus:outline-none focus:border-stone-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-taupe mb-1">
                Requirement Type
              </label>
              <select
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className="w-full bg-stone-surface border border-stone-border rounded p-2.5 text-xs text-stone-dark"
              >
                <option value="Kitchen Countertop">Kitchen Countertop</option>
                <option value="Staircase Treads">Staircase Treads</option>
                <option value="Room Flooring">Room Flooring</option>
                <option value="Bathroom Vanity">Bathroom Vanity</option>
                <option value="Interior Wall">Interior Wall</option>
                <option value="Exterior Paving">Exterior Paving</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-taupe mb-1">
                Approx. Quantity (sq.ft)
              </label>
              <input
                type="text"
                placeholder="e.g. 50 sq.ft"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-stone-surface border border-stone-border rounded p-2.5 text-xs text-stone-dark"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-taupe mb-1">
              Preferred Stone (Optional)
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full bg-stone-surface border border-stone-border rounded p-2.5 text-xs text-stone-dark"
            >
              <option value="">-- Choose Stone Slab --</option>
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-taupe mb-1">
              Delivery / Project Location
            </label>
            <input
              type="text"
              placeholder="e.g. Mukkam, Kozhikode"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-stone-surface border border-stone-border rounded p-2.5 text-xs text-stone-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-taupe mb-1">
              Additional Details / Message
            </label>
            <textarea
              rows={2}
              placeholder="Describe edge profiling, custom cuts, or delivery timeline..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-stone-surface border border-stone-border rounded p-2.5 text-xs text-stone-dark"
            />
          </div>

          {/* Reference Image Note */}
          <div className="p-3 bg-stone-surface border border-stone-border rounded text-[11px] text-stone-taupe flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-amber-500" />
            <span>Reference plan or design photos can be attached directly inside WhatsApp!</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-stone-dark hover:bg-stone-accent text-white font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <MessageSquare className="w-4 h-4 text-amber-500" />
            <span>Send Request on WhatsApp</span>
          </button>

        </form>

      </div>
    </div>
  );
}
