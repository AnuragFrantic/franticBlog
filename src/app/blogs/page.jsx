// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// import { PostService } from "@/services/post.service";
// import { CategoryService } from "@/services/category.service";

// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Input } from "@/components/ui/input";

// const getSafeImage = (blog) => {
//     const img = process.env.NEXT_PUBLIC_IMAGE_URL + blog?.thumbnail || blog?.banner;

//     // fallback
//     if (!img) {
//         return "https://via.placeholder.com/600x400?text=Blog";
//     }

//     // absolute url
//     if (img.startsWith("http")) {
//         return img;
//     }

//     // ensure leading slash
//     if (!img.startsWith("/")) {
//         return "/" + img;
//     }

//     return img;
// };

// export default function BlogsPage() {
//     const [loading, setLoading] = useState(true);
//     const [blogs, setBlogs] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [activeCat, setActiveCat] = useState("all");
//     const [search, setSearch] = useState("");

//     useEffect(() => {
//         const load = async () => {
//             try {
//                 setLoading(true);

//                 const [blogRes, catRes] = await Promise.all([
//                     PostService.getAll(),
//                     CategoryService.getAll(),
//                 ]);

//                 setBlogs(blogRes?.posts || []);
//                 setCategories(catRes?.data || []);
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         load();
//     }, []);

//     const filteredBlogs = useMemo(() => {
//         let list = blogs;

//         if (activeCat !== "all") {
//             list = list.filter((b) => {
//                 const catId = b?.category?._id || b?.category;
//                 return catId === activeCat;
//             });
//         }

//         if (search.trim()) {
//             const q = search.toLowerCase();
//             list = list.filter(
//                 (b) =>
//                     b?.title?.toLowerCase().includes(q) ||
//                     b?.metaDescription?.toLowerCase().includes(q)
//             );
//         }

//         return list;
//     }, [blogs, activeCat, search]);

//     if (loading) {
//         return (
//             <div className="container mx-auto py-12">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {[...Array(6)].map((_, i) => (
//                         <Skeleton key={i} className="h-64 w-full" />
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto py-12 px-4">
//             {/* Filters */}
//             <div className="flex flex-col md:flex-row gap-4 mb-8 items-center md:items-end">
//                 <Input
//                     placeholder="Search blogs..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="max-w-md flex-1"
//                 />
//                 <div className="flex flex-wrap gap-2">
//                     <Button
//                         variant={activeCat === "all" ? "default" : "outline"}
//                         onClick={() => setActiveCat("all")}
//                         size="sm"
//                         className={activeCat === "all" ? "text-white" : ""}
//                     >
//                         All
//                     </Button>

//                     {categories.map((cat) => (
//                         <Button
//                             key={cat._id}
//                             variant={activeCat === cat._id ? "default" : "outline"}
//                             onClick={() => setActiveCat(cat._id)}
//                             size="sm"
//                             className={activeCat === cat._id ? "text-white" : ""}
//                         >
//                             {cat.name}
//                         </Button>
//                     ))}
//                 </div>

//             </div>

//             {/* Blogs Grid */}
//             {filteredBlogs.length === 0 ? (
//                 <p className="text-center text-muted-foreground py-12">
//                     No blogs found matching your criteria.
//                 </p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredBlogs.map((blog) => (
//                         <Card key={blog._id} className="hover:shadow-lg transition-shadow group">
//                             <CardHeader className="p-0 relative overflow-hidden rounded-t-lg">
//                                 <Image
//                                     src={getSafeImage(blog)}
//                                     alt={blog.title}
//                                     width={400}
//                                     height={250}
//                                     className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                                 />
//                             </CardHeader>
//                             <CardContent className="p-6">
//                                 <Badge className="mb-3 text-white">
//                                     {blog.category?.name || "Uncategorized"}
//                                 </Badge>
//                                 <h3 className="font-semibold text-lg mb-2 leading-tight">
//                                     {blog.title}
//                                 </h3>
//                                 <p className="text-sm text-muted-foreground line-clamp-3">
//                                     {blog.metaDescription}
//                                 </p>
//                             </CardContent>
//                             <CardFooter className="p-6 pt-0">
//                                 <Link href={`/blogss/${blog.slug}`}>
//                                     <Button className="w-full" variant="outline" size="sm">
//                                         Read More
//                                     </Button>
//                                 </Link>
//                             </CardFooter>
//                         </Card>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );


// }




"use client";

import { useEffect, useMemo, useState } from "react";

import { PostService } from "@/services/post.service";
import { CategoryService } from "@/services/category.service";

import FeaturedArticle from "@/components/blog/FeaturedArticle";
import BlogCard from "@/components/blog/BlogCard";

/* ================= IMAGE FALLBACK ================= */
const withImage = (blog) => ({
    ...blog,
    thumbnail:
        blog?.thumbnail ||
        blog?.banner ||
        blog?.image ||
        "https://via.placeholder.com/800x600?text=Blog",
});

