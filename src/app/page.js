import BlogsPage from "./blogs/page";

/* ================= SEO METADATA ================= */
export const metadata = {
  title: "Blogs | Insights, Stories & Updates",
  description:
    "Read the latest blogs, articles, and insights on technology, design, startups, and product building.",
  openGraph: {
    title: "Blogs | Insights, Stories & Updates",
    description:
      "Read the latest blogs, articles, and insights on technology, design, startups, and product building.",
    url: "/blogs",
    type: "website",
  },
  alternates: {
    canonical: "/blogs",
  },
};

/* ================= PAGE ================= */
export default function Home() {
  return <BlogsPage />;
}
