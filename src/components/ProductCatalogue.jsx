"use client";

import React, { useState, useMemo } from "react";
import { Search, MessageSquare, ShoppingBag, Eye, Check } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { BUSINESS_CONFIG } from "../config/business";
import { buildSingleProductWhatsAppMessage, openWhatsAppWithImage } from "../utils/whatsapp";

export default function ProductCatalogue({
  onViewProductDetail,
  onAddToBasket,
  basketItems = []
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic based purely on Search Input
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return PRODUCTS;
    const q = searchQuery.toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesCode = product.code.toLowerCase().includes(q);
      const matchesCategory = product.category.toLowerCase().includes(q);
      const matchesDescription = product.description.toLowerCase().includes(q);
      return matchesName || matchesCode || matchesCategory || matchesDescription;
    });
  }, [searchQuery]);

  const handleWhatsAppQuickEnquiry = (e, product) => {
    e.stopPropagation();
    const msg = buildSingleProductWhatsAppMessage({ product, quantity: "40" });
    const imgUrl = product.images?.[0] || "";
    openWhatsAppWithImage(msg, imgUrl);
  };

  const handleAddToBasketClick = (e, product) => {
    e.stopPropagation();
    onAddToBasket(product, "40");
  };

  return (
    <section id="catalogue" className="py-16 sm:py-24 bg-stone-bg border-b border-stone-border">
      <div className="max-w-[100rem] mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-stone-dark">
              <span className="w-6 h-px bg-amber-500" />
              <span>Full Showroom Inventory</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient-gold">
              Galaxy Granite &amp; Marble Catalogue
            </h2>
            <p className="text-sm text-stone-taupe max-w-xl font-sans font-light leading-relaxed">
              Browse the live slab inventory at Galaxy Granite &amp; Marble showroom in Mukkam, Kozhikode. Search premium South Indian granites, imported white marbles, and high-density countertop stones.
            </p>
          </div>

          {/* Real-time Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by granite name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-surface border border-stone-border focus:border-stone-accent focus:ring-1 focus:ring-stone-accent rounded-lg pl-10 pr-4 py-3 text-xs text-stone-dark transition-all outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const inBasket = basketItems.some(i => i.product.id === product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => onViewProductDetail(product)}
                  className="group bg-stone-surface border border-stone-border hover:border-stone-accent rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between shimmer-hover relative"
                >
                  {/* Top Image Container */}
                  <div className="relative h-64 overflow-hidden bg-stone-dark">
                    <img
                      src={product.images[0]}
                      alt={`${product.name} natural stone slab - Galaxy Granite & Marble`}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Category Tag Badge */}
                    <span className="absolute top-3 left-3 glass-panel-dark text-amber-500 text-[9px] font-semibold uppercase tracking-[0.22em] px-2.5 py-1 rounded border border-amber-500/30 shadow-xs">
                      {product.category}
                    </span>

                    {/* Code Pill */}
                    <span className="absolute top-3 right-3 bg-stone-dark/80 text-stone-bg/80 text-[10px] font-mono px-2 py-0.5 rounded border border-stone-border/20">
                      {product.code}
                    </span>

                    {/* Quick View Floating Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-stone-dark/40 backdrop-blur-[2px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProductDetail(product);
                        }}
                        className="px-4 py-2 bg-stone-surface text-stone-dark font-bold text-xs uppercase tracking-[0.15em] rounded-lg shadow-xl flex items-center gap-1.5 hover:bg-stone-accent hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Inspect Slab</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content Info */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-bold text-stone-dark group-hover:text-stone-accent transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-stone-taupe line-clamp-3 leading-relaxed font-light">
                        {product.description}
                      </p>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-4 border-t border-stone-border/65">
                      
                      {/* Prominent Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        
                        {/* Prominent Add to Enquiry List Button */}
                        <button
                          onClick={(e) => handleAddToBasketClick(e, product)}
                          className={`py-2.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                            inBasket
                              ? "bg-[#15803D] text-white border border-[#166534]"
                              : "bg-[#A8875A] hover:bg-[#8F7148] text-white border border-[#A8875A]"
                          }`}
                        >
                          {inBasket ? (
                            <>
                              <Check className="w-4 h-4 text-white" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4 text-white" />
                              <span>+ Add List</span>
                            </>
                          )}
                        </button>

                        {/* WhatsApp Price Button */}
                        <button
                          onClick={(e) => handleWhatsAppQuickEnquiry(e, product)}
                          className="py-2.5 px-3 bg-stone-dark hover:bg-stone-accent text-stone-bg hover:text-stone-bg text-[10px] font-semibold uppercase tracking-[0.15em] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4 text-stone-accent group-hover:text-stone-bg" />
                          <span>Get Price</span>
                        </button>

                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-stone-surface border border-stone-border rounded-xl space-y-4">
            <Search className="w-12 h-12 text-stone-border mx-auto" />
            <h3 className="font-serif text-2xl font-light text-stone-dark">
              No matching granite slabs found
            </h3>
            <p className="text-xs text-stone-taupe">
              Try adjusting your search term.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-2.5 bg-stone-dark text-stone-bg text-xs font-semibold uppercase tracking-[0.18em] rounded-lg hover:bg-stone-accent transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
