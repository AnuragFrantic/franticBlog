


import Footer from "@/components/common/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import NavbarWrapper from "@/components/common/NavbarWrapper";

import Script from "next/script";

export const metadata = {
  title: "Frantic Infotech Blogs",
  description: "Latest technology blogs and development insights by Frantic Infotech.",
  other: {
    "google-adsense-account": "ca-pub-6395818089964635",
    "google-site-verification": "4Dve4f72U8qIaWmSKK8_cMhEZ74Fjh7VLvDa3pDN7g4"
  },

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});





export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>

      {/* ✅ Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-V0MMDVME95"
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-V0MMDVME95');
        `}
      </Script>
      {/* ✅ Google AdSense Script */}
      <Script
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6395818089964635"
        crossOrigin="anonymous"
      />
      <body className={`${inter.variable} `}>


        <NavbarWrapper />

        {children}

        <Footer />


      </body>
    </html>
  );
}

