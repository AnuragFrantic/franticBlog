
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { PostService } from "@/services/post.service";
import { CategoryService } from "@/services/category.service";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

const getSafeImage = (blog) => {
    const img = blog?.thumbnail || blog?.banner;

    // fallback
    if (!img) {
        return "https://via.placeholder.com/600x400?text=Blog";
    }

    // absolute url
    if (img.startsWith("http")) {
        return img;
    }

    // ensure leading slash
    if (!img.startsWith("/")) {
        return "/" + img;
    }

    return img;
};



export default function BlogsPage() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCat, setActiveCat] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);

                const [blogRes, catRes] = await Promise.all([
                    PostService.getAll(),
                    CategoryService.getAll(),
                ]);

                setBlogs(blogRes?.posts || []);
                setCategories(catRes?.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);
    const filteredBlogs = useMemo(() => {
        let list = blogs;

        if (activeCat !== "all") {
            list = list.filter((b) => (b?.category?._id || b?.category) === activeCat);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (b) =>
                    b?.title?.toLowerCase().includes(q) ||
                    b?.metaDescription?.toLowerCase().includes(q)
            );
        }

        return list;
    }, [blogs, activeCat, search]);

    return (
        <div className="min-h-screen bg-[#050914] text-white">
            {/* ✅ HERO */}
            <section className="relative overflow-hidden border-b border-white/10">
                {/* background glow */}
                <div className="absolute inset-0">
                    <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-blue-600/25 blur-[120px]" />
                    <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px]" />
                    <div className="absolute bottom-0 left-1/2 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-16">
                    {/* breadcrumb */}
                    <div className="text-xs sm:text-sm text-white/60">
                        <Link href="/" className="hover:text-white transition">
                            Home
                        </Link>{" "}
                        <span className="mx-1 text-white/30">/</span>
                        <span className="text-white font-semibold">Blogs</span>
                    </div>

                    {/* ✅ Mobile perfect title */}
                    <h1 className="mt-4 text-[28px] leading-snug sm:text-6xl sm:leading-tight font-black tracking-tight">
                        Latest{" "}
                        <span className="text-blue-500 drop-shadow-[0_0_18px_rgba(59,130,246,0.35)]">
                            Articles
                        </span>{" "}
                        & Guides
                    </h1>

                    <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">
                        Explore our latest insights with expert tips, in-depth tutorials, and
                        industry updates to keep you ahead.
                    </p>

                    {/* ✅ Search responsive */}
                    <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                        <div className="w-full sm:max-w-lg">
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search articles..."
                                className="h-11 sm:h-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-blue-500/40"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ✅ MAIN */}
            <section className="py-10 sm:py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-12 gap-6 lg:gap-8">
                        {/* ✅ BLOG LIST */}
                        <div className="col-span-12 lg:col-span-9">
                            {/* ✅ mobile categories - better scrolling UX */}
                            <div className="lg:hidden mb-6 -mx-4 px-4 flex gap-2 overflow-x-auto pb-2 scroll-smooth">
                                <Button
                                    onClick={() => setActiveCat("all")}
                                    className={`rounded-full shrink-0 ${activeCat === "all"
                                        ? "bg-blue-600 hover:bg-blue-600"
                                        : "bg-white/5 hover:bg-white/10"
                                        }`}
                                >
                                    All Blogs
                                </Button>

                                {categories.map((c) => (
                                    <Button
                                        key={c._id}
                                        onClick={() => setActiveCat(c._id)}
                                        className={`rounded-full whitespace-nowrap shrink-0 ${activeCat === c._id
                                            ? "bg-blue-600 hover:bg-blue-600"
                                            : "bg-white/5 hover:bg-white/10"
                                            }`}
                                    >
                                        {c?.name}
                                    </Button>
                                ))}
                            </div>

                            {/* ✅ LOADING */}
                            {loading && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <Card
                                            key={i}
                                            className="rounded-3xl overflow-hidden bg-white/5 border border-white/10"
                                        >
                                            <Skeleton className="h-48 sm:h-56 w-full bg-white/10" />
                                            <CardContent className="p-5 space-y-3">
                                                <Skeleton className="h-4 w-24 bg-white/10" />
                                                <Skeleton className="h-5 w-4/5 bg-white/10" />
                                                <Skeleton className="h-4 w-full bg-white/10" />
                                                <Skeleton className="h-4 w-5/6 bg-white/10" />
                                                <Skeleton className="h-10 w-32 rounded-2xl bg-white/10" />
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}

                            {/* ✅ EMPTY */}
                            {!loading && filteredBlogs.length === 0 && (
                                <Card className="rounded-3xl bg-white/5 border border-white/10">
                                    <CardContent className="p-10 sm:p-12 text-center">
                                        <p className="text-xl font-bold text-white">No blogs found</p>
                                        <p className="text-sm text-white/60 mt-2">
                                            Try changing category or search keyword.
                                        </p>

                                        <div className="mt-6">
                                            <Button
                                                className="rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10"
                                                onClick={() => {
                                                    setActiveCat("all");
                                                    setSearch("");
                                                }}
                                            >
                                                Reset Filters
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* ✅ BLOGS */}
                            {!loading && filteredBlogs.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                                    {filteredBlogs.map((blog) => {
                                        const image = getSafeImage(blog);

                                        const desc =
                                            blog?.metaDescription?.length > 120
                                                ? blog.metaDescription.slice(0, 120) + "..."
                                                : blog?.metaDescription || "No description available.";

                                        return (
                                            <Link
                                                key={blog?._id}
                                                href={`/blogs/${blog?.slug}`}
                                                className="group"
                                            >
                                                <Card className="h-full flex flex-col rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300">
                                                    <CardHeader className="p-0">
                                                        {/* ✅ Mobile responsive image */}
                                                        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                                                            <Image
                                                                src={image}
                                                                alt={blog?.title || "blog"}
                                                                fill
                                                                priority={false}
                                                                className="object-cover scale-100 group-hover:scale-110 transition duration-700"
                                                                sizes="(max-width: 640px) 100vw,
  (max-width: 1024px) 50vw,
  33vw"
                                                                onError={(e) => {
                                                                    e.currentTarget.src =
                                                                        "https://via.placeholder.com/600x400?text=Blog";
                                                                }}
                                                            />

                                                            {/* dark overlay */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

                                                            {/* category */}
                                                            {blog?.category?.name && (
                                                                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                                                                    <Badge className="rounded-full bg-blue-600/90 text-white border border-white/10 backdrop-blur">
                                                                        {blog.category.name}
                                                                    </Badge>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardHeader>

                                                    <CardContent className="p-5 flex-1 flex flex-col">
                                                        <p className="text-xs text-white/50">
                                                            {blog?.createdAt
                                                                ? new Date(blog.createdAt).toDateString()
                                                                : ""}
                                                        </p>

                                                        <h3 className="mt-2 text-white text-base sm:text-lg font-extrabold leading-snug line-clamp-2 group-hover:text-blue-300 transition">
                                                            {blog?.title}
                                                        </h3>

                                                        <p className="mt-2 text-sm text-white/65 line-clamp-3 flex-1">
                                                            {desc}
                                                        </p>

                                                        {/* keywords */}
                                                        {blog?.keywords?.length > 0 && (
                                                            <div className="flex flex-wrap gap-2 mt-4">
                                                                {blog.keywords.slice(0, 4).map((k, i) => (
                                                                    <Badge
                                                                        key={i}
                                                                        className="rounded-full text-[11px] bg-white/10 border border-white/10 text-white/80"
                                                                    >
                                                                        {k}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </CardContent>

                                                    <CardFooter className="p-4 pt-0 mt-auto">
                                                        <Button className="rounded-2xl w-full bg-blue-600 hover:bg-blue-700">
                                                            Read More →
                                                        </Button>
                                                    </CardFooter>
                                                </Card>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* ✅ SIDEBAR */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-24 space-y-6">
                                <Card className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                                    <CardHeader className="px-6 py-5 border-b border-white/10">
                                        <h3 className="text-sm font-extrabold tracking-wide text-white">
                                            Categories
                                        </h3>
                                        <p className="text-xs text-white/60 mt-1">Filter by topic</p>
                                    </CardHeader>

                                    <CardContent className="p-4 space-y-2">
                                        <Button
                                            onClick={() => setActiveCat("all")}
                                            className={`w-full justify-start rounded-2xl ${activeCat === "all"
                                                ? "bg-blue-600 hover:bg-blue-600"
                                                : "bg-white/5 hover:bg-white/10"
                                                }`}
                                        >
                                            All Blogs
                                        </Button>

                                        {categories.map((c) => (
                                            <Button
                                                key={c._id}
                                                onClick={() => setActiveCat(c._id)}
                                                className={`w-full justify-start rounded-2xl ${activeCat === c._id
                                                    ? "bg-blue-600 hover:bg-blue-600"
                                                    : "bg-white/5 hover:bg-white/10"
                                                    }`}
                                            >
                                                {c?.name}
                                            </Button>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
