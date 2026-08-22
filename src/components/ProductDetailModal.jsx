import React, { useState } from "react";
import { X, MessageSquare, Plus, Check } from "lucide-react";
import { buildSingleProductWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function ProductDetailModal({
  product,
  onClose,
  onAddToBasket,
  isInBasket
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState("40");
  const [userNote, setUserNote] = useState("");

  if (!product) return null;

  const handleDirectWhatsApp = () => {
    const msg = buildSingleProductWhatsAppMessage({
      product,
      quantity,
      userNote
    });
    openWhatsApp(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-dark/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative bg-stone-bg border border-stone-border rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden my-8 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-dark/80 text-white hover:bg-stone-accent transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery (50%) */}
        <div className="w-full md:w-1/2 bg-stone-dark p-4 flex flex-col justify-between">
          
          {/* Main Large Image */}
          <div className="relative h-64 sm:h-80 md:h-96 rounded overflow-hidden bg-stone-dark/40">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-stone-dark/95 text-amber-500 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded border border-amber-500/30">
              {product.category}
            </div>
          </div>

          {/* Thumbnail Selector */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-2 pt-3 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded border-2 overflow-hidden flex-shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx ? "border-stone-accent opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Product Info & CTAs (50%) */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Category & Code Header */}
            <div className="flex items-center justify-between text-xs text-stone-taupe">
              <span className="uppercase tracking-widest font-bold text-stone-accent">
                {product.category} {product.subCategory ? `• ${product.subCategory}` : ""}
              </span>
             
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl font-bold text-stone-dark">
              {product.name}
            </h2>

            {/* Description */}
            <p className="text-xs text-stone-taupe leading-relaxed pt-2 border-t border-stone-border">
              {product.description}
            </p>

            {/* Estimated Quantity Input */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-stone-dark">Estimated Area Needed (sq.ft):</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 40"
                className="w-full bg-stone-surface border border-stone-border rounded px-3 py-2 text-sm text-stone-dark focus:outline-none focus:border-stone-accent"
              />
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-stone-border space-y-2">
            
            {/* Get Price on WhatsApp */}
            <button
              onClick={handleDirectWhatsApp}
              className="w-full py-3 px-4 bg-stone-dark hover:bg-stone-accent text-white font-semibold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-stone-accent group-hover:text-white" />
              <span>Get Price on WhatsApp</span>
            </button>

            {/* Add to Enquiry List */}
            <button
              onClick={() => onAddToBasket(product, quantity)}
              className={`w-full py-3 px-4 font-bold text-xs uppercase tracking-[0.15em] rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                isInBasket
                  ? "bg-[#15803D] text-white border border-[#166534]"
                  : "bg-[#A8875A] hover:bg-[#8F7148] text-white border border-[#A8875A]"
              }`}
            >
              {isInBasket ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Added to Enquiry List</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-white" />
                  <span>Add to Enquiry List</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
