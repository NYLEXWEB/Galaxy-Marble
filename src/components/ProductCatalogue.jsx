import React, { useState, useMemo } from "react";
import { Search, Filter, MessageSquare, ShoppingBag, Eye, Sparkles, Check, ChevronRight, Scale } from "lucide-react";
import { PRODUCTS, CATEGORIES, APPLICATIONS, COLOR_TONES, SURFACES } from "../data/products";
import { buildSingleProductWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function ProductCatalogue({
  selectedCategoryFilter,
  selectedApplicationFilter,
  onSelectCategoryFilter,
  onSelectApplicationFilter,
  onViewProductDetail,
  onAddToBasket,
  basketItems = [],
  compareItems = [],
  onToggleCompare
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
    <section id="catalogue" className="py-16 sm:py-24 bg-[#F5F1EA] border-b border-[#DED8CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#A8875A]/15 text-[#A8875A] text-xs font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Showroom Inventory</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171717]">
              Explore Natural Stone Slabs
            </h2>
            <p className="text-sm sm:text-base text-[#817970] max-w-xl font-sans">
              Filter by category, color tone, or architectural application to inspect mirror-polished granite and imported marble.
            </p>
          </div>

          {/* Real-time Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#817970] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, code, or finish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FBF9F5] border border-[#DED8CF] focus:border-[#A8875A] focus:ring-1 focus:ring-[#A8875A] rounded-lg pl-10 pr-4 py-3 text-xs text-[#171717] transition-all outline-none shadow-xs"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 bg-[#FBF9F5] border border-[#DED8CF] rounded-xl space-y-4 shadow-xs">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none whitespace-nowrap">
            <span className="text-xs font-bold uppercase tracking-wider text-[#817970] mr-2 flex-shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#A8875A]" />
              <span>Category:</span>
            </span>

            <button
              onClick={() => onSelectCategoryFilter("all")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex-shrink-0 cursor-pointer ${
                selectedCategoryFilter === "all"
                  ? "bg-[#171717] text-white shadow-md"
                  : "bg-[#F5F1EA] text-[#222] hover:bg-[#DED8CF]"
              }`}
            >
              All Categories ({PRODUCTS.length})
            </button>

            {CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter(p => p.category === cat.name).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategoryFilter(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex-shrink-0 cursor-pointer ${
                    selectedCategoryFilter === cat.id
                      ? "bg-[#171717] text-white shadow-md"
                      : "bg-[#F5F1EA] text-[#222] hover:bg-[#DED8CF]"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Secondary Sub-filters: Color & Application Dropdowns */}
          <div className="pt-3 border-t border-[#DED8CF]/60 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-4 text-xs">
              
              {/* Application Filter */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#817970]">Application:</span>
                <select
                  value={selectedApplicationFilter}
                  onChange={(e) => onSelectApplicationFilter(e.target.value)}
                  className="bg-[#F5F1EA] border border-[#DED8CF] text-[#171717] font-medium rounded-md px-3 py-1.5 focus:outline-none focus:border-[#A8875A]"
                >
                  <option value="All">All Applications</option>
                  {APPLICATIONS.map((app) => (
                    <option key={app.id} value={app.title}>{app.title}</option>
                  ))}
                </select>
              </div>

              {/* Color Tone Filter */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#817970]">Color Tone:</span>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="bg-[#F5F1EA] border border-[#DED8CF] text-[#171717] font-medium rounded-md px-3 py-1.5 focus:outline-none focus:border-[#A8875A]"
                >
                  <option value="All">All Colors</option>
                  {COLOR_TONES.map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              {/* Finish Filter */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#817970]">Surface Finish:</span>
                <select
                  value={selectedFinish}
                  onChange={(e) => setSelectedFinish(e.target.value)}
                  className="bg-[#F5F1EA] border border-[#DED8CF] text-[#171717] font-medium rounded-md px-3 py-1.5 focus:outline-none focus:border-[#A8875A]"
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
              const isCompared = compareItems.some(i => i.id === product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => onViewProductDetail(product)}
                  className="group bg-[#FBF9F5] border border-[#DED8CF] hover:border-[#A8875A] rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between shimmer-hover relative"
                >
                  {/* Top Image Container */}
                  <div className="relative h-64 overflow-hidden bg-[#171717]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Category Tag Badge */}
                    <span className="absolute top-3 left-3 glass-panel-dark text-[#A8875A] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-[#A8875A]/40 shadow-xs">
                      {product.category}
                    </span>

                    {/* Code Pill */}
                    <span className="absolute top-3 right-3 bg-[#171717]/80 text-[#DED8CF] text-[10px] font-mono px-2 py-0.5 rounded">
                      {product.code}
                    </span>

                    {/* Quick View Floating Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#171717]/40 backdrop-blur-[2px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProductDetail(product);
                        }}
                        className="px-4 py-2 bg-[#FBF9F5] text-[#171717] font-bold text-xs uppercase tracking-wider rounded-lg shadow-xl flex items-center gap-1.5 hover:bg-[#A8875A] hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Inspect Slab Specs</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content Info */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-[#817970]">
                        <span>{product.finish} Finish</span>
                        <span>{product.thickness}</span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#171717] group-hover:text-[#A8875A] transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#817970] line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Suitable Applications Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.applications.slice(0, 3).map((app) => (
                        <span key={app} className="text-[10px] font-medium bg-[#F5F1EA] text-[#222] px-2 py-0.5 rounded border border-[#DED8CF]">
                          {app}
                        </span>
                      ))}
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-4 border-t border-[#DED8CF]/60 space-y-2.5">
                      
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-[#A8875A]">Price Status</span>
                          <span className="font-bold text-[#171717]">{product.priceStatus}</span>
                        </div>

                        {/* Compare Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleCompare) onToggleCompare(product);
                          }}
                          className={`px-2.5 py-1.5 rounded-md border text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                            isCompared
                              ? "bg-[#171717] text-[#A8875A] border-[#A8875A]"
                              : "bg-[#F5F1EA] text-[#817970] border-[#DED8CF] hover:border-[#A8875A] hover:text-[#171717]"
                          }`}
                          title={isCompared ? "In Compare List" : "Compare Stone Specs"}
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span>{isCompared ? "Compared" : "Compare"}</span>
                        </button>
                      </div>

                      {/* Prominent Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-0.5">
                        
                        {/* Prominent Add to Enquiry List Button */}
                        <button
                          onClick={(e) => handleAddToBasketClick(e, product)}
                          className={`py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                            inBasket
                              ? "bg-emerald-800 text-white border border-emerald-700"
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
                              <span>+ Add to List</span>
                            </>
                          )}
                        </button>

                        {/* WhatsApp Price Button */}
                        <button
                          onClick={(e) => handleWhatsAppQuickEnquiry(e, product)}
                          className="py-2.5 px-3 bg-[#171717] hover:bg-[#333] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4 text-[#A8875A]" />
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
          <div className="text-center py-16 bg-[#FBF9F5] border border-[#DED8CF] rounded-xl space-y-4">
            <Search className="w-12 h-12 text-[#DED8CF] mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-[#171717]">
              No matching stone slabs found
            </h3>
            <p className="text-xs text-[#817970]">
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
              className="px-6 py-2.5 bg-[#171717] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#A8875A] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
