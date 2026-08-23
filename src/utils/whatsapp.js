import { BUSINESS_CONFIG } from "../config/business";

/**
 * Generate a properly encoded WhatsApp web / app URL
 * @param {string} message 
 * @returns {string} WhatsApp URL
 */
export const generateWhatsAppUrl = (message) => {
    const phone = BUSINESS_CONFIG.contact.whatsappNumber;
    const encodedText = encodeURIComponent(message.trim());
    return `https://wa.me/${phone}?text=${encodedText}`;
};

/**
 * Direct helper to open WhatsApp in a new window/tab
 * @param {string} message 
 */
export const openWhatsApp = (message) => {
    const url = generateWhatsAppUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
};

/**
 * Build Single Product WhatsApp Message with Slab Image Link
 */
export const buildSingleProductWhatsAppMessage = ({ product, quantity = "", userNote = "" }) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const imageUrl = product.images?.[0] ? `${origin}${product.images[0]}` : "";

    let msg = `Hello Galaxy Granite & Marble,\n\nI am interested in the following granite slab:\n\n*Product:* ${product.name}\n*Category:* ${product.category}\n*Finish:* ${product.finish || "Mirror Polished"}`;

    if (imageUrl) {
        msg += `\n*Slab Photo:* ${imageUrl}`;
    }

    if (quantity) {
        msg += `\n*Quantity / Area:* ${quantity} sq.ft`;
    }

    if (userNote) {
        msg += `\n*Note:* ${userNote}`;
    }

    msg += `\n\nPlease share the current price and availability.\n\nThank you.`;
    return msg;
};

/**
 * Build Multi-Product Enquiry Basket WhatsApp Message with Slab Image Links
 */
export const buildBasketWhatsAppMessage = (items, customerDetails = {}) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    let msg = `Hello Galaxy Granite & Marble,\n\nI would like to enquire about the following granite slabs:\n\n`;

    items.forEach((item, index) => {
        const imageUrl = item.product.images?.[0] ? `${origin}${item.product.images[0]}` : "";
        msg += `${index + 1}. *${item.product.name}*\n   Quantity: ${item.quantity || "40"} ${item.unit || "sq.ft"}`;
        if (imageUrl) {
            msg += `\n   Slab Photo: ${imageUrl}`;
        }
        msg += `\n\n`;
    });

    if (customerDetails.name) {
        msg += `Customer Name: ${customerDetails.name}\n`;
    }
    if (customerDetails.phone) {
        msg += `Contact Phone: ${customerDetails.phone}\n`;
    }
    if (customerDetails.location) {
        msg += `Location: ${customerDetails.location}\n`;
    }
    if (customerDetails.message) {
        msg += `Additional Note: ${customerDetails.message}\n`;
    }

    msg += `\nPlease share the current rate list, availability and quotation.\n\nThank you.`;
    return msg;
};

/**
 * Build Calculator Requirement WhatsApp Message
 */
export const buildCalculatorWhatsAppMessage = ({ requirementType, length, width, area, selectedProduct = null, userNotes = "" }) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    let msg = `Hello Galaxy Granite & Marble,\n\nI calculated the following stone requirement on your digital showroom:\n\n`;
    msg += `Requirement Type: ${requirementType}\n`;
    msg += `Dimensions: ${length} ft x ${width} ft\n`;
    msg += `Calculated Area: ${area} sq.ft\n`;

    if (selectedProduct) {
        const imageUrl = selectedProduct.images?.[0] ? `${origin}${selectedProduct.images[0]}` : "";
        msg += `Preferred Stone: ${selectedProduct.name}\n`;
        if (imageUrl) {
            msg += `Slab Photo: ${imageUrl}\n`;
        }
    }

    if (userNotes) {
        msg += `Notes: ${userNotes}\n`;
    }

    msg += `\nPlease share an estimated price quotation and availability.\n\nThank you.`;
    return msg;
};

/**
 * Build Showroom Site Visit Request WhatsApp Message
 */
export const buildSiteVisitWhatsAppMessage = ({ name, phone, location, requirement, preferredDate, message }) => {
    let msg = `Hello Galaxy Granite & Marble,\n\nI would like to request a showroom visit / consultation.\n\n`;
    msg += `Name: ${name}\n`;
    msg += `Phone: ${phone}\n`;
    if (location) msg += `Location: ${location}\n`;
    if (requirement) msg += `Requirement: ${requirement}\n`;
    if (preferredDate) msg += `Preferred Date: ${preferredDate}\n`;
    if (message) msg += `Message: ${message}\n`;

    msg += `\nPlease confirm available time slot.\n\nThank you.`;
    return msg;
};

/**
 * Build General Quote Request WhatsApp Message
 */
export const buildQuoteRequestWhatsAppMessage = ({ name, phone, requirement, product = "", quantity = "", location = "", message = "" }) => {
    let msg = `Hello Galaxy Granite & Marble,\n\nI would like to request a price quote for my stone requirement.\n\n`;
    msg += `Name: ${name}\n`;
    msg += `Phone: ${phone}\n`;
    if (requirement) msg += `Requirement Type: ${requirement}\n`;
    if (product) msg += `Product of Interest: ${product}\n`;
    if (quantity) msg += `Approximate Quantity: ${quantity} sq.ft\n`;
    if (location) msg += `Location: ${location}\n`;
    if (message) msg += `Note: ${message}\n`;

    msg += `\nPlease share current rate list and availability.\n\nThank you.`;
    return msg;
};

/**
 * Helper to convert Blob to PNG Blob using a temporary Canvas
 */
const convertBlobToPng = (blob) => {
  return new Promise((resolve, reject) => {
    const img = new globalThis.Image();
    const objectUrl = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((pngBlob) => {
          URL.revokeObjectURL(objectUrl);
          if (pngBlob) {
            resolve(pngBlob);
          } else {
            reject(new Error("Canvas conversion to PNG blob failed"));
          }
        }, "image/png");
      } else {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Failed to get 2D canvas context"));
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Loading image failed for PNG conversion"));
    };
    img.src = objectUrl;
  });
};

/**
 * Open WhatsApp and try to send/copy product image
 */
export const openWhatsAppWithImage = async (message, imageUrl) => {
  if (typeof window === "undefined") {
    return;
  }

  const absoluteUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `${window.location.origin}${imageUrl}`;

  let imageCopied = false;

  // 1. Try Web Share API (mobile share sheet)
  if (navigator.share && navigator.canShare) {
    try {
      const response = await fetch(absoluteUrl);
      const blob = await response.blob();
      const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1) || "product.png";
      const file = new File([blob], fileName, { type: blob.type });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Galaxy Marble & Granite",
          text: message
        });
        return;
      }
    } catch (err) {
      console.warn("Web Share API failed or was cancelled:", err);
    }
  }

  // 2. Fallback: Clipboard API (copy PNG image to clipboard)
  if (navigator.clipboard && navigator.clipboard.write) {
    try {
      const response = await fetch(absoluteUrl);
      const blob = await response.blob();

      let pngBlob = blob;
      if (blob.type !== "image/png") {
        pngBlob = await convertBlobToPng(blob);
      }

      const item = new ClipboardItem({
        "image/png": pngBlob
      });
      await navigator.clipboard.write([item]);
      imageCopied = true;
    } catch (err) {
      console.error("Failed to copy image to clipboard:", err);
    }
  }

  // Dispatch custom event to notify parent App state to show a Toast
  window.dispatchEvent(
    new CustomEvent("whatsapp_image_copied", {
      detail: { copied: imageCopied }
    })
  );

  // 3. Open WhatsApp link with text message
  openWhatsApp(message);
};

