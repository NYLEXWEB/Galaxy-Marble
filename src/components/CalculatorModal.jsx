import React, { useState, useMemo } from "react";
import { X, Calculator, MessageSquare, AlertCircle, Sparkles } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { calculateArea, calculateStaircaseArea, calculateWithWastage, CALCULATOR_DISCLAIMER } from "../utils/calculator";
import { buildCalculatorWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function CalculatorModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("Kitchen Countertop");
  
  // Kitchen / Room State
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("2");
  const [wastageMargin, setWastageMargin] = useState(5);

  // Staircase State
  const [treadLength, setTreadLength] = useState("3.5");
  const [treadWidth, setTreadWidth] = useState("1");
  const [stepCount, setStepCount] = useState("16");

  // Selected Stone
  const [selectedProductId, setSelectedProductId] = useState("");

  if (!isOpen) return null;

  // Calculation Logic
  const rawArea = useMemo(() => {
    if (activeTab === "Staircase") {
      return calculateStaircaseArea(treadLength, treadWidth, stepCount);
    }
    return calculateArea(length, width);
  }, [activeTab, length, width, treadLength, treadWidth, stepCount]);

  const finalAreaWithWastage = useMemo(() => {
    if (activeTab === "Flooring") {
      return calculateWithWastage(rawArea, wastageMargin);
    }
    return Math.ceil(rawArea);
  }, [rawArea, activeTab, wastageMargin]);

  const selectedProductObj = PRODUCTS.find(p => p.id === selectedProductId) || null;

  const handleWhatsAppQuote = (e) => {
    e.preventDefault();
    const msg = buildCalculatorWhatsAppMessage({
      requirementType: activeTab,
      length: activeTab === "Staircase" ? `${treadLength} (tread)` : length,
      width: activeTab === "Staircase" ? `${treadWidth} (tread) x ${stepCount} steps` : width,
      area: finalAreaWithWastage,
      selectedProduct: selectedProductObj
    });
    openWhatsApp(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#171717]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      <div className="relative bg-[#F5F1EA] border border-[#DED8CF] rounded-lg shadow-2xl max-w-xl w-full overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#171717] text-white flex items-center justify-between border-b border-[#333]">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#A8875A]" />
            <h2 className="font-serif text-xl font-bold">Requirement Calculator</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#333] text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Tab Selector */}
          <div className="grid grid-cols-3 gap-2 p-1 bg-[#FBF9F5] border border-[#DED8CF] rounded text-xs">
            {["Kitchen Countertop", "Staircase", "Flooring"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-2 font-medium rounded transition-all cursor-pointer text-center ${
                  activeTab === tab
                    ? "bg-[#171717] text-white shadow-xs"
                    : "text-[#222] hover:bg-[#DED8CF]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Input Form */}
          {activeTab === "Staircase" ? (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#817970] mb-1">
                  Step Length (ft)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={treadLength}
                  onChange={(e) => setTreadLength(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded p-2.5 text-sm text-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#817970] mb-1">
                  Step Width (ft)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={treadWidth}
                  onChange={(e) => setTreadWidth(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded p-2.5 text-sm text-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#817970] mb-1">
                  No. of Steps
                </label>
                <input
                  type="number"
                  value={stepCount}
                  onChange={(e) => setStepCount(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded p-2.5 text-sm text-[#171717]"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#817970] mb-1">
                  Length (ft)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded p-2.5 text-sm text-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#817970] mb-1">
                  Width (ft)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded p-2.5 text-sm text-[#171717]"
                />
              </div>
            </div>
          )}

          {/* Optional Stone Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#817970] mb-1">
              Preferred Stone (Optional)
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full bg-[#FBF9F5] border border-[#DED8CF] rounded p-2.5 text-xs text-[#171717]"
            >
              <option value="">-- Select Stone Slab --</option>
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.category})</option>
              ))}
            </select>
          </div>

          {/* Live Result Display Box */}
          <div className="p-4 bg-[#171717] text-white rounded border border-[#A8875A]/40 flex items-center justify-between">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#A8875A] font-semibold">
                Estimated Area Requirement
              </span>
              <p className="text-[#817970] text-xs">
                Includes standard fitting buffer
              </p>
            </div>

            <div className="text-right">
              <span className="font-serif text-3xl font-bold text-[#A8875A]">
                {finalAreaWithWastage}
              </span>
              <span className="text-xs text-[#DED8CF] ml-1">sq.ft</span>
            </div>
          </div>

          {/* Disclaimer Note */}
          <div className="p-3 bg-[#FBF9F5] border border-[#DED8CF] rounded text-[11px] text-[#817970] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#A8875A] flex-shrink-0 mt-0.5" />
            <p>{CALCULATOR_DISCLAIMER}</p>
          </div>

          {/* Action CTA */}
          <button
            onClick={handleWhatsAppQuote}
            className="w-full py-3.5 px-4 bg-[#171717] hover:bg-[#A8875A] text-white font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <MessageSquare className="w-4 h-4 text-[#A8875A]" />
            <span>Get Quote on WhatsApp</span>
          </button>

        </div>

      </div>
    </div>
  );
}
