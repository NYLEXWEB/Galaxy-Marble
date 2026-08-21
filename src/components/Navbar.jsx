import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, MessageSquare } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";

export default function Navbar({
  basketCount = 0,
  onOpenBasket,
  onOpenQuoteModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Collections", href: "#collections" },
    { name: "Products", href: "#catalogue" },
    { name: "Our Work", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? "pt-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" : "pt-0 px-0 max-w-full"
    }`}>
      <div className={`transition-all duration-300 px-4 sm:px-8 ${
        isScrolled
          ? "bg-white/95 text-[#171717] backdrop-blur-md border border-[#DED8CF] shadow-xl rounded-xl"
          : "bg-transparent text-white border-transparent shadow-none"
      }`}>
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand */}
          <a href="#hero" className="flex flex-col group leading-none">
            <span className={`font-serif text-xl sm:text-2xl transition-colors font-bold tracking-tight ${
              isScrolled ? "text-[#171717] group-hover:text-[#A8875A]" : "text-white group-hover:text-[#A8875A]"
            }`}>
              GALAXY
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase font-sans font-semibold text-[#A8875A] mt-0.5">
              Granite &amp; Marble
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className={`hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-[0.18em] ${
            isScrolled ? "text-[#222222]" : "text-white/90"
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#A8875A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#A8875A] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Enquiry Basket Trigger */}
            <button
              onClick={onOpenBasket}
              className={`relative p-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center border ${
                isScrolled
                  ? "bg-[#171717] text-white hover:bg-[#A8875A] border-transparent"
                  : "bg-white/10 text-white hover:bg-[#A8875A] border-white/20"
              }`}
              aria-label="Enquiry Basket"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              {basketCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#A8875A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {basketCount}
                </span>
              )}
            </button>

            {/* Get a Quote Primary CTA */}
            <button
              onClick={onOpenQuoteModal}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold tracking-[0.18em] uppercase rounded-lg transition-all shadow-sm cursor-pointer bg-amber-600 hover:bg-amber-700 text-white"
            >
              <MessageSquare className="w-3.5 h-3.5 text-white" />
              <span>Get a Quote</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 focus:outline-none cursor-pointer ${
                isScrolled ? "text-[#171717] hover:text-[#A8875A]" : "text-white hover:text-[#A8875A]"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t px-4 pt-3 pb-6 space-y-3 animate-fadeIn mt-2 rounded-b-xl ${
            isScrolled ? "bg-white border-[#DED8CF] text-[#171717]" : "bg-[#171717] border-[#333333] text-white"
          }`}>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold uppercase tracking-[0.18em] hover:text-[#A8875A] py-2 border-b ${
                    isScrolled ? "border-[#DED8CF] text-[#171717]" : "border-[#333333] text-[#DED8CF]"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold tracking-[0.18em] uppercase bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Get a Quote</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
