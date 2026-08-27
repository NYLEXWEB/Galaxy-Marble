"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import EnquiryBasketDrawer from "../../../components/EnquiryBasketDrawer";
import QuoteRequestModal from "../../../components/QuoteRequestModal";
import FloatingActions from "../../../components/FloatingActions";
import Toast from "../../../components/Toast";
import { PRODUCTS } from "../../../data/products";
import { Grid, ArrowRight, ShieldCheck, Gem, Compass, ChevronRight, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function FlooringClient() {
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
    p.applications.includes("Flooring") && 
    (p.id.includes("honey-blue") || p.id.includes("safari-blue") || p.id.includes("steel-grey"))
  );

  const faqs = [
    {
      q: "What is the benefit of natural granite flooring over ceramic tiles?",
      a: "Natural granite flooring offers a cool, dust-free surface that lasts generations. Unlike ceramic or vitrified tiles, granite has zero grout expansion risk, and can be easily re-polished years later to restore its original high-gloss mirror shine."
    },
    {
      q: "Which granite is recommended for premium living room flooring?",
      a: "For living rooms, exotic granites with dynamic wave patterns like Honey Blue and Safari Blue are highly popular. They provide the luxurious visual flow of high-end Italian marble with the structural strength and durability of granite."
    },
    {
      q: "What slab sizes are available for flooring?",
      a: "We supply large-format polished gangsaw slabs (average size 8ft x 4ft and above). Large slabs reduce the number of visible joints, creating a highly premium, seamless flooring appearance in spacious rooms."
    }
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-stone-bg text-stone-text font-sans antialiased flex flex-col justify-between">
        <Navbar basketCount={0} onOpenBasket={() => {}} onOpenQuoteModal={() => {}} />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="animate-pulse text-stone-taupe tracking-wider text-xs uppercase">Loading Flooring Slabs...</div>
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
              <span className="text-stone-dark font-semibold">Flooring Solutions</span>
            </div>
          </div>

          {/* Hero Section */}
          <section className="relative py-16 sm:py-24 bg-[#111111] text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,135,90,0.15),transparent_60%)]" />
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 text-amber-500">
                  <Grid className="w-4 h-4" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold">
                    Stone Flooring
                  </span>
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
                  Premium Polished <br />
                  <span className="italic font-normal text-amber-500">Granite Flooring Slabs in Kozhikode</span>
                </h1>
                <p className="text-stone-border/80 text-sm sm:text-base leading-relaxed font-light font-sans max-w-xl">
                  Transforming living spaces with high-gloss polished granite flooring slabs. Delivering dust-free, cool, and highly durable surfaces to Kerala homes.
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
                      src="/Granites/Black markino.jpg"
                      alt="Polished Black Markino Granite slabs for premium floor borders in Kozhikode"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="bg-[#FBF9F5] p-6 rounded-2xl border border-[#DED8CF]/60 space-y-4">
                    <h3 className="font-serif text-lg font-semibold text-[#111111]">
                      Flooring Slabs Specifications
                    </h3>
                    <ul className="space-y-2.5 text-xs text-stone-taupe leading-relaxed">
                      <li><strong>Available formats:</strong> Gangsaw Slabs / Custom Sized Tiles</li>
                      <li><strong>Thickness:</strong> 18mm standard flooring depth</li>
                      <li><strong>Finish:</strong> High Gloss Mirror Polished / Lappato</li>
                      <li><strong>Applications:</strong> Living room floor, Lobby area, Corridor</li>
                    </ul>
                  </div>
                </div>

                {/* Narrative */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-4">
                    <h2 className="font-serif text-3xl font-semibold text-[#111111]">
                      Elegance that Lasts Generations without Fading
                    </h2>
                    <p className="text-stone-taupe text-sm sm:text-base leading-relaxed font-light">
                      Granite flooring offers a cool, dust-free surface that lasts generations. Unlike ceramic tile, a polished granite floor can be re-polished years later to restore its original mirror shine. We offer large-format gangsaw slabs that reduce grout joints for a smooth, unified appearance in living areas, corridors, and lobbies.
                    </p>
                    <p className="text-stone-taupe text-sm sm:text-base leading-relaxed font-light">
                      Our collections include striking veined classics and rare exotic blue-grey swirls that introduce organic movement and architectural character into master floor plans.
                    </p>
                  </div>

                  {/* Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-border/60">
                    <div className="space-y-2">
                      <Gem className="w-5 h-5 text-[#A8875A]" />
                      <h4 className="font-serif text-base font-bold text-[#111111]">Seamless Finish</h4>
                      <p className="text-stone-taupe text-xs font-light leading-relaxed">
                        Large gangsaw formats reduce joints for a spacious, high-end visual.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Compass className="w-5 h-5 text-[#A8875A]" />
                      <h4 className="font-serif text-base font-bold text-[#111111]">Re-Polishable</h4>
                      <p className="text-stone-taupe text-xs font-light leading-relaxed">
                        Can be buffed and polished to brand-new condition even after decades of wear.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <ShieldCheck className="w-5 h-5 text-[#A8875A]" />
                      <h4 className="font-serif text-base font-bold text-[#111111]">Dust-Free Cool</h4>
                      <p className="text-stone-taupe text-xs font-light leading-relaxed">
                        Naturally remains cool under tropical climates and is easy to vacuum and clean.
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
                  Best Matching Flooring Slabs
                </h2>
                <p className="text-stone-taupe text-xs sm:text-sm font-light max-w-md mx-auto">
                  Premium living room floor stone selections featuring elegant movement and crystals.
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
                          alt={`${prod.name} flooring slab in Mukkam`}
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
                Flooring Slabs Questions
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
