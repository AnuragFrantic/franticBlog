import "./globals.css";
import NavbarWrapper from "@/components/common/NavbarWrapper";
import logo from "@/app/assets/logo.svg";

export const metadata = {
  title: "Frantic Infotech Blogs",
  description: "Latest technology blogs and development insights by Frantic Infotech.",
  icons: {
    icon: logo.src, // favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
