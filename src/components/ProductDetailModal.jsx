import React, { useState } from "react";
import { X, MessageSquare, Plus, Check, ShieldCheck, ArrowRight } from "lucide-react";
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#171717]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative bg-[#F5F1EA] border border-[#DED8CF] rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden my-8 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#171717]/80 text-white hover:bg-[#A8875A] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery (50%) */}
        <div className="w-full md:w-1/2 bg-[#171717] p-4 flex flex-col justify-between">
          
          {/* Main Large Image */}
          <div className="relative h-64 sm:h-80 md:h-96 rounded overflow-hidden bg-[#222]">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-[#171717]/90 text-[#A8875A] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-[#A8875A]/30">
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
                    activeImageIndex === idx ? "border-[#A8875A] opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Product Specs & CTAs (50%) */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Category & Code Header */}
            <div className="flex items-center justify-between text-xs text-[#817970]">
              <span className="uppercase tracking-widest font-bold text-[#A8875A]">
                {product.category} {product.subCategory ? `• ${product.subCategory}` : ""}
              </span>
              <span className="font-semibold bg-[#FBF9F5] px-2 py-0.5 rounded border border-[#DED8CF]">
                Code: {product.code || "GGM-SLAB"}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl font-bold text-[#171717]">
              {product.name}
            </h2>

            {/* Spec Sheet Table */}
            <div className="space-y-2 text-xs border-t border-b border-[#DED8CF] py-3 text-[#222]">
              <div className="flex justify-between py-1 border-b border-[#DED8CF]/40">
                <span className="text-[#817970]">Surface Finish:</span>
                <span className="font-semibold">{product.finish}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#DED8CF]/40">
                <span className="text-[#817970]">Slab Thickness:</span>
                <span className="font-semibold">{product.thickness}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#817970]">Suitable Applications:</span>
                <span className="font-semibold">{product.applications.join(", ")}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-[#817970] leading-relaxed">
              {product.description}
            </p>

            {/* Estimated Quantity Input */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-[#171717]">Estimated Area Needed (sq.ft):</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 40"
                className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded px-3 py-2 text-sm text-[#171717] focus:outline-none focus:border-[#A8875A]"
              />
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#DED8CF] space-y-2">
            
            {/* Get Price on WhatsApp */}
            <button
              onClick={handleDirectWhatsApp}
              className="w-full py-3 px-4 bg-[#171717] hover:bg-[#A8875A] text-white font-semibold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-[#A8875A] group-hover:text-white" />
              <span>Get Price on WhatsApp</span>
            </button>

            {/* Add to Enquiry List */}
            <button
              onClick={() => onAddToBasket(product, quantity)}
              className={`w-full py-2.5 px-4 font-semibold text-xs rounded flex items-center justify-center gap-2 transition-colors cursor-pointer border ${
                isInBasket
                  ? "bg-[#A8875A] text-white border-[#A8875A]"
                  : "bg-[#FBF9F5] hover:bg-[#DED8CF] text-[#171717] border-[#DED8CF]"
              }`}
            >
              {isInBasket ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Enquiry List</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-[#A8875A]" />
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
