import React, { useState, useEffect } from "react";
import { Scale, ShoppingBag, X, MessageSquare } from "lucide-react";
import Navbar from "./components/Navbar";
import MobileStickyBar from "./components/MobileStickyBar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import CollectionDiscovery from "./components/CollectionDiscovery";
import ProductCatalogue from "./components/ProductCatalogue";
import ProductDetailModal from "./components/ProductDetailModal";
import EnquiryBasketDrawer from "./components/EnquiryBasketDrawer";
import CalculatorModal from "./components/CalculatorModal";
import QuoteRequestModal from "./components/QuoteRequestModal";
import SiteVisitModal from "./components/SiteVisitModal";
import CompareModal from "./components/CompareModal";
import Toast from "./components/Toast";
import ProjectShowcase from "./components/ProjectShowcase";
import ReviewSection from "./components/ReviewSection";
import ShowroomLocationSection from "./components/ShowroomLocationSection";
import Footer from "./components/Footer";

export default function App() {
  // LocalStorage Enquiry Basket Persistence
  const [basketItems, setBasketItems] = useState(() => {
    try {
      const saved = localStorage.getItem("galaxy_marble_enquiry_basket");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("galaxy_marble_enquiry_basket", JSON.stringify(basketItems));
    } catch (e) {
      console.error("Failed to save enquiry basket to LocalStorage", e);
    }
  }, [basketItems]);

  // Stone Comparison State
  const [compareItems, setCompareItems] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState(null); // { message: string, type: 'basket' | 'compare' }

  // Filtering State
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [selectedApplicationFilter, setSelectedApplicationFilter] = useState("All");

  // Modal & Drawer Open States
  const [activeProductDetail, setActiveProductDetail] = useState(null);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
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

  // Compare Actions
  const handleToggleCompare = (product) => {
    setCompareItems((prev) => {
      const exists = prev.some(i => i.id === product.id);
      if (exists) {
        setToast({ message: `${product.name} removed from comparison`, type: "compare" });
        return prev.filter(i => i.id !== product.id);
      }
      if (prev.length >= 3) {
        setToast({ message: "You can compare up to 3 stone slabs at a time", type: "compare" });
        return prev;
      }
      setToast({ message: `${product.name} added to comparison`, type: "compare" });
      return [...prev, product];
    });
  };

  const handleRemoveFromCompare = (productId) => {
    setCompareItems((prev) => prev.filter(i => i.id !== productId));
  };

  const handleClearCompare = () => {
    setCompareItems([]);
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

  return (
    <div className="min-h-screen bg-[#F5F1EA] text-[#222222] font-sans antialiased flex flex-col justify-between selection:bg-[#A8875A] selection:text-white relative">
      
      {/* Top Header & Navigation */}
      <div>
        <Navbar
          basketCount={basketItems.length}
          onOpenBasket={() => setIsBasketOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Main Content Flow */}
        <main>
          {/* Hero Section */}
          <Hero
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />

          {/* Verified Google Trust Bar */}
          <TrustBar />

          {/* Collection Categories & Application Discovery */}
          <CollectionDiscovery
            onSelectCategory={handleCategorySelectFromDiscovery}
            onSelectApplication={handleApplicationSelectFromDiscovery}
          />

          {/* Complete Product Catalogue & Search */}
          <ProductCatalogue
            selectedCategoryFilter={selectedCategoryFilter}
            selectedApplicationFilter={selectedApplicationFilter}
            onSelectCategoryFilter={setSelectedCategoryFilter}
            onSelectApplicationFilter={setSelectedApplicationFilter}
            onViewProductDetail={(prod) => setActiveProductDetail(prod)}
            onAddToBasket={handleAddToBasket}
            basketItems={basketItems}
            compareItems={compareItems}
            onToggleCompare={handleToggleCompare}
          />

          {/* Project Showcase Gallery */}
          <ProjectShowcase />

          {/* Customer Reviews Section */}
          <ReviewSection />

          {/* Showroom Location & Contact Section */}
          <ShowroomLocationSection
            onOpenSiteVisitModal={() => setIsSiteVisitModalOpen(true)}
          />
        </main>
      </div>

      {/* Floating Compare Bar Pill */}
      {compareItems.length > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:bottom-6 z-40 animate-fadeIn">
          <div className="bg-[#171717] text-white px-5 py-3 rounded-full shadow-2xl border border-[#A8875A] flex items-center gap-4 glass-panel-dark">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Scale className="w-4 h-4 text-[#A8875A]" />
              <span>{compareItems.length} Stone Slabs Selected</span>
            </div>

            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-4 py-1.5 bg-[#A8875A] hover:bg-[#8F7148] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors cursor-pointer"
            >
              Compare Slabs
            </button>

            <button
              onClick={handleClearCompare}
              className="p-1 text-[#817970] hover:text-white rounded-full transition-colors cursor-pointer"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

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
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* Product Detail Modal */}
      {activeProductDetail && (
        <ProductDetailModal
          product={activeProductDetail}
          onClose={() => setActiveProductDetail(null)}
          onAddToBasket={handleAddToBasket}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          isInBasket={basketItems.some(i => i.product.id === activeProductDetail.id)}
        />
      )}

      {/* Side-by-Side Stone Compare Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareItems={compareItems}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearCompare={handleClearCompare}
      />

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

      {/* Requirement Area Calculator Modal */}
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
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

    </div>
  );
}