export default function BlogsPage() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");

    /* ================= LOAD DATA ================= */
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const [postRes, catRes] = await Promise.all([
                    PostService.getAll(),
                    CategoryService.getAll(),
                ]);

                const safeBlogs = (postRes?.posts || []).map(withImage);

                setBlogs(safeBlogs);
                setCategories(catRes?.data || []);
            } catch (error) {
                console.error("BLOG PAGE ERROR:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    /* ================= FILTER BLOGS ================= */
    const filteredBlogs = useMemo(() => {
        if (activeCategory === "all") return blogs;

        return blogs.filter(
            (blog) =>
                blog?.category?._id === activeCategory ||
                blog?.category === activeCategory
        );
    }, [blogs, activeCategory]);

    /* ================= SPLIT BLOGS ================= */
    const firstSection = filteredBlogs.slice(0, 3);   // top
    const secondSection = filteredBlogs.slice(3, 8);  // next editorial
    const remainingBlogs = filteredBlogs.slice(8);    // rest auto

    /* ================= LOADING ================= */
    if (loading) {
        return (
            <div className="max-w-[1240px] mx-auto px-4 py-16 text-center">
                Loading blogs...
            </div>
        );
    }

    return (
        <div className="max-w-[1240px] mx-auto px-4 py-6 text-black">

            {/* ================= CATEGORY BAR ================= */}
            <div className="flex gap-6 md:gap-8 text-[13px] font-medium border-b border-gray-300 pb-4 mb-8 overflow-x-auto">
                <span
                    onClick={() => setActiveCategory("all")}
                    className={`cursor-pointer whitespace-nowrap ${activeCategory === "all"
                        ? "font-bold underline decoration-2 underline-offset-4"
                        : "hover:underline underline-offset-4"
                        }`}
                >
                    All
                </span>

                {categories.map((cat) => (
                    <span
                        key={cat._id}
                        onClick={() => setActiveCategory(cat._id)}
                        className={`cursor-pointer whitespace-nowrap ${activeCategory === cat._id
                            ? "font-bold underline decoration-2 underline-offset-4"
                            : "hover:underline underline-offset-4"
                            }`}
                    >
                        {cat.name}
                    </span>
                ))}
            </div>

            {/* ================= EMPTY STATE ================= */}
            {filteredBlogs.length === 0 && (
                <div className="py-24 text-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                        No blogs found
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        There are no articles in this category yet.
                    </p>
                </div>
            )}

            {filteredBlogs.length > 0 && (
                <>
                    {/* ================= FIRST FEATURED SECTION ================= */}
                    <section className="py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                            <div className="lg:col-span-3 lg:pr-6 lg:border-r">
                                {firstSection[0] && (
                                    <FeaturedArticle blog={firstSection[0]} variant="text-only" />
                                )}
                            </div>

                            <div className="lg:col-span-6">
                                {firstSection[1] && (
                                    <FeaturedArticle blog={firstSection[1]} variant="hero" />
                                )}
                            </div>

                            <div className="lg:col-span-3 lg:pl-6 lg:border-l">
                                {firstSection[2] && (
                                    <FeaturedArticle blog={firstSection[2]} variant="secondary" />
                                )}
                            </div>

                        </div>
                    </section>

                    <hr className="my-4 border-t border-black" />

                    {/* ================= SECOND EDITORIAL SECTION ================= */}
                    <section className="py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                            {/* LEFT STACK */}
                            <div className="lg:col-span-3 lg:pr-6 lg:border-r space-y-6">
                                {secondSection.slice(0, 2).map((blog) => (
                                    <BlogCard
                                        key={blog._id}
                                        blog={blog}
                                        variant="compact"   // ✅ change here
                                    />
                                ))}
                            </div>

                            {/* CENTER HERO */}
                            <div className="lg:col-span-6">
                                {secondSection[2] && (
                                    <FeaturedArticle
                                        blog={secondSection[2]}
                                        variant="hero"
                                    />
                                )}
                            </div>

                            {/* RIGHT COMPACT */}
                            <div className="lg:col-span-3 lg:pl-6 lg:border-l space-y-5">
                                {secondSection.slice(3, 5).map((blog) => (
                                    <BlogCard
                                        key={blog._id}
                                        blog={blog}
                                        variant="compact"
                                    />
                                ))}
                            </div>

                        </div>
                    </section>

                    {/* ================= REMAINING BLOGS ================= */}
                    {remainingBlogs.length > 0 && (
                        <>
                            <hr className="my-12 border-t border-black" />

                            <section className="py-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {remainingBlogs.map((blog, index) => (
                                        <BlogCard
                                            key={blog._id}
                                            blog={blog}
                                            variant={index % 3 === 0 ? "horizontal" : "compact"}
                                        />
                                    ))}
                                </div>
                            </section>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

