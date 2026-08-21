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
      if (window.scrollY > 20) {
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
    <header className={`sticky top-0 z-40 max-w-[100rem] mx-auto transition-all duration-300 ${
      isScrolled ? "pt-0 px-0" : "pt-2 sm:pt-3 px-6 sm:px-8 lg:px-12"
    }`}>
      <div className={`transition-all duration-300 px-4 sm:px-6 ${
        isScrolled
          ? "bg-stone-dark/95 backdrop-blur-md border-b border-white/5 shadow-lg text-white rounded-none w-full"
          : "bg-transparent border-transparent shadow-none text-white rounded-xl"
      }`}>
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand */}
          <a href="#hero" className="flex flex-col group leading-none">
            <span className="font-serif text-xl sm:text-2xl text-white group-hover:text-amber-500 transition-colors font-semibold tracking-tight">
              GALAXY <span className="italic font-light text-amber-500">Stone</span>
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.32em] uppercase font-sans font-semibold text-white/50 mt-1">
              Marble · Granite · Tile
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-amber-500 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-500 hover:after:w-full after:transition-all"
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
              className="relative p-2.5 rounded bg-white/10 hover:bg-white/25 transition-colors cursor-pointer flex items-center justify-center border border-white/10"
              aria-label="Enquiry Basket"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              {basketCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-stone-dark animate-scaleIn">
                  {basketCount}
                </span>
              )}
            </button>

            {/* Get a Quote Primary CTA */}
            <button
              onClick={onOpenQuoteModal}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 text-[10px] font-semibold tracking-[0.22em] uppercase bg-white text-stone-dark rounded hover:bg-amber-500 hover:text-white transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-stone-dark group-hover:text-white" />
              <span>Get a Quote</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-amber-500 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-dark border-t border-white/5 px-4 pt-3 pb-6 space-y-3 animate-fadeIn mt-2 rounded-b-xl">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80 hover:text-amber-500 py-2 border-b border-white/5"
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
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold tracking-[0.22em] uppercase bg-white text-stone-dark rounded hover:bg-amber-500 hover:text-white transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 text-stone-dark" />
                <span>Get a Quote</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
