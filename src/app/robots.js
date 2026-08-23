export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/static/"],
    },
    sitemap: "https://galaxygranites.co.in/sitemap.xml",
  };
}
