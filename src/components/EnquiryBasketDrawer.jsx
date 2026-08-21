import React, { useState } from "react";
import { X, Trash2, MessageSquare, ShoppingBag, Plus, Minus, ArrowRight, ShieldAlert } from "lucide-react";
import { buildBasketWhatsAppMessage, openWhatsApp } from "../utils/whatsapp";

export default function EnquiryBasketDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearBasket,
  onExploreCollection
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSendWhatsAppEnquiry = (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    const whatsappMsg = buildBasketWhatsAppMessage(items, {
      name,
      phone,
      location,
      message
    });

    openWhatsApp(whatsappMsg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-dark/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-stone-bg border-l border-stone-border shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-stone-dark text-white flex items-center justify-between border-b border-stone-border/10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-accent" />
              <h2 className="font-serif text-xl font-bold">Enquiry Basket</h2>
              <span className="text-xs bg-stone-accent text-white px-2 py-0.5 rounded-full font-sans font-semibold">
                {items.length} items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-border/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body: Items & Form */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* Disclaimer Banner */}
            <div className="p-3 bg-stone-surface border border-stone-border rounded text-xs text-stone-taupe flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-stone-accent flex-shrink-0 mt-0.5" />
              <p>
                Add stones to your enquiry list and click <strong>Send Enquiry on WhatsApp</strong> to discuss stock, slab sizes, and current pricing with our team.
              </p>
            </div>

            {/* Selected Items List */}
            {items.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-taupe uppercase">
                  <span>Selected Stones</span>
                  <button
                    onClick={onClearBasket}
                    className="text-red-700 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-stone-surface border border-stone-border rounded flex items-center gap-3 relative"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded border border-stone-border"
                    />

                    <div className="flex-1 space-y-1">
                      <h4 className="font-serif text-sm font-bold text-stone-dark line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-stone-taupe">
                        {item.product.finish} • {item.product.category}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[11px] font-semibold text-stone-dark">Sq.Ft:</span>
                        <div className="flex items-center border border-stone-border rounded bg-stone-bg">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(10, (parseInt(item.quantity, 10) || 40) - 10))}
                            className="px-1.5 py-0.5 text-xs text-stone-dark hover:bg-stone-border/40"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => onUpdateQuantity(item.product.id, e.target.value)}
                            className="w-14 text-center text-xs font-semibold bg-transparent focus:outline-none text-stone-dark"
                          />
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, (parseInt(item.quantity, 10) || 40) + 10)}
                            className="px-1.5 py-0.5 text-xs text-stone-dark hover:bg-stone-border/40"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1 text-stone-taupe hover:text-red-700 transition-colors"
                      title="Remove stone"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty Basket View */
              <div className="text-center py-12 space-y-4">
                <ShoppingBag className="w-12 h-12 text-stone-border mx-auto" />
                <h3 className="font-serif text-xl font-bold text-stone-dark">
                  Your enquiry list is empty.
                </h3>
                <p className="text-xs text-stone-taupe">
                  Explore our granite and marble catalogue to add items to your custom enquiry.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExploreCollection();
                  }}
                  className="px-5 py-2.5 bg-stone-dark text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-stone-accent transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            )}

            {/* Customer Information Form (Only if items exist) */}
            {items.length > 0 && (
              <form onSubmit={handleSendWhatsAppEnquiry} className="space-y-3 pt-4 border-t border-stone-border">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-dark">
                  Your Contact Details (Optional)
                </p>

                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-surface border border-stone-border rounded px-3 py-2 text-xs text-stone-dark focus:outline-none focus:border-stone-accent"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-surface border border-stone-border rounded px-3 py-2 text-xs text-stone-dark focus:outline-none focus:border-stone-accent"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Location / City (e.g. Mukkam, Kozhikode)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-stone-surface border border-stone-border rounded px-3 py-2 text-xs text-stone-dark focus:outline-none focus:border-stone-accent"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Additional message or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-stone-surface border border-stone-border rounded px-3 py-2 text-xs text-stone-dark focus:outline-none focus:border-stone-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-stone-dark hover:bg-stone-accent text-white font-bold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4 text-stone-accent" />
                  <span>Send Enquiry on WhatsApp</span>
                </button>
              </form>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 bg-stone-surface border-t border-stone-border text-[11px] text-stone-taupe text-center">
            Galaxy Granite & Marble • Mukkam, Kerala
          </div>

        </div>

      </div>
    </div>
  );
}
