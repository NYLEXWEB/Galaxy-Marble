import React, { useState, useEffect } from "react";
import { ShoppingBag, X, MessageSquare } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import CollectionDiscovery from "./components/CollectionDiscovery";
import ProductCatalogue from "./components/ProductCatalogue";
import ProductDetailModal from "./components/ProductDetailModal";
import EnquiryBasketDrawer from "./components/EnquiryBasketDrawer";
import QuoteRequestModal from "./components/QuoteRequestModal";
import SiteVisitModal from "./components/SiteVisitModal";
import Toast from "./components/Toast";
import FloatingActions from "./components/FloatingActions";
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

  return (
    <div className="min-h-screen bg-[#F5F1EA] text-[#222222] font-sans antialiased flex flex-col justify-between selection:bg-[#A8875A] selection:text-white relative">
      
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
