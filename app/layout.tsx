import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import ThemeProvider from "@/components/theme/ThemeProvider";
import ThemePicker from "@/components/theme/ThemePicker";
import { ChatProvider } from "@/components/chat/ChatProvider";
import { BrochureProvider } from "@/components/brochure/BrochureProvider";
import ChatWidget from "@/components/chat/ChatWidget";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const heading = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "The Vale | Event Venue in Provo, Utah",
  description:
    "6,500 square feet of open space in Provo, Utah. Your caterer, your vendors, your rules. Weddings, receptions, corporate events, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} overflow-x-hidden`}>
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <ThemeProvider>
          <BrochureProvider>
            <ChatProvider>
              <Nav />
              <div className="flex-1">{children}</div>
              <Footer />
              <ThemePicker />
              <ChatWidget />
            </ChatProvider>
          </BrochureProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
