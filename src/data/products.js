/**
 * Galaxy Granite & Marble — Product Catalogue
 * Configurable product database featuring natural granite & marble selections.
 * Prices remain on request / current market rate to reflect live market pricing.
 */
export const PRODUCTS = [
    {
        id: "black-galaxy",
        name: "Black Galaxy Granite",
        code: "GGM-BG-01",
        category: "Granite",
        subCategory: "Black Granite",
        color: "Black",
        price: "Get Current Price",
        finish: "High Gloss Polished",
        thickness: "18mm / 20mm Gangsaw Slabs",
        applications: ["Kitchen", "Staircase", "Flooring", "Countertops"],
        images: [
            "/images/black_galaxy.png",
            "/images/absolute_black.png"
        ],
        description: "Deep dark jet-black natural granite studded with fine metallic golden and copper flecks. Renowned for supreme heat resistance, scratch proof surface, and rich architectural depth.",
        featured: true,
        popular: true,
        availability: "Available in Gangsaw & Cutter Slabs"
    },
    {
        id: "italian-statuario-marble",
        name: "Italian Statuario Marble",
        code: "GGM-SM-02",
        category: "Marble",
        subCategory: "Premium Collection",
        color: "White",
        price: "Price on Request",
        finish: "Mirror Polished / Honed",
        thickness: "16mm / 18mm",
        applications: ["Flooring", "Bathroom", "Wall", "Interior"],
        images: [
            "/images/white_italian.png",
            "/images/viscon_white.png"
        ],
        description: "Pure crisp white marble adorned with sweeping grey veins. Brings unparalleled elegance and luminous light reflectiveness to living spaces and feature wall elevations.",
        featured: true,
        popular: true,
        availability: "Imported Slab Stock Available"
    },
    {
        id: "kashmir-white-granite",
        name: "Kashmir White Granite",
        code: "GGM-KW-03",
        category: "Granite",
        subCategory: "White Granite",
        color: "White",
        price: "Get Current Price",
        finish: "Polished / Flamed",
        thickness: "18mm / 20mm",
        applications: ["Kitchen", "Flooring", "Interior", "Wall"],
        images: [
            "/images/kashmir_white.png",
            "/images/viscon_white.png"
        ],
        description: "Elegant off-white natural granite with light grey mottling and garnet specks. Ideal for modern minimalist kitchen countertops and spacious living room flooring.",
        featured: true,
        popular: false,
        availability: "In Stock"
    },
    {
        id: "steel-grey-granite",
        name: "Steel Grey Granite",
        code: "GGM-SG-04",
        category: "Granite",
        subCategory: "Grey Granite",
        color: "Grey",
        price: "Get Current Price",
        finish: "Lappato / Leathered / Polished",
        thickness: "18mm",
        applications: ["Kitchen", "Staircase", "Exterior", "Countertops"],
        images: [
            "/images/steel_grey.png",
            "/images/hero_stone.png"
        ],
        description: "Modern metallic mid-grey tone with subtle charcoal undertones. Highly recommended in leathered or lappato finish for slip-resistant kitchen counters and outdoor patios.",
        featured: false,
        popular: true,
        availability: "In Stock"
    },
    {
        id: "tan-brown-granite",
        name: "Tan Brown Granite",
        code: "GGM-TB-05",
        category: "Granite",
        subCategory: "Granite",
        color: "Brown",
        price: "Get Current Price",
        finish: "Polished",
        thickness: "18mm / 20mm",
        applications: ["Staircase", "Kitchen", "Flooring"],
        images: [
            "/images/tan_brown.png",
            "/images/black_galaxy.png"
        ],
        description: "Rich dark brown granite featuring black and reddish-brown mineral flecks. A classic, highly durable natural stone option for staircase risers, treads, and entryways.",
        featured: false,
        popular: true,
        availability: "In Stock"
    },
    {
        id: "katni-beige-marble",
        name: "Katni Beige Marble",
        code: "GGM-KM-06",
        category: "Marble",
        subCategory: "Marble",
        color: "Beige",
        price: "Get Current Price",
        finish: "Polished",
        thickness: "16mm / 18mm",
        applications: ["Flooring", "Wall", "Interior"],
        images: [
            "/images/katni_beige.png",
            "/images/white_italian.png"
        ],
        description: "Warm limestone-hued Indian marble with soft natural wave patterns. Offers great thermal comfort and seamless floor finish at an economical price bracket.",
        featured: true,
        popular: false,
        availability: "Fresh Slabs Ready"
    },
    {
        id: "absolute-black-honed",
        name: "Absolute Black Honed Granite",
        code: "GGM-AB-07",
        category: "Granite",
        subCategory: "Black Granite",
        color: "Black",
        price: "Get Current Price",
        finish: "Matte Honed / Satin",
        thickness: "20mm Custom Cut",
        applications: ["Kitchen", "Countertops", "Bathroom", "Exterior"],
        images: [
            "/images/absolute_black.png",
            "/images/black_galaxy.png"
        ],
        description: "Pure uniform deep dark black granite with a smooth matte velvety finish. Ideal for modern architectural vanity counters, window sills, and island tops.",
        featured: true,
        popular: true,
        availability: "Custom Cuts Available"
    },
    {
        id: "viscon-white-granite",
        name: "Viscon White Granite",
        code: "GGM-VW-08",
        category: "Granite",
        subCategory: "White Granite",
        color: "White",
        price: "Get Current Price",
        finish: "Polished",
        thickness: "18mm",
        applications: ["Kitchen", "Flooring", "Wall"],
        images: [
            "/images/viscon_white.png",
            "/images/kashmir_white.png"
        ],
        description: "Dynamic flowing wave patterns of silver, charcoal, and ice white. Each slab is an architectural masterpiece with distinct natural movement.",
        featured: false,
        popular: false,
        availability: "In Stock"
    }
];

export const CATEGORIES = [
    { id: "granite", name: "Granite" },
    { id: "marble", name: "Marble" },
    { id: "black-granite", name: "Black Granite" },
    { id: "white-granite", name: "White Granite" },
    { id: "grey-granite", name: "Grey Granite" },
    { id: "premium-collection", name: "Premium Collection" }
];

export const APPLICATIONS = [
    { id: "Kitchen", title: "Kitchen Countertops", description: "Heat-resistant & scratch durable surfaces" },
    { id: "Staircase", title: "Staircase Treads", description: "Anti-skid edge profiled treads & risers" },
    { id: "Flooring", title: "Room Flooring", description: "Seamless polished granite and gangsaw slabs" },
    { id: "Bathroom", title: "Bathroom Vanity", description: "Moisture-resistant stone vanity tops" },
    { id: "Wall", title: "Interior Wall", description: "Book-matched feature wall cladding" },
    { id: "Exterior", title: "Exterior Paving", description: "Flammed & leather finish granite" }
];

export const COLOR_TONES = ["Black", "White", "Grey", "Brown", "Beige"];

export const SURFACES = ["High Gloss Polished", "Mirror Polished / Honed", "Polished / Flamed", "Lappato / Leathered / Polished", "Polished", "Matte Honed / Satin"];

