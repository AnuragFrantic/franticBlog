// import "./globals.css";
// import NavbarWrapper from "@/components/common/NavbarWrapper";
// import logo from "@/app/assets/logo.svg";

// export const metadata = {
//   title: "Frantic Infotech Blogs",
//   description: "Latest technology blogs and development insights by Frantic Infotech.",
//   icons: {
//     icon: logo.src, // favicon
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body suppressHydrationWarning>
//         <NavbarWrapper />
//         {children}
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import NavbarWrapper from "@/components/common/NavbarWrapper";

export const metadata = {
  title: "Frantic Infotech Blogs",
  description: "Latest technology blogs and development insights by Frantic Infotech.",
};

export default function RootLayout({ children }) {
  const baseUrl = "https://frantic-blog.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Frantic Infotech",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`, // put logo.png in public folder
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Frantic Infotech Blogs",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/blogs?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <NavbarWrapper />

        {/* ✅ Global Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
      </body>
    </html>
  );
}
