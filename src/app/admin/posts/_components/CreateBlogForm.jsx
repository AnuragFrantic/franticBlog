"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

import { PostService } from "@/services/post.service";
import { CategoryService } from "@/services/category.service";

const TextEditor = dynamic(() => import("../_components/TextEditor"), {
    ssr: false,
    loading: () => <div className="p-4 text-sm text-gray-500">Loading editor...</div>,
});



const formcontrol =
    "w-full p-2 border bg-white border-blue-gray-400 outline-0 rounded text-sm focus:outline-none";

export default function BlogForm({ id = null }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    const [categories, setCategories] = useState([]);

    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [banner, setBanner] = useState(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    const [metaDescription, setMetaDescription] = useState("");
    const [keywords, setKeywords] = useState("");

    const [oldBanner, setOldBanner] = useState("");
    const [oldThumbnail, setOldThumbnail] = useState("");

    /* ---------------- LOAD CATEGORIES ---------------- */
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await CategoryService.getAll();

                const cats =
                    res?.data?.data ||
                    res?.data?.categories ||
                    res?.data ||
                    res ||
                    [];

                setCategories(Array.isArray(cats) ? cats : []);
            } catch (err) {
                console.log(err);
                toast.error("Failed to load categories");
            }
        };

        loadCategories();
    }, []);

    /* ---------------- LOAD BLOG (EDIT) ---------------- */
    useEffect(() => {
        if (!id) return;

        const loadBlog = async () => {
            try {
                setFetching(true);

                const res = await PostService.getById(id);

                const blg = res?.data?.[0] || res?.data || res;

                if (!blg) return;

                setTitle(blg?.title || "");
                setContent(blg?.content || "");
                setMetaDescription(blg?.metaDescription || "");
                setKeywords(
                    Array.isArray(blg?.keywords) ? blg.keywords.join(", ") : ""
                );

                setCategory(blg?.category?._id || blg?.category || "");

                setOldBanner(blg?.banner || "");
                setOldThumbnail(blg?.thumbnail || "");
            } catch (err) {
                console.log(err);
                toast.error("Failed to fetch blog");
            } finally {
                setFetching(false);
            }
        };

        loadBlog();
    }, [id]);

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return toast.error("Title is required");
        if (!content.trim()) return toast.error("Content is required");
        if (!category) return toast.error("Category is required");

        try {
            setLoading(true);

            const fd = new FormData();
            fd.append("title", title);
            fd.append("content", content);
            fd.append("category", category);
            fd.append("metaDescription", metaDescription);

            const keywordArr = keywords
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean);

            fd.append("keywords", JSON.stringify(keywordArr));

            if (thumbnail) fd.append("thumbnail", thumbnail);
            if (banner) fd.append("banner", banner);

            if (id) {
                const res = await PostService.update(id, fd);

                if (res?.success == 1) {
                    toast.success("Blog updated successfully");
                    router.push("/admin/posts");
                } else {
                    toast.error(res?.message || "Update failed");
                }
            } else {
                const res = await PostService.create(fd);

                if (res?.success == 1) {
                    toast.success("Blog created successfully");
                    router.push("/admin/posts");
                } else {
                    toast.error(res?.message || "Create failed");
                }
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-6">Loading...</div>;

    /* ---------------- UI ---------------- */
    return (
        <section className="py-10">
            <div className="max-w-5xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">

                    {/* Header */}
                    <div className="flex items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                {id ? "Update Blog" : "Create Blog"}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Fill the details below to {id ? "update" : "create"} blog
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => router.push("/admin/posts")}
                            className="px-4 py-2 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-900 transition"
                        >
                            View all Blogs
                        </button>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-12 gap-6">

                            {/* Title */}
                            <div className="col-span-12">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Enter Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter blog title"
                                    className={`${formcontrol} rounded-xl`}
                                    disabled={loading}
                                />
                            </div>

                            {/* Category */}
                            <div className="col-span-12">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Select Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className={`${formcontrol} rounded-xl`}
                                    disabled={loading}
                                >
                                    <option value="">-- Select Category --</option>
                                    {categories.map((cat) => (
                                        <option key={cat?._id} value={cat?._id}>
                                            {cat?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Meta */}
                            <div className="col-span-12">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Meta Description
                                </label>
                                <textarea
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    placeholder="Write meta description (SEO)..."
                                    className={`${formcontrol} rounded-xl min-h-[90px]`}
                                    disabled={loading}
                                />
                            </div>

                            {/* Keywords */}
                            <div className="col-span-12">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Keywords (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    placeholder="eg: car wash, cleaning, interior wash"
                                    className={`${formcontrol} rounded-xl`}
                                    disabled={loading}
                                />
                            </div>

                            {/* Banner */}
                            <div className="col-span-12 md:col-span-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Banner Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setBanner(e.target.files?.[0] || null)}
                                    className={`${formcontrol} rounded-xl cursor-pointer`}
                                    disabled={loading}
                                />

                                {id && oldBanner && (
                                    <img
                                        src={`${oldBanner}`}
                                        alt="banner"
                                        className="mt-3 h-20 rounded-xl object-cover border"
                                    />
                                )}
                            </div>

                            {/* Thumbnail */}
                            <div className="col-span-12 md:col-span-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Thumbnail Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                                    className={`${formcontrol} rounded-xl cursor-pointer`}
                                    disabled={loading}
                                />

                                {id && oldThumbnail && (
                                    <img
                                        src={`${oldThumbnail}`}
                                        alt="thumbnail"
                                        className="mt-3 h-20 rounded-xl object-cover border"
                                    />
                                )}
                            </div>

                            {/* Editor */}
                            <div className="col-span-12">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Blog Content
                                </label>
                                <div className="rounded-2xl border border-gray-200 overflow-hidden">
                                    <TextEditor value={content} setValue={setContent} />
                                </div>
                            </div>

                            {/* Button */}
                            <div className="col-span-12 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                    h-11 px-6 rounded-xl font-semibold text-white
                    bg-gradient-to-r from-black to-gray-800
                    hover:from-gray-900 hover:to-black
                    shadow-lg shadow-black/20
                    transition-all duration-300
                    active:scale-[0.98]
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                                >
                                    {loading ? "Saving..." : "Save Blog"}
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
