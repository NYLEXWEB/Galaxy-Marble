/**
 * Galaxy Granite & Marble — Central Business Configuration
 * Contains verified Google Business information and configurable contact parameters.
 */
export const BUSINESS_CONFIG = {
    name: "Galaxy Granite & Marble",
    category: "Building Materials Store",
    tagline: "Natural Stone. Designed for Beautiful Spaces.",
    rating: 3.8,
    reviewCount: 35,
    location: {
        address: "Edavanna–Koyilandy Road, Mukkam",
        district: "Kozhikode",
        state: "Kerala",
        pincode: "673602",
        fullAddress: "Edavanna–Koyilandy, Mukkam, Kerala 673602",
        // Configurable Google Maps URL
        googleMapsUrl: "https://maps.google.com/?q=Galaxy+Granite+%26+Marble+Mukkam+Kerala"
    },
    openingHours: {
        opensAt: "9:00 AM",
        scheduleText: "Opens at 9:00 AM"
    },
    contact: {
        // Primary WhatsApp contact number (international format without + or spaces for API links)
        // Replace with exact client phone number when provided
        whatsappNumber: "919447420000",
        phoneDisplay: "+91 94474 20000",
        emailDisplay: null, // Keep null if email is not provided to avoid inventing fake data
    },
    trustPoints: [
        "Direct Showroom Quality Inspection",
        "Curated Granite & Imported Marble Slabs",
        "Custom Cut-to-Size Precision",
        "Serving Mukkam & Surrounding Regions in Kerala"
    ]
};
