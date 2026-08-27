"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import EnquiryBasketDrawer from "../../../components/EnquiryBasketDrawer";
import QuoteRequestModal from "../../../components/QuoteRequestModal";
import FloatingActions from "../../../components/FloatingActions";
import Toast from "../../../components/Toast";
import { PRODUCTS } from "../../../data/products";
import { Home, ArrowRight, ShieldCheck, CloudRain, Footprints, ChevronRight, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function ExteriorClient() {
  const [basketItems, setBasketItems] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [toast, setToast] = useState(null);

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [faqIndex, setFaqIndex] = useState(null);

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

  const handleAddToBasket = (product) => {
    setBasketItems((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev;
      return [...prev, { product, quantity: "40", unit: "sq.ft" }];
    });
    setToast({
      message: `${product.name} added to Enquiry List`,
      type: "basket"
    });
  };

  const matchingStones = PRODUCTS.filter(p => 
    p.applications.includes("Exterior") && 
    (p.id.includes("leather-black") || p.id.includes("tumkur") || p.id.includes("steel-grey"))
  );

  const faqs = [
    {
      q: "Why is natural granite better than cement interlocking tiles for driveways?",
      a: "Cement tiles are porous and absorb water, leading to rapid organic algae growth, moss, and structural sagging under vehicle weight. Granite slabs do not absorb water, support heavy loads without sinking, and are easily cleaned with a high-pressure hose."
    },
    {
      q: "What granite finish should I choose for rain-exposed walkways?",
      a: "We strongly recommend a brushed leather or flamed finish. These textured surfaces create natural friction and prevent slipping during heavy monsoon showers, keeping outdoor spaces safe."
    },
    {
      q: "Will red or dark granites fade under direct tropical sunlight?",
      a: "Natural granite colors are permanent. Because they are composed of natural volcanic minerals (quartz, feldspar, mica), they are completely UV-stable and will not fade, melt, or discolour like synthetic resin-based tiles."
    }
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-stone-bg text-stone-text font-sans antialiased flex flex-col justify-between">
        <Navbar basketCount={0} onOpenBasket={() => {}} onOpenQuoteModal={() => {}} />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="animate-pulse text-stone-taupe tracking-wider text-xs uppercase">Loading Outdoor Slabs...</div>
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
          {/* Breadcrumbs */}
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
            <div className="flex items-center gap-2 text-xs text-stone-taupe font-medium">
              <Link href="/" className="hover:text-stone-dark transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/services" className="hover:text-stone-dark transition-colors">Services</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-stone-dark font-semibold">Exterior Paving</span>
            </div>
          </div>

          {/* Hero Section */}
          <section className="relative py-16 sm:py-24 bg-[#111111] text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,135,90,0.15),transparent_60%)]" />
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 text-amber-500">
                  <Home className="w-4 h-4" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold">
                    Outdoor Slabs
                  </span>
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
                  Weather-Durable <br />
                  <span className="italic font-normal text-amber-500">Outdoor Paving Granite Slabs</span>
                </h1>
                <p className="text-stone-border/80 text-sm sm:text-base leading-relaxed font-light font-sans max-w-xl">
                  Slip-resistant natural granite slabs for driveways, parking, and building facades designed to survive heavy rains and hot summer sun in Kerala.
                </p>
              </div>
            </div>
          </section>

          {/* Service Overview & Benefits */}
          <section className="py-16 sm:py-24 bg-stone-bg">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* Visual Card */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="overflow-hidden rounded-2xl border border-stone-border shadow-md">
                    <img
                      src="/Granites/Thumkoor red.jpg"
                      alt="Weather-proof Tumkur Red Granite slabs for outdoor entries in Kozhikode"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="bg-[#FBF9F5] p-6 rounded-2xl border border-[#DED8CF]/60 space-y-4">
                    <h3 className="font-serif text-lg font-semibold text-[#111111]">
                      Paving Slab Specifications
                    </h3>
                    <ul className="space-y-2.5 text-xs text-stone-taupe leading-relaxed">
                      <li><strong>Stones:</strong> Leather Black, Tumkur Red, Steel Grey</li>
                      <li><strong>Finishes:</strong> Brushed Leather / Matte Flamed</li>
                      <li><strong>Thickness:</strong> 20mm standard load capacity</li>
                      <li><strong>Resistance:</strong> Moss, algae, water, UV fading</li>
                    </ul>
                  </div>
                </div>

                {/* Narrative */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-4">
                    <h2 className="font-serif text-3xl font-semibold text-[#111111]">
                      Monsoon Safe &amp; Heavy Vehicle Load Compliant
                    </h2>
                    <p className="text-stone-taupe text-sm sm:text-base leading-relaxed font-light">
                      Exterior surfaces in Kerala must survive heavy monsoon rains, intense summer sun, and organic moss growth. Our exterior paving collection provides thick, hard-wearing granite slabs with matte, flamed, or textured leather finishes that ensure safety underfoot and keep structural integrity.
                    </p>
                    <p className="text-stone-taupe text-sm sm:text-base leading-relaxed font-light">
                      We offer a selection of dense stone types that resist slipping and withstand heavy vehicle weights without settling or cracking.
                    </p>
                  </div>

                  {/* Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-border/60">
                    <div className="space-y-2">
                      <Footprints className="w-5 h-5 text-[#A8875A]" />
                      <h4 className="font-serif text-base font-bold text-[#111111]">Anti-Slip</h4>
                      <p className="text-stone-taupe text-xs font-light leading-relaxed">
                        Textured surfaces provide friction to keep walkways safe when wet.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <CloudRain className="w-5 h-5 text-[#A8875A]" />
                      <h4 className="font-serif text-base font-bold text-[#111111]">Moss Resistant</h4>
                      <p className="text-stone-taupe text-xs font-light leading-relaxed">
                        Ultra-low absorption resists moss growth during monsoons.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <ShieldCheck className="w-5 h-5 text-[#A8875A]" />
                      <h4 className="font-serif text-base font-bold text-[#111111]">UV Stable</h4>
                      <p className="text-stone-taupe text-xs font-light leading-relaxed">
                        Volcanic minerals are completely immune to bleaching or sun damage.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Slabs Showcase */}
          <section className="py-16 sm:py-24 bg-[#FBF9F5] border-y border-[#DED8CF]/60">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
              <div className="text-center space-y-4">
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#111111]">
                  Best Paving Granite Slabs
                </h2>
                <p className="text-stone-taupe text-xs sm:text-sm font-light max-w-md mx-auto">
                  Heavy-duty, textured granite slabs ideal for driveways, entries, and exterior walls.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {matchingStones.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white border border-stone-border rounded-2xl overflow-hidden group shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-4/3 overflow-hidden bg-stone-accent-light">
                        <img
                          src={prod.images[0]}
                          alt={`${prod.name} exterior paving slab in Mukkam`}
                          className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <span className="text-[9px] tracking-wider uppercase font-bold text-[#A8875A]">
                          {prod.category}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-stone-dark">
                          {prod.name}
                        </h3>
                        <p className="text-stone-taupe text-xs font-light line-clamp-2 leading-relaxed">
                          {prod.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2">
                      <button
                        onClick={() => handleAddToBasket(prod)}
                        className="w-full py-2.5 bg-stone-dark hover:bg-[#A8875A] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Add to Enquiry List</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16 sm:py-24 bg-stone-bg">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-center text-[#111111]">
                Exterior Paving Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = faqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-stone-surface border border-stone-border rounded-xl overflow-hidden transition-all duration-300 shadow-xs"
                    >
                      <button
                        onClick={() => setFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left font-serif text-base sm:text-lg font-normal text-[#111111] hover:text-[#A8875A] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-[#A8875A]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-stone-taupe" />
                        )}
                      </button>
                      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-48 border-t border-stone-border/60" : "max-h-0"}`}>
                        <p className="p-5 text-stone-taupe text-xs sm:text-sm font-light leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
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
