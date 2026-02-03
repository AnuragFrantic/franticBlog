



import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ShareButtons from "@/components/blog/ShareButton";
import { getPostBySlug, latestPosts } from "@/controller/post.controller";



const IMAGE_URL =
    typeof window !== "undefined"
        ? `${window.location.protocol}//${window.location.host}/`
        : "";

const stripHtml = (html = "") => html.replace(/<[^>]*>?/gm, "");

// async function fetchBlog(slug) {
//     const res = await fetch(`${API_URL}/post?url=${slug}`, {
//         cache: "no-store",
//     });

//     const json = await res.json();
//     return json?.data?.[0] || null;
// }

// async function latestPosts(slug) {
//     const res = await fetch(`${API_URL}/post/latest?url=${slug}`, {
//         cache: "no-store",
//     });

//     const json = await res.json();
//     return json?.data || [];
// }

/**
 * ✅ Next.js SEO (Best way)
 */
export async function generateMetadata({ params }) {
    const { slug } = await params;

    const blog = await getPostBySlug(slug);

    if (!blog) {
        return {
            title: "Blog not found",
            description: "This blog does not exist.",
        };
    }

    const siteUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

    const seoTitle = blog?.title || "Blog";
    const seoDesc =
        blog?.metaDescription ||
        stripHtml(blog?.content || "").slice(0, 160) ||
        "Read this blog.";

    const seoImagePath = blog?.thumbnail || blog?.banner;

    // 👉 Always absolute URL
    const seoImage = seoImagePath
        ? `${siteUrl}/${seoImagePath.replace(/^\/+/, "")}`
        : `${siteUrl}/default-og.jpg`;

    return {
        title: seoTitle,
        description: seoDesc,
        metadataBase: new URL(siteUrl),

        openGraph: {
            title: seoTitle,
            description: seoDesc,
            url: `/blogs/${slug}`,
            type: "article",
            images: [
                {
                    url: seoImage,
                    width: 1200,
                    height: 630,
                    alt: seoTitle,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: seoTitle,
            description: seoDesc,
            images: [seoImage],
        },
    };
}


export default async function BlogDetailPage({ params }) {
    const { slug } = await params;

    const blog = await getPostBySlug(slug);
    if (!blog) return notFound();

    const latest = await latestPosts(slug);

    const seoImagePath = blog?.banner || blog?.thumbnail;
    const bannerImage = seoImagePath
        ? `${seoImagePath}`
        : "https://via.placeholder.com/1200x600?text=Blog";

    return (
        <div className="min-h-screen  text-white">
            {/* ✅ HERO SECTION */}
            <section className="relative overflow-hidden border-b border-white/10">
                {/* Glow */}
                {/* <div className="absolute inset-0">
                    <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-600/25 blur-[120px]" />
                    <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px]" />
                    <div className="absolute bottom-0 left-1/2 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
                </div> */}

                <div className="relative max-w-7xl mx-auto px-4 pt-6 sm:pt-10 pb-10 sm:pb-16">
                    {/* Breadcrumb */}
                    <div className="text-xs sm:text-sm text-white/60 flex flex-wrap gap-2">
                        <Link href="/" className="hover:text-white transition">
                            Home
                        </Link>
                        <span className="text-white/30">/</span>
                        <Link href="/blogs" className="hover:text-white transition">
                            Blogs
                        </Link>
                        <span className="text-white/30">/</span>
                        <span className="text-white font-semibold line-clamp-1">
                            {blog?.title}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="mt-5 text-[26px] leading-snug sm:text-5xl sm:leading-tight font-black tracking-tight">
                        {blog?.title}
                    </h1>

                    {/* Meta info */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        {blog?.category?.name && (
                            <Badge className="rounded-full bg-blue-600/90 text-white border border-white/10">
                                {blog.category.name}
                            </Badge>
                        )}

                        {blog?.createdAt && (
                            <span className="text-sm text-white/60">
                                {new Date(blog.createdAt).toDateString()}
                            </span>
                        )}

                        {blog?.keywords?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {blog.keywords.slice(0, 6).map((k, i) => (
                                    <Badge
                                        key={i}
                                        className="rounded-full text-[11px] bg-white/10 border border-white/10 text-white/80"
                                    >
                                        {k}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Banner */}
                    <div className="mt-8 sm:mt-10 relative h-[220px] sm:h-[380px] lg:h-[460px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                        <Image
                            src={bannerImage}
                            alt={blog?.title || "blog"}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                    </div>
                </div>
            </section>

            {/* ✅ MAIN CONTENT */}
            <section className="py-10 sm:py-14">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-12 gap-6 lg:gap-10">
                    {/* Content */}
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        {/* Intro Card */}
                        {blog?.metaDescription && (
                            <Card className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                                <CardContent className="p-5 sm:p-8">
                                    <p className="text-white/80 text-base sm:text-lg leading-relaxed font-semibold">
                                        {blog.metaDescription}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Blog Content */}
                        <Card className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                            <CardContent className="p-5 sm:p-10 blogtexteditor">
                                <div
                                    className="prose prose-invert prose-base sm:prose-lg max-w-none
                  prose-headings:font-black text-white prose-headings:text-white
                  prose-p:text-white/80
                  prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white
                  prose-li:text-white/80
                  prose-blockquote:border-white/20 prose-blockquote:text-white/70
                  prose-img:rounded-2xl"
                                    dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
                                />
                            </CardContent>

                            <Separator className="bg-white/10" />

                            <CardFooter className="p-5 sm:p-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                                <Button
                                    asChild
                                    className="rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 w-full sm:w-auto"
                                >
                                    <Link href="/blogs">← Back to Blogs</Link>
                                </Button>

                                {/* ✅ Share button must be a Client Component */}
                                <div className="w-full sm:w-auto">
                                    <ShareButtons />
                                </div>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <aside className="col-span-12 lg:col-span-4">
                        <div className="lg:sticky lg:top-24 space-y-6">
                            {/* Quick Actions */}
                            <Card className="rounded-3xl bg-white/5 border border-white/10">
                                <CardHeader className="px-6 py-5 border-b border-white/10">
                                    <h3 className="text-sm font-extrabold tracking-wide text-white">
                                        Quick Links
                                    </h3>
                                    <p className="text-xs text-white/60 mt-1">
                                        Easy navigation
                                    </p>
                                </CardHeader>

                                <CardContent className="p-5 flex flex-col gap-3">
                                    {/* <Button
                                        asChild
                                        className="rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10"
                                    >
                                        <Link href="/blogs">Browse all blogs</Link>
                                    </Button> */}

                                    <Button
                                        asChild
                                        className="rounded-2xl bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Link href="/">Go to Homepage</Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Latest Blogs */}
                            {latest?.length > 1 && (
                                <Card className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                                    <CardHeader className="px-6 py-5 border-b border-white/10">
                                        <h3 className="text-sm font-extrabold tracking-wide text-white">
                                            Latest Blogs
                                        </h3>
                                        <p className="text-xs text-white/60 mt-1">
                                            Continue reading
                                        </p>
                                    </CardHeader>

                                    <CardContent className="p-4 space-y-3">
                                        {latest
                                            .filter((b) => b.slug !== slug)   // ✅ remove opened blog
                                            .slice(0, 5)
                                            .map((b) => {

                                                const imgPath = b?.thumbnail || b?.banner;

                                                return (
                                                    <Link
                                                        key={b._id}
                                                        href={`/blogs/${b.slug}`}
                                                        className="group flex gap-4 rounded-2xl p-3 hover:bg-white/5 transition border border-transparent hover:border-white/10"
                                                    >
                                                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                                                            <Image
                                                                src={imgPath}
                                                                alt={b.title || "blog"}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>

                                                        <div className="flex-1">
                                                            <p className="text-sm font-semibold text-white line-clamp-2 group-hover:text-blue-300 transition">
                                                                {b.title}
                                                            </p>
                                                            <p className="text-xs text-white/50 mt-1">
                                                                {b?.createdAt
                                                                    ? new Date(b.createdAt).toDateString()
                                                                    : ""}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                    </CardContent>
                                </Card>
                            )}

                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}
