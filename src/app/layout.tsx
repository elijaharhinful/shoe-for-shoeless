import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoe for Shoeless - Walking Toward a Brighter Future",
  description: "Empowering communities through education and footwear. Every pair of shoes we provide opens doors to education, health, and hope for children in need.",
  keywords: ["charity", "shoes", "education", "donation", "nonprofit", "children", "africa", "community"],
  openGraph: {
    title: "Shoe for Shoeless - Walking Toward a Brighter Future",
    description: "Empowering communities through education and footwear.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
