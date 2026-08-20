import React, { useState } from "react";
import { Menu, X, ShoppingBag, MessageSquare, Calculator } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";

export default function Navbar({
  basketCount = 0,
  onOpenBasket,
  onOpenCalculator,
  onOpenQuoteModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Collections", href: "#collections" },
    { name: "Products", href: "#catalogue" },
    { name: "Our Work", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className="sticky top-3 z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all">
      <div className="bg-[#F5F1EA]/95 backdrop-blur-md border border-[#DED8CF] shadow-lg rounded-xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand */}
          <a href="#hero" className="flex flex-col group">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] group-hover:text-[#A8875A] transition-colors">
              GALAXY
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#817970] -mt-1">
              Granite & Marble
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#222222]">
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
            
            {/* Area Calculator Quick Button */}
            <button
              onClick={onOpenCalculator}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#171717] bg-[#FBF9F5] border border-[#DED8CF] rounded hover:border-[#A8875A] transition-all cursor-pointer"
              title="Area Calculator"
            >
              <Calculator className="w-4 h-4 text-[#A8875A]" />
              <span>Calculator</span>
            </button>

            {/* Enquiry Basket Trigger */}
            <button
              onClick={onOpenBasket}
              className="relative p-2.5 rounded bg-[#171717] text-[#FBF9F5] hover:bg-[#A8875A] transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Enquiry Basket"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {basketCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#A8875A] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#F5F1EA]">
                  {basketCount}
                </span>
              )}
            </button>

            {/* Get a Quote Primary CTA */}
            <button
              onClick={onOpenQuoteModal}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#171717] text-white rounded hover:bg-[#A8875A] transition-all shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#A8875A]" />
              <span>Get a Quote</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#171717] hover:text-[#A8875A] focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F5F1EA] border-t border-[#DED8CF] px-4 pt-3 pb-6 space-y-3 animate-fadeIn mt-2 rounded-b-xl">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-serif font-medium text-[#171717] hover:text-[#A8875A] py-1 border-b border-[#DED8CF]/40"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#FBF9F5] border border-[#DED8CF] text-[#171717] rounded"
              >
                <Calculator className="w-4 h-4 text-[#A8875A]" />
                <span>Requirement Calculator</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-wider uppercase bg-[#171717] text-white rounded"
              >
                <MessageSquare className="w-4 h-4 text-[#A8875A]" />
                <span>Get a Quote on WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
