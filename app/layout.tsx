import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import SmoothScroll from "@/components/providers/smooth-scroll";
import { Preloader } from "@/components/ui/Preloader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Prevent Font Awesome from adding its CSS since it's imported above
config.autoAddCss = false;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const corpta = localFont({
  src: [
    {
      path: "../public/fonts/Corpta-DEMO.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Corpta-DEMO.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-corpta",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/space/SpaceGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/space/SpaceGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/space/SpaceGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/space/SpaceGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumera Ventures | Premium LED Lighting & Display Systems",
  description: "High-performance architectural LED lighting and advanced LED display solutions by Lumera Ventures.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${corpta.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-black text-foreground font-sans">
        <Preloader>
          <Header/>
          <SmoothScroll>{children}</SmoothScroll>
          <Footer/>
        </Preloader>
      </body>
    </html>
  );
}
