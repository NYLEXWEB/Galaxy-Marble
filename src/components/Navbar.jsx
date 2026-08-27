"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, ShoppingBag, MessageSquare, Phone, MapPin, ChevronRight } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";

export default function Navbar({
  basketCount = 0,
  onOpenBasket,
  onOpenQuoteModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.substring(2);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
      setMobileMenuOpen(false);
    } else if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "Collections", href: "/#collections" },
    { name: "Products", href: "/#catalogue" },
    { name: "Services", href: "/services" },
    { name: "Our Work", href: "/gallery" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" }
  ];

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? "pt-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" : "pt-0 px-0 max-w-full"
        }`}>
        <div className={`transition-all duration-300 px-4 sm:px-8 ${isScrolled
            ? "bg-white/95 text-[#171717] backdrop-blur-md border border-[#DED8CF] shadow-xl rounded-xl"
            : "bg-transparent text-white border-transparent shadow-none"
          }`}>
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo Brand */}
            <Link href="/#hero" onClick={(e) => handleNavClick(e, "/#hero")} className="flex flex-col group leading-none">
              <span className={`font-serif text-xl sm:text-2xl transition-colors font-bold tracking-tight ${isScrolled ? "text-[#171717] group-hover:text-[#A8875A]" : "text-white group-hover:text-[#A8875A]"
                }`}>
                GALAXY
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase font-sans font-semibold text-[#A8875A] mt-0.5">
                Granite &amp; Marble
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className={`hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-[0.18em] ${isScrolled ? "text-[#222222]" : "text-white/90"
              }`}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-[#A8875A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#A8875A] hover:after:w-full after:transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action CTAs */}
            <div className="flex items-center space-x-3 sm:space-x-4">

              {/* Enquiry Basket Trigger */}
              <button
                onClick={onOpenBasket}
                className={`relative p-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center border ${isScrolled
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

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden p-2 focus:outline-none cursor-pointer rounded-lg ${isScrolled ? "text-[#171717] hover:text-[#A8875A]" : "text-white hover:text-[#A8875A]"
                  }`}
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Full-Screen Ultra-Premium Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#171717]/98 backdrop-blur-2xl text-white flex flex-col justify-between p-6 animate-fadeIn overflow-y-auto lg:hidden">

          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-5">
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                GALAXY
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase font-sans font-bold text-amber-500 mt-1">
                Granite &amp; Marble
              </span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-amber-600 text-white transition-all cursor-pointer border border-white/15"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="py-8 space-y-2 flex-1 flex flex-col justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group flex items-center justify-between py-3.5 px-3 rounded-xl hover:bg-white/5 transition-all text-xl font-serif font-bold text-white hover:text-amber-500 border-b border-white/10"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-5 h-5 text-amber-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </nav>

          {/* Drawer Footer Actions */}
          <div className="space-y-4 pt-6 border-t border-white/15">

            {/* Get a Quote Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Get a Quote</span>
            </button>

            {/* Direct Contact Details */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#DED8CF]/80">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Mukkam, Kozhikode</span>
              </div>
              <a href={`tel:${BUSINESS_CONFIG.contact.phoneDisplay}`} className="flex items-center gap-1.5 text-white font-bold">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>{BUSINESS_CONFIG.contact.phoneDisplay}</span>
              </a>
            </div>

          </div>

        </div>
      )}
    </>
  );
}
