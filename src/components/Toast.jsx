import React, { useEffect } from "react";
import { ShoppingBag, X, Scale } from "lucide-react";

export default function Toast({ message, type = "basket", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 animate-bounce-in">
      <div className="bg-stone-dark text-white border border-white/10 rounded-xl px-4 py-3 shadow-2xl flex items-center gap-3 max-w-sm glass-panel-dark">
        {type === "compare" ? (
          <Scale className="w-5 h-5 text-amber-500 flex-shrink-0" />
        ) : (
          <ShoppingBag className="w-5 h-5 text-amber-500 flex-shrink-0" />
        )}

        <div className="flex-1 text-xs">
          <p className="font-semibold text-white">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 text-stone-bg/60 hover:text-white rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
