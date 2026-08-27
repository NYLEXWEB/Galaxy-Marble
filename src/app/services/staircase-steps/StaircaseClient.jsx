"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import EnquiryBasketDrawer from "../../../components/EnquiryBasketDrawer";
import QuoteRequestModal from "../../../components/QuoteRequestModal";
import FloatingActions from "../../../components/FloatingActions";
import Toast from "../../../components/Toast";
import { PRODUCTS } from "../../../data/products";
import { Layers, Footprints, AlertTriangle, ChevronRight, MessageSquare, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function StaircaseClient() {
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
    p.applications.includes("Staircase") && 
    (p.id.includes("coffee") || p.id.includes("steel-grey") || p.id.includes("tumkur"))
  );

  const faqs = [
    {
      q: "What is the benefit of full bullnose edge profiling for stairs?",
      a: "A full bullnose edge rounds the stone tread fully. This eliminates sharp corners, reduces impact damage if a trip occurs, and significantly prevents the granite edges from chipping over years of stepping."
    },
    {
      q: "Which finish is best for outdoor entrance steps in Kerala?",
      a: "For outdoor stairs exposed to rain, we strongly recommend a brushed leather finish or flamed matte finish. Mirror-polished surfaces become extremely slippery when wet, while textured finishes provide natural anti-skid safety underfoot."
    },
    {
      q: "Can I combine different granites for treads and risers?",
      a: "Yes! A popular architectural trend is combining a dark polished tread (like Khammam Black or Coffee Brown) with a light grey or white stone riser. This contrast improves step visibility and creates a high-end luxury aesthetic."
    }
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-stone-bg text-stone-text font-sans antialiased flex flex-col justify-between">
        <Navbar basketCount={0} onOpenBasket={() => {}} onOpenQuoteModal={() => {}} />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="animate-pulse text-stone-taupe tracking-wider text-xs uppercase">Loading Stair Steps...</div>
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
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
            <div className="flex items-center gap-2 text-xs text-stone-taupe font-medium">
              <Link href="/" className="hover:text-stone-dark transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/services" className="hover:text-stone-dark transition-colors">Services</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-stone-dark font-semibold">Staircase Steps</span>
            </div>
          </div>

          <section className="relative py-16 sm:py-24 bg-[#111111] text-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,135,90,0.15),transparent_60%)]" />
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 text-amber-500">
                  <Layers className="w-4 h-4" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold">
                    Staircase Slabs
                  </span>
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
                  Custom Staircase <br />
                  <span className="italic font-normal text-amber-500">Granite Steps &amp; Risers in Kerala</span>
                </h1>
                <p className="text-stone-border/80 text-sm sm:text-base leading-relaxed font-light font-sans max-w-xl">
                  Anti-skid finishes and custom bullnose edge-profiling designed to handle high-traffic footsteps safely while adding elegant depth to your home.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-24 bg-stone-bg">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-5 space-y-6">
                  <div className="overflow-hidden rounded-2xl border border-stone-border shadow-md">
                    <img
                      src="/Granites/Coffee Brown.jpg"
                      alt="Coffee Brown Granite slabs for staircase steps in Mukkam, Kerala"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="bg-[#FBF9F5] p-6 rounded-2xl border border-[#DED8CF]/60 space-y-4">
                    <h3 className="font-serif text-lg font-semibold text-[#111111]">
                      Step Profiling Standards
                    </h3>
                    <ul className="space-y-2.5 text-xs text-stone-taupe leading-relaxed">
                      <li><strong>Finishes:</strong> Brushed Leather (Anti-Skid) / High Gloss</li>
                      <li><strong>Edge Cuts:</strong> Full Bullnose / Half Bullnose / Chamfered</li>
                      <li><strong>Thickness:</strong> 18mm / 20mm Slabs for high impact</li>
                      <li><strong>Safety options:</strong> Grooved tread lines for slip protection</li>
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-4">
                    <h2 className="font-serif text-3xl font-semibold text-[#111111]">
                      Engineered for Heavy Traffic & Maximum Foot Traction
                    </h2>
                    <p className="text-stone-taupe text-sm sm:text-base leading-relaxed font-light">
                      Staircases are high-traffic zones requiring materials that combine long-term wear resistance with safety. Our curated staircase collection features highly durable Indian granites cut to size with specialized safety edge profiling to prevent slips and resist heavy impact.
                    </p>
                    <p className="text-stone-taupe text-sm sm:text-base leading-relaxed font-light">
                      Whether you are mapping an interior spiral case in living areas or heavy parking steps exposed to the elements, we supply slabs with verified mineral density that do not wear out or develop cracks over decades of use.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-border/60">
                    <div className="space-y-2">
                      <Footprints className="w-5 h-5 text-[#A8875A]" />
                      <h4 className="font-serif text-base font-bold text-[#111111]">Anti-Slip Safety</h4>
                      <p className="text-stone-taupe text-xs font-light leading-relaxed">
                        Textured leather finishes provide safe footing even in humid weather.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <AlertTriangle className="w-5 h-5 text-[#A8875A]" />
                      <h4 className="font-serif text-base font-bold text-[#111111]">Chipping Protection</h4>
                      <p className="text-stone-taupe text-xs font-light leading-relaxed">
                        Full bullnose round profiles protect slab edges from heavy structural impacts.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <ShieldCheck className="w-5 h-5 text-[#A8875A]" />
                      <h4 className="font-serif text-base font-bold text-[#111111]">High Density</h4>
                      <p className="text-stone-taupe text-xs font-light leading-relaxed">
                        Natural quartz structure resists wear from daily friction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 sm:py-24 bg-[#FBF9F5] border-y border-[#DED8CF]/60">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
              <div className="text-center space-y-4">
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#111111]">
                  Best Matching Granite Treads
                </h2>
                <p className="text-stone-taupe text-xs sm:text-sm font-light max-w-md mx-auto">
                  Stair-grade granites selected for high structural density, weather resistance, and classic elegance.
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
                          alt={`${prod.name} staircase step slab in Mukkam`}
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

          <section className="py-16 sm:py-24 bg-stone-bg">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-center text-[#111111]">
                Staircase Buying Questions
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
