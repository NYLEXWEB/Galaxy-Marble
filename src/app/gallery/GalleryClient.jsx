"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EnquiryBasketDrawer from "../../components/EnquiryBasketDrawer";
import QuoteRequestModal from "../../components/QuoteRequestModal";
import FloatingActions from "../../components/FloatingActions";
import Toast from "../../components/Toast";
import { GALLERY_IMAGES } from "../../data/projects";
import { PRODUCTS } from "../../data/products";
import { Camera, MessageSquare } from "lucide-react";
import { buildQuoteRequestWhatsAppMessage, openWhatsApp } from "../../utils/whatsapp";

export default function GalleryClient() {
  const [basketItems, setBasketItems] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [toast, setToast] = useState(null);

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("galaxy_marble_enquiry_basket");
      if (saved) setBasketItems(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("galaxy_marble_enquiry_basket", JSON.stringify(basketItems));
    } catch (e) {
      console.error(e);
    }
  }, [basketItems, isMounted]);

  const handleUpdateBasketQuantity = (productId, newQuantity) => {
    setBasketItems((prev) =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: String(newQuantity) } : item
      )
    );
  };

  const handleRemoveFromBasket = (productId) => {
    setBasketItems((prev) => prev.filter(item => item.product.id !== productId));
  };

  const handleClearBasket = () => {
    setBasketItems([]);
  };

  const handleEnquireAboutStone = (stoneName) => {
    let requirement = `Enquiry about ${stoneName} slab design seen in Gallery`;
    const msg = buildQuoteRequestWhatsAppMessage({
      name: "Gallery Visitor",
      phone: "",
      requirement
    });
    openWhatsApp(msg);
  };

  const getCategory = (img) => {
    if (img.id.includes("showroom")) return "showroom";
    if (img.id.includes("black")) return "black-granite";
    if (img.id.includes("honey") || img.id.includes("safari")) return "exotic-granite";
    if (img.id.includes("steel") || img.image.toLowerCase().includes("steel")) return "grey-granite";
    if (img.id.includes("coffee") || img.id.includes("tumkur") || img.image.toLowerCase().includes("thumkoor") || img.image.toLowerCase().includes("coffee")) return "brown-red-granite";
    return "others";
  };

  const filteredImages = selectedFilter === "all"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => getCategory(img) === selectedFilter);

  const filters = [
    { id: "all", label: "All Works" },
    { id: "showroom", label: "Showroom Inventory" },
    { id: "black-granite", label: "Black Granite" },
    { id: "exotic-granite", label: "Exotic & Blue" },
    { id: "grey-granite", label: "Grey & Metallic" },
    { id: "brown-red-granite", label: "Brown & Red" }
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-stone-bg text-stone-text font-sans antialiased flex flex-col justify-between">
        <Navbar basketCount={0} onOpenBasket={() => {}} onOpenQuoteModal={() => {}} />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="animate-pulse text-stone-taupe tracking-wider text-xs uppercase">Loading Works...</div>
        </main>
        <Footer onOpenQuoteModal={() => {}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-bg text-stone-text font-sans antialiased flex flex-col justify-between selection:bg-stone-accent selection:text-stone-bg relative">
      <div>
        <Navbar
          basketCount={basketItems.length}
          onOpenBasket={() => setIsBasketOpen(true)}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        <main className="pt-8">
          <section className="py-16 sm:py-24 bg-[#111111] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,135,90,0.12),transparent_60%)]" />
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center space-y-6">
              <div className="inline-flex items-center gap-2 text-amber-500 mx-auto">
                <Camera className="w-4 h-4" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold">
                  Visual Showcase
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
                Natural Stone <span className="italic font-normal text-amber-500">Installation Gallery</span>
              </h1>
              <p className="text-stone-border/80 text-xs sm:text-sm leading-relaxed font-light font-sans max-w-xl mx-auto">
                Explore real, high-resolution photographs of our natural granite and imported marble slab installations inside Kerala homes and business facades.
              </p>
            </div>
          </section>

          <section className="py-8 bg-[#FBF9F5] border-y border-[#DED8CF]/60 sticky top-[64px] sm:top-[80px] z-30">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 overflow-x-auto">
              <div className="flex justify-start md:justify-center items-center gap-2 min-w-max pb-1">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-4 py-2 text-[10px] sm:text-xs uppercase font-bold tracking-wider rounded-lg transition-all cursor-pointer ${
                      selectedFilter === filter.id
                        ? "bg-[#111111] text-white shadow-sm"
                        : "bg-white text-stone-taupe hover:text-[#111111] border border-stone-border hover:border-stone-taupe"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-24 bg-stone-bg">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredImages.map((img) => (
                  <div
                    key={img.id}
                    className="bg-stone-surface border border-stone-border rounded-2xl overflow-hidden group shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-4/3 overflow-hidden bg-stone-accent-light">
                        <img
                          src={img.image}
                          alt={`${img.title} - ${img.stoneName} slab installed in Kozhikode, Kerala`}
                          className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 space-y-2">
                        <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#A8875A] block">
                          {img.stoneName}
                        </span>
                        <h3 className="font-serif text-lg font-semibold text-[#111111] leading-snug">
                          {img.title}
                        </h3>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2">
                      <button
                        onClick={() => handleEnquireAboutStone(img.stoneName)}
                        className="w-full py-2.5 bg-stone-accent-light hover:bg-[#A8875A]/10 text-stone-dark hover:text-[#A8875A] text-[10px] font-bold uppercase tracking-wider rounded-lg border border-stone-border hover:border-[#A8875A]/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Enquire on WhatsApp</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Footer onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <EnquiryBasketDrawer
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        items={basketItems}
        onUpdateQuantity={handleUpdateBasketQuantity}
        onRemoveItem={handleRemoveFromBasket}
        onClearBasket={handleClearBasket}
        onExploreCollection={() => {}}
      />

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <FloatingActions />
    </div>
  );
}
