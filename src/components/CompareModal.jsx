import React from "react";
import { X, Scale, Trash2, MessageSquare, Check, ArrowRight } from "lucide-react";
import { buildSingleProductWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function CompareModal({ isOpen, onClose, compareItems = [], onRemoveFromCompare, onClearCompare }) {
  if (!isOpen) return null;

  const handleWhatsAppEnquiry = (product) => {
    const msg = buildSingleProductWhatsAppMessage(product, "40");
    openWhatsApp(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-dark/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      <div className="relative bg-stone-bg border border-stone-border rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-6 bg-stone-dark text-white flex items-center justify-between border-b border-stone-border/10">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-stone-accent" />
            <div>
              <h2 className="font-serif text-xl font-bold">Compare Stone Slabs</h2>
              <p className="text-xs text-stone-border">Side-by-side specification & finish comparison</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {compareItems.length > 0 && (
              <button
                onClick={onClearCompare}
                className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-border/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-x-auto">
          {compareItems.length > 0 ? (
            <div className="min-w-[600px] grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
              {compareItems.map((product) => (
                <div
                  key={product.id}
                  className="bg-stone-surface border border-stone-border rounded-xl p-5 space-y-4 flex flex-col justify-between shadow-xs relative"
                >
                  <button
                    onClick={() => onRemoveFromCompare(product.id)}
                    className="absolute top-3 right-3 p-1.5 bg-stone-dark/80 hover:bg-red-700 text-white rounded-full transition-colors z-10 cursor-pointer"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-3">
                    <div className="h-44 rounded-lg overflow-hidden border border-stone-border bg-stone-dark">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-semibold uppercase text-stone-accent">
                        {product.code} • {product.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-stone-dark line-clamp-1">
                        {product.name}
                      </h3>
                    </div>

                    {/* Spec Table */}
                    <div className="space-y-2 text-xs border-t border-b border-stone-border/60 py-3">
                      <div className="flex justify-between">
                        <span className="text-stone-taupe font-medium">Surface Finish:</span>
                        <span className="font-semibold text-stone-dark">{product.finish}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-taupe font-medium">Slab Thickness:</span>
                        <span className="font-semibold text-stone-dark">{product.thickness}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-taupe font-medium">Color Tone:</span>
                        <span className="font-semibold text-stone-dark">{product.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-taupe font-medium">Availability:</span>
                        <span className="font-semibold text-stone-dark">{product.availability}</span>
                      </div>
                    </div>

                    {/* Applications */}
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-taupe mb-1">
                        Recommended Uses
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {product.applications.map((app) => (
                          <span key={app} className="text-[10px] bg-stone-bg text-stone-dark px-2 py-0.5 rounded border border-stone-border">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleWhatsAppEnquiry(product)}
                      className="w-full py-2.5 px-3 bg-stone-dark hover:bg-stone-accent text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-stone-accent" />
                      <span>Get Price on WhatsApp</span>
                    </button>
                  </div>

                </div>
              ))}

              {/* Placeholder Card if less than 3 items */}
              {compareItems.length < 3 && (
                <div className="border-2 border-dashed border-stone-border rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-3 min-h-[350px]">
                  <Scale className="w-10 h-10 text-stone-border" />
                  <p className="text-xs text-stone-taupe font-medium">
                    Add another stone slab to compare specifications side-by-side.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <Scale className="w-12 h-12 text-stone-border mx-auto" />
              <h3 className="font-serif text-xl font-bold text-stone-dark">
                No stone slabs selected for comparison
              </h3>
              <p className="text-xs text-stone-taupe">
                Click the <strong>Compare</strong> icon on any product card in the catalogue to compare slabs.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
