import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

import { PRODUCTS } from "../data/products";
import { BUSINESS_CONFIG } from "../config/business";

export const metadata = {
  metadataBase: new URL("https://galaxygranites.co.in"),
  title: "Galaxy Granite & Marble | Best Granite & Marble Showroom in Mukkam, Kozhikode",
  description: "Explore premium granite and marble collections for kitchens, staircases, flooring, and interiors at Galaxy Granite & Marble, Mukkam, Kerala. Get instant quotes via WhatsApp.",
  keywords: [
    "Galaxy Granite & Marble",
    "Galaxy Granites Mukkam",
    "Granite showroom Mukkam",
    "Marble dealers Kozhikode",
    "Premium Italian marble Kerala",
    "Black Galaxy Granite price",
    "Khammam Black granite",
    "Leather Black granite",
    "Steel Grey granite Kerala",
    "Statuario imported marble",
    "Kitchen countertop granite Kozhikode",
    "Staircase granite design",
    "Natural stone dealers Mukkam",
    "Marble and granite shop Kerala"
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/galaxy_granites_logo.png",
    shortcut: "/images/galaxy_granites_logo.png",
    apple: "/images/galaxy_granites_logo.png",
  },
  openGraph: {
    title: "Galaxy Granite & Marble — Premium Digital Showroom",
    description: "Explore premium granite and marble collections at Mukkam, Kerala. Get instant quotes via WhatsApp.",
    url: "https://galaxygranites.co.in",
    siteName: "Galaxy Granite & Marble",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/showroom_day.jpg",
        width: 1200,
        height: 630,
        alt: "Galaxy Granite & Marble Showroom Exterior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galaxy Granite & Marble Showroom",
    description: "Premium granite and marble collections in Mukkam, Kerala.",
    images: ["/images/showroom_day.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://galaxygranites.co.in/#organization",
    "name": BUSINESS_CONFIG.name,
    "url": "https://galaxygranites.co.in",
    "logo": "https://galaxygranites.co.in/favicon.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": BUSINESS_CONFIG.contact.phoneDisplay,
      "contactType": "sales",
      "areaServed": "IN",
      "availableLanguage": "en"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://galaxygranites.co.in/#localbusiness",
    "name": BUSINESS_CONFIG.name,
    "image": [
      "https://galaxygranites.co.in/images/showroom_day.jpg",
      "https://galaxygranites.co.in/images/showroom_night.jpg"
    ],
    "telephone": BUSINESS_CONFIG.contact.phoneDisplay,
    "url": "https://galaxygranites.co.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_CONFIG.location.address,
      "addressLocality": "Mukkam",
      "addressRegion": "Kerala",
      "postalCode": BUSINESS_CONFIG.location.pincode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 11.3195,
      "longitude": 75.9868
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      BUSINESS_CONFIG.location.googleMapsUrl
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": PRODUCTS.length,
    "itemListElement": PRODUCTS.map((prod, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": prod.name,
        "image": prod.images.map(img => `https://galaxygranites.co.in${img}`),
        "description": prod.description,
        "sku": prod.code,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "0",
          "priceType": "Request Price",
          "availability": "https://schema.org/InStock",
          "validThrough": "2027-12-31"
        }
      }
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What products are available at Galaxy Granite & Marble?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer premium natural stone slabs including imported white Italian marble, Black Galaxy granite, Khammam Black, Honey Blue, Leather Black, Steel Grey granite, kitchen countertops, staircases, and custom cut-to-size stones."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Galaxy Granite & Marble showroom located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our physical showroom is located at ${BUSINESS_CONFIG.location.address}, Mukkam, Kozhikode, Kerala ${BUSINESS_CONFIG.location.pincode}, serving Kozhikode and surrounding districts.`
        }
      },
      {
        "@type": "Question",
        "name": "How can I get a price quotation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can select stones from our digital catalog, add them to your enquiry basket, specify your required slab area in square feet, and submit the details to receive an instant price quote on WhatsApp."
        }
      },
      {
        "@type": "Question",
        "name": "What are your business hours?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our physical showroom opens daily from ${BUSINESS_CONFIG.openingHours.opensAt} Monday through Saturday. Slot scheduling is available online for site inspections.`
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/images/galaxy_granites_logo.png" />
        <link rel="apple-touch-icon" href="/images/galaxy_granites_logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="bg-[#FAFAFA] text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-[#FAFAFA]">
        {children}
      </body>
    </html>
  );
}
