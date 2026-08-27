import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "Natural Granite & Marble Project Gallery | Kerala Installations",
  description: "Browse real natural stone installations including kitchen countertops, granite stairs, and flooring panels completed by Galaxy Granite & Marble in Kozhikode.",
  keywords: [
    "Galaxy Granite & Marble",
    "granite design gallery Kerala",
    "marble installation photos",
    "completed stone projects Kozhikode",
    "granite showroom Mukkam"
  ],
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
