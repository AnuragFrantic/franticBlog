// import Footer from "@/components/common/Footer";
// import "./globals.css";
// import { Inter } from "next/font/google";
// import NavbarWrapper from "@/components/common/NavbarWrapper";

// export const metadata = {
//   title: "Frantic Infotech Blogs",
//   description: "Latest technology blogs and development insights by Frantic Infotech.",

//   icons: {
//     icon: "/favicon.svg",
//     shortcut: "/favicon.svg",
//     apple: "/favicon.svg",
//   },
// };

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// export default function RootLayout({ children }) {
//   const baseUrl = "https://frantic-blog.vercel.app";

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "Organization",
//         "@id": `${baseUrl}/#organization`,
//         name: "Frantic Infotech",
//         url: baseUrl,
//         logo: {
//           "@type": "ImageObject",
//           url: `${baseUrl}/favicon.svg`,
//         },
//       },
//       {
//         "@type": "WebSite",
//         "@id": `${baseUrl}/#website`,
//         url: baseUrl,
//         name: "Frantic Infotech Blogs",
//         publisher: {
//           "@id": `${baseUrl}/#organization`,
//         },
//         potentialAction: {
//           "@type": "SearchAction",
//           target: `${baseUrl}/blogs?search={search_term_string}`,
//           "query-input": "required name=search_term_string",
//         },
//       },
//     ],
//   };

//   return (
//     <html lang="en">
//       <body suppressHydrationWarning className={inter.variable}>
//         <NavbarWrapper />

//         {/* ✅ Global Schema */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />

//         {children}

//         <Footer />
//       </body>
//     </html>
//   );
// }



import Footer from "@/components/common/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import NavbarWrapper from "@/components/common/NavbarWrapper";
import Providers from "./provider";
import Script from "next/script";

export const metadata = {
  title: "Frantic Infotech Blogs",
  description: "Latest technology blogs and development insights by Frantic Infotech.",
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
      {/* ✅ Google AdSense Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6395818089964635"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body className={inter.variable}>
        <Providers>

          <NavbarWrapper />

          {children}

          <Footer />

        </Providers>
      </body>
    </html>
  );
}

