import React, { useState, useMemo } from "react";
import { Search, Filter, MessageSquare, ShoppingBag, Eye, Sparkles, Check, ChevronRight } from "lucide-react";
import { PRODUCTS, CATEGORIES, APPLICATIONS, COLOR_TONES, SURFACES } from "../data/products";
import { buildSingleProductWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function ProductCatalogue({
  selectedCategoryFilter,
  selectedApplicationFilter,
  onSelectCategoryFilter,
  onSelectApplicationFilter,
  onViewProductDetail,
  onAddToBasket,
  basketItems = []
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedFinish, setSelectedFinish] = useState("All");

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCode = product.code.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesDescription = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesCategory && !matchesDescription) {
          return false;
        }
      }

      // Category filter
      if (selectedCategoryFilter !== "all") {
        const catObj = CATEGORIES.find(c => c.id === selectedCategoryFilter);
        if (catObj && product.category !== catObj.name) {
          return false;
        }
      }

      // Application filter
      if (selectedApplicationFilter !== "All") {
        if (!product.applications.includes(selectedApplicationFilter)) {
          return false;
        }
      }

      // Color Tone filter
      if (selectedColor !== "All") {
        if (product.colorTone !== selectedColor) {
          return false;
        }
      }

      // Surface Finish filter
      if (selectedFinish !== "All") {
        if (product.finish !== selectedFinish) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategoryFilter, selectedApplicationFilter, selectedColor, selectedFinish]);

  const handleWhatsAppQuickEnquiry = (e, product) => {
    e.stopPropagation();
    const msg = buildSingleProductWhatsAppMessage(product, "40");
    openWhatsApp(msg);
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
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-dark">
              Explore Natural Stone Slabs
            </h2>
            <p className="text-sm text-stone-taupe max-w-xl font-sans font-light leading-relaxed">
              Filter by category, color tone, or architectural application to inspect mirror-polished granite and imported marble.
            </p>
          </div>

          {/* Real-time Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, code, or finish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-surface border border-stone-border focus:border-stone-accent focus:ring-1 focus:ring-stone-accent rounded-lg pl-10 pr-4 py-3 text-xs text-stone-dark transition-all outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 bg-stone-surface border border-stone-border rounded-xl space-y-4 shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none whitespace-nowrap">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-taupe mr-2 flex-shrink-0 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-stone-accent" />
              <span>Category:</span>
            </span>

            <button
              onClick={() => onSelectCategoryFilter("all")}
              className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] rounded-lg transition-all flex-shrink-0 cursor-pointer ${
                selectedCategoryFilter === "all"
                  ? "bg-stone-dark text-stone-bg shadow-md"
                  : "bg-stone-bg text-stone-text hover:bg-stone-border/40"
              }`}
            >
              All Slabs ({PRODUCTS.length})
            </button>

            {CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter(p => p.category === cat.name).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategoryFilter(cat.id)}
                  className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] rounded-lg transition-all flex-shrink-0 cursor-pointer ${
                    selectedCategoryFilter === cat.id
                      ? "bg-stone-dark text-stone-bg shadow-md"
                      : "bg-stone-bg text-stone-text hover:bg-stone-border/40"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Secondary Sub-filters: Color & Application Dropdowns */}
          <div className="pt-3 border-t border-stone-border/60 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-4 text-xs">
              
              {/* Application Filter */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-taupe">Application:</span>
                <select
                  value={selectedApplicationFilter}
                  onChange={(e) => onSelectApplicationFilter(e.target.value)}
                  className="bg-stone-bg border border-stone-border text-stone-dark font-medium rounded-md px-3 py-1.5 focus:outline-none focus:border-stone-accent"
                >
                  <option value="All">All Applications</option>
                  {APPLICATIONS.map((app) => (
                    <option key={app.id} value={app.title}>{app.title}</option>
                  ))}
                </select>
              </div>

              {/* Color Tone Filter */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-taupe">Color Tone:</span>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="bg-stone-bg border border-stone-border text-stone-dark font-medium rounded-md px-3 py-1.5 focus:outline-none focus:border-stone-accent"
                >
                  <option value="All">All Colors</option>
                  {COLOR_TONES.map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              {/* Finish Filter */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-taupe">Surface Finish:</span>
                <select
                  value={selectedFinish}
                  onChange={(e) => setSelectedFinish(e.target.value)}
                  className="bg-stone-bg border border-stone-border text-stone-dark font-medium rounded-md px-3 py-1.5 focus:outline-none focus:border-stone-accent"
                >
                  <option value="All">All Finishes</option>
                  {SURFACES.map((surf) => (
                    <option key={surf} value={surf}>{surf}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Active Filters Clear Button */}
            {(selectedCategoryFilter !== "all" || selectedApplicationFilter !== "All" || selectedColor !== "All" || selectedFinish !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  onSelectCategoryFilter("all");
                  onSelectApplicationFilter("All");
                  setSelectedColor("All");
                  setSelectedFinish("All");
                  setSearchQuery("");
                }}
                className="text-xs text-red-700 font-semibold hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}

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
                      alt={product.name}
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
                        <span>Inspect Slab Specs</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content Info */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-stone-taupe">
                        <span>{product.finish} Finish</span>
                        <span>{product.thickness}</span>
                      </div>

                      <h3 className="font-serif text-xl font-light text-stone-dark group-hover:text-stone-accent transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-stone-taupe line-clamp-2 leading-relaxed font-light">
                        {product.description}
                      </p>
                    </div>

                    {/* Suitable Applications Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.applications.slice(0, 3).map((app) => (
                        <span key={app} className="text-[9px] uppercase tracking-wider bg-stone-bg text-stone-dark px-2 py-0.5 rounded border border-stone-border">
                          {app}
                        </span>
                      ))}
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
              No matching stone slabs found
            </h3>
            <p className="text-xs text-stone-taupe">
              Try adjusting your search term or resetting active category filters.
            </p>
            <button
              onClick={() => {
                onSelectCategoryFilter("all");
                onSelectApplicationFilter("All");
                setSelectedColor("All");
                setSelectedFinish("All");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 bg-stone-dark text-stone-bg text-xs font-semibold uppercase tracking-[0.18em] rounded-lg hover:bg-stone-accent transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
