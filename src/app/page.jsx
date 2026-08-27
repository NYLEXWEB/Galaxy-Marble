"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import CollectionDiscovery from "../components/CollectionDiscovery";
import ProductCatalogue from "../components/ProductCatalogue";
import ProductDetailModal from "../components/ProductDetailModal";
import EnquiryBasketDrawer from "../components/EnquiryBasketDrawer";
import QuoteRequestModal from "../components/QuoteRequestModal";
import SiteVisitModal from "../components/SiteVisitModal";
import Toast from "../components/Toast";
import FloatingActions from "../components/FloatingActions";
import ProjectShowcase from "../components/ProjectShowcase";
import ReviewSection from "../components/ReviewSection";
import FAQSection from "../components/FAQSection";
import ShowroomLocationSection from "../components/ShowroomLocationSection";
import Footer from "../components/Footer";
import AboutSection from "../components/AboutSection";

export default function Page() {
  const [basketItems, setBasketItems] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage only after component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("galaxy_marble_enquiry_basket");
      if (saved) {
        setBasketItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load enquiry basket from LocalStorage", e);
    }
  }, []);

  // Save to localStorage when basketItems changes
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem("galaxy_marble_enquiry_basket", JSON.stringify(basketItems));
    } catch (e) {
      console.error("Failed to save enquiry basket to LocalStorage", e);
    }
  }, [basketItems, isMounted]);

  // Listen for custom event when product image is copied to clipboard
  useEffect(() => {
    if (!isMounted) return;

    const handleImageCopied = (e) => {
      const { copied } = e.detail;
      if (copied) {
        setToast({
          message: "Product image copied! You can paste (Ctrl+V) it in the WhatsApp chat.",
          type: "basket"
        });
      }
    };

    window.addEventListener("whatsapp_image_copied", handleImageCopied);
    return () => {
      window.removeEventListener("whatsapp_image_copied", handleImageCopied);
    };
  }, [isMounted]);

  // Toast Notification State
  const [toast, setToast] = useState(null); // { message: string, type: 'basket' | 'compare' }

  // Filtering State
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [selectedApplicationFilter, setSelectedApplicationFilter] = useState("All");

  // Modal & Drawer Open States
  const [activeProductDetail, setActiveProductDetail] = useState(null);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);

  // Basket Action Handlers
  const handleAddToBasket = (product, quantity = "40") => {
    setBasketItems((prev) => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: String(quantity) }
            : item
        );
      }
      return [...prev, { product, quantity: String(quantity), unit: "sq.ft" }];
    });

    setToast({
      message: `${product.name} added to Enquiry List`,
      type: "basket"
    });
  };

  const handleUpdateBasketQuantity = (productId, newQuantity) => {
    setBasketItems((prev) =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: String(newQuantity) }
          : item
      )
    );
  };

  const handleRemoveFromBasket = (productId) => {
    setBasketItems((prev) => prev.filter(item => item.product.id !== productId));
  };

  const handleClearBasket = () => {
    setBasketItems([]);
  };

  // Category & Application Filter Click Actions from Discovery Cards
  const handleCategorySelectFromDiscovery = (categoryId) => {
    setSelectedCategoryFilter(categoryId);
    const catalogueEl = document.getElementById("catalogue");
    if (catalogueEl) {
      catalogueEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleApplicationSelectFromDiscovery = (applicationTitle) => {
    setSelectedApplicationFilter(applicationTitle);
    const catalogueEl = document.getElementById("catalogue");
    if (catalogueEl) {
      catalogueEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Prevent rendering interactive elements dependent on mounting during SSR
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-stone-bg text-stone-text font-sans antialiased flex flex-col justify-between selection:bg-stone-accent selection:text-stone-bg relative">
        <Navbar
          basketCount={0}
          onOpenBasket={() => { }}
          onOpenQuoteModal={() => { }}
        />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="animate-pulse text-stone-taupe tracking-wider text-xs uppercase">Loading Showroom...</div>
        </main>
        <Footer onOpenQuoteModal={() => { }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-bg text-stone-text font-sans antialiased flex flex-col justify-between selection:bg-stone-accent selection:text-stone-bg relative">

      {/* Top Header & Navigation */}
      <div>
        <Navbar
          basketCount={basketItems.length}
          onOpenBasket={() => setIsBasketOpen(true)}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Main Content Flow */}
        <main>
          {/* Hero Section */}
          <Hero
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          />

          {/* Verified Google Trust Bar */}
          <TrustBar />

          {/* Collection Categories & Application Discovery */}
          <CollectionDiscovery
            onSelectCategory={handleCategorySelectFromDiscovery}
            onSelectApplication={handleApplicationSelectFromDiscovery}
          />

          {/* Homepage Introductory About Section */}
          <AboutSection />

          {/* Complete Product Catalogue & Search */}
          <ProductCatalogue
            selectedCategoryFilter={selectedCategoryFilter}
            selectedApplicationFilter={selectedApplicationFilter}
            onSelectCategoryFilter={setSelectedCategoryFilter}
            onSelectApplicationFilter={setSelectedApplicationFilter}
            onViewProductDetail={(prod) => setActiveProductDetail(prod)}
            onAddToBasket={handleAddToBasket}
            basketItems={basketItems}
          />

          {/* Project Showcase Gallery */}
          <ProjectShowcase />

          {/* Customer Reviews Section */}
          <ReviewSection />

          {/* Frequently Asked Questions */}
          <FAQSection />

          {/* Showroom Location & Contact Section */}
          <ShowroomLocationSection
            onOpenSiteVisitModal={() => setIsSiteVisitModalOpen(true)}
          />
        </main>
      </div>

      {/* Toast Feedback Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Footer */}
      <Footer
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* Product Detail Modal */}
      {activeProductDetail && (
        <ProductDetailModal
          product={activeProductDetail}
          onClose={() => setActiveProductDetail(null)}
          onAddToBasket={handleAddToBasket}
          isInBasket={basketItems.some(i => i.product.id === activeProductDetail.id)}
        />
      )}

      {/* Enquiry Basket Drawer */}
      <EnquiryBasketDrawer
        isOpen={isBasketOpen}
        onClose={() => setIsBasketOpen(false)}
        items={basketItems}
        onUpdateQuantity={handleUpdateBasketQuantity}
        onRemoveItem={handleRemoveFromBasket}
        onClearBasket={handleClearBasket}
        onExploreCollection={() => {
          const catEl = document.getElementById("catalogue");
          if (catEl) catEl.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Quote Request Modal */}
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* Showroom Site Visit Booking Modal */}
      <SiteVisitModal
        isOpen={isSiteVisitModalOpen}
        onClose={() => setIsSiteVisitModalOpen(false)}
      />

      {/* Floating Action Buttons Widget */}
      <FloatingActions />

    </div>
  );
}
