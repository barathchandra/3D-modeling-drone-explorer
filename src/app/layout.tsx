import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/providers/SmoothScroll";
// @ts-ignore: side-effect CSS import without module declarations
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Flydronics — Component Explorer",
  description: "Premium interactive 3D drone engineering explorer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body bg-[#bfbfbf] text-[#1a1a1a] antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
