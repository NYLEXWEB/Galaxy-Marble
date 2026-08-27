"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EnquiryBasketDrawer from "../../components/EnquiryBasketDrawer";
import QuoteRequestModal from "../../components/QuoteRequestModal";
import FloatingActions from "../../components/FloatingActions";
import Toast from "../../components/Toast";
import { UtensilsCrossed, Layers, Grid, Sparkles, LayoutGrid, Home, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesClient() {
  const [basketItems, setBasketItems] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [toast, setToast] = useState(null);

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

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

  const servicesList = [
    {
      slug: "kitchen-countertops",
      title: "Kitchen Countertops",
      description: "Heat-resistant, stain-durable high-density granite surfaces custom cut for kitchen workstations and luxury breakfast counters.",
      icon: UtensilsCrossed,
      stoneType: "Khammam Black & Steel Grey Slabs"
    },
    {
      slug: "staircase-steps",
      title: "Staircase Steps & Risers",
      description: "Anti-skid edge profiled treads and risers. Handcrafted with full/half bullnose finishes to prevent wear and ensure safety.",
      icon: Layers,
      stoneType: "Coffee Brown & Tumkur Red Granite"
    },
    {
      slug: "flooring",
      title: "Flooring Solutions",
      description: "Large format seamless polished granite gangsaw slabs and room tiles that bring a mirror-like luxury shine to living areas.",
      icon: Grid,
      stoneType: "Exotic Waves & Polished Granite"
    },
    {
      slug: "bathroom-vanities",
      title: "Bathroom Vanity Countertops",
      description: "Moisture-resistant natural marble and granite countertops custom sized to frame tabletop and under-counter washbasins.",
      icon: Sparkles,
      stoneType: "Premium Granite & White Marble"
    },
    {
      slug: "wall-cladding",
      title: "Interior Wall Elevation",
      description: "Architectural book-matched feature walls and accent panels featuring fluid ocean currents of Honey Blue and Safari Blue exotic granites.",
      icon: LayoutGrid,
      stoneType: "Honey Blue & Safari Blue Exotic"
    },
    {
      slug: "exterior-paving",
      title: "Exterior Paving & Cladding",
      description: "Extreme weather-durable thick slabs with brushed leather and flamed finishes for driving paths, steps, and facade cladding.",
      icon: Home,
      stoneType: "Textured Leather Black & Grey Granite"
    }
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-stone-bg text-stone-text font-sans antialiased flex flex-col justify-between">
        <Navbar basketCount={0} onOpenBasket={() => {}} onOpenQuoteModal={() => {}} />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="animate-pulse text-stone-taupe tracking-wider text-xs uppercase">Loading Services...</div>
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
                <Compass className="w-4 h-4" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold">
                  What We Offer
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
                Natural Stone <span className="italic font-normal text-amber-500">Fabrication Services</span>
              </h1>
              <p className="text-stone-border/80 text-xs sm:text-sm leading-relaxed font-light font-sans max-w-xl mx-auto">
                Discover our specialized natural stone supply and profiling services, transforming premium raw slabs into tailored architectural features.
              </p>
            </div>
          </section>

          <section className="py-16 sm:py-24 bg-stone-bg">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesList.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={service.slug}
                      className="bg-stone-surface border border-stone-border rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="p-3 bg-[#A8875A]/10 rounded-xl w-fit">
                          <IconComponent className="w-6 h-6 text-[#A8875A]" />
                        </div>
                        <div className="space-y-2">
                          <span className="text-[9px] tracking-[0.18em] uppercase font-bold text-stone-taupe">
                            {service.stoneType}
                          </span>
                          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-stone-taupe text-xs leading-relaxed font-light font-sans">
                          {service.description}
                        </p>
                      </div>
                      <div className="pt-6 mt-6 border-t border-stone-border/60">
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-[#A8875A] hover:text-[#8F7148] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors group"
                        >
                          <span>Explore Service Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
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
