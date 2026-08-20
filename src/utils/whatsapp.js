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
 * Build Single Product WhatsApp Message
 */
export const buildSingleProductWhatsAppMessage = ({ product, quantity = "", userNote = "" }) => {
    let msg = `Hello Galaxy Granite & Marble,\n\nI am interested in the following product:\n\nProduct: ${product.name} (${product.code || product.category})\nFinish: ${product.finish || "Polished"}\nThickness: ${product.thickness || "Standard"}`;

    if (quantity) {
        msg += `\nQuantity / Area: ${quantity} sq.ft`;
    }

    if (userNote) {
        msg += `\nNote: ${userNote}`;
    }

    msg += `\n\nPlease share the current price and availability.\n\nThank you.`;
    return msg;
};

/**
 * Build Multi-Product Enquiry Basket WhatsApp Message
 */
export const buildBasketWhatsAppMessage = (items, customerDetails = {}) => {
    let msg = `Hello Galaxy Granite & Marble,\n\nI would like to enquire about the following products:\n\n`;

    items.forEach((item, index) => {
        msg += `${index + 1}. ${item.product.name}\n   Finish: ${item.product.finish || "Standard"}\n   Quantity: ${item.quantity || "1"} ${item.unit || "sq.ft"}\n\n`;
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

    msg += `\nPlease share the current price, availability and quotation.\n\nThank you.`;
    return msg;
};

/**
 * Build Calculator Requirement WhatsApp Message
 */
export const buildCalculatorWhatsAppMessage = ({ requirementType, length, width, area, selectedProduct = null, userNotes = "" }) => {
    let msg = `Hello Galaxy Granite & Marble,\n\nI calculated the following stone requirement on your digital showroom:\n\n`;
    msg += `Requirement Type: ${requirementType}\n`;
    msg += `Dimensions: ${length} ft x ${width} ft\n`;
    msg += `Calculated Area: ${area} sq.ft\n`;

    if (selectedProduct) {
        msg += `Preferred Stone: ${selectedProduct.name} (${selectedProduct.category})\n`;
    }

    if (userNotes) {
        msg += `Notes: ${userNotes}\n`;
    }

    msg += `\nPlease share an estimated price quotation and availability.\n(Note: Approximate calculation only to be confirmed before order).\n\nThank you.`;
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
