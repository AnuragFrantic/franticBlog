"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PostService } from "@/services/post.service";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function AdminPostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ UI state
    const [search, setSearch] = useState("");

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await PostService.getAll();
            setPosts(res?.posts || res || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        const ok = confirm("Delete this post?");
        if (!ok) return;

        try {
            await PostService.remove(id);
            fetchPosts();
        } catch (err) {
            alert(err?.response?.data?.message || "Delete failed");
        }
    };

    const filteredPosts = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return posts;

        return posts.filter((p) => {
            const title = (p?.title || "").toLowerCase();
            const slug = (p?.slug || "").toLowerCase();
            return title.includes(q) || slug.includes(q);
        });
    }, [posts, search]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black tracking-tight">Posts</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your blogs, edit and delete posts.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="rounded-xl"
                        onClick={fetchPosts}
                        disabled={loading}
                    >
                        Refresh
                    </Button>

                    <Button asChild className="rounded-xl bg-black text-white hover:bg-gray-900">
                        <Link href="/admin/posts/create">+ Create Post</Link>
                    </Button>
                </div>
            </div>

            {/* Top tools */}
            <Card className="rounded-2xl border overflow-hidden">
                <CardHeader className="py-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <Badge className="rounded-full bg-black text-white">
                                Total: {loading ? "-" : filteredPosts.length}
                            </Badge>
                            <span className="text-sm text-gray-500">
                                {loading ? "Loading..." : "Showing results"}
                            </span>
                        </div>

                        <div className="w-full sm:max-w-sm">
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title or slug..."
                                className="rounded-xl"
                            />
                        </div>
                    </div>
                </CardHeader>

                <Separator />

                <CardContent className="p-0">
                    {/* Loading */}
                    {loading && (
                        <div className="p-4">
                            <div className="hidden sm:grid grid-cols-12 gap-4 px-3 py-2">
                                <Skeleton className="h-4 col-span-5" />
                                <Skeleton className="h-4 col-span-3" />
                                <Skeleton className="h-4 col-span-2" />
                                <Skeleton className="h-4 col-span-2" />
                            </div>

                            <div className="divide-y">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="p-4">
                                        <div className="grid grid-cols-12 gap-4 items-center">
                                            <div className="col-span-12 sm:col-span-5 space-y-2">
                                                <Skeleton className="h-5 w-3/4" />
                                                <Skeleton className="h-4 w-1/2" />
                                            </div>

                                            <div className="hidden sm:block sm:col-span-3">
                                                <Skeleton className="h-4 w-4/5" />
                                            </div>

                                            <div className="hidden sm:block sm:col-span-2">
                                                <Skeleton className="h-4 w-4/5" />
                                            </div>

                                            <div className="col-span-12 sm:col-span-2 flex gap-2 sm:justify-end">
                                                <Skeleton className="h-9 w-20 rounded-xl" />
                                                <Skeleton className="h-9 w-20 rounded-xl" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && filteredPosts.length === 0 && (
                        <div className="p-10 text-center">
                            <p className="text-lg font-bold text-black">No posts found</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Try changing keyword or create a new post.
                            </p>

                            <div className="mt-5 flex justify-center gap-2">
                                <Button
                                    variant="outline"
                                    className="rounded-xl"
                                    onClick={() => setSearch("")}
                                >
                                    Clear Search
                                </Button>

                                <Button asChild className="rounded-xl bg-black text-white hover:bg-gray-900">
                                    <Link href="/admin/posts/create">Create Post</Link>
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Table */}
                    {!loading && filteredPosts.length > 0 && (
                        <div className="w-full overflow-x-auto">
                            {/* Header row */}
                            <div className="min-w-[900px] hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 text-xs font-bold text-gray-600">
                                <div className="col-span-5">POST</div>
                                <div className="col-span-3">SLUG</div>
                                <div className="col-span-2">CREATED</div>
                                <div className="col-span-2 text-right">ACTIONS</div>
                            </div>

                            <Separator />

                            {/* Rows */}
                            <div className="min-w-[900px] divide-y">
                                {filteredPosts.map((p) => (
                                    <div
                                        key={p._id}
                                        className="grid grid-cols-12 gap-4 px-5 py-4 hover:bg-gray-50 transition"
                                    >
                                        {/* Post */}
                                        <div className="col-span-12 sm:col-span-5">
                                            <div className="flex items-start gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center font-black">
                                                    {p?.title?.[0]?.toUpperCase() || "P"}
                                                </div>

                                                <div className="flex-1">
                                                    <p className="font-semibold text-black line-clamp-1">
                                                        {p?.title}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline" className="rounded-full text-[11px]">
                                                            Blog
                                                        </Badge>
                                                        <span className="text-xs text-gray-500">
                                                            ID: {p?._id?.slice(-6)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Slug */}
                                        <div className="col-span-12 sm:col-span-3">
                                            <p className="text-sm text-gray-600 break-all">/{p?.slug}</p>
                                        </div>

                                        {/* Created */}
                                        <div className="col-span-12 sm:col-span-2">
                                            <p className="text-sm text-gray-600">
                                                {p?.createdAt ? new Date(p.createdAt).toDateString() : "-"}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-12 sm:col-span-2 flex flex-wrap sm:justify-end gap-2">
                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                                className="rounded-xl"
                                            >
                                                <Link href={`/blogs/${p.slug}`} target="_blank">
                                                    View
                                                </Link>
                                            </Button>

                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                                className="rounded-xl"
                                            >
                                                <Link href={`/admin/posts/edit/${p._id}`}>Edit</Link>
                                            </Button>

                                            <Button
                                                size="sm"
                                                className="rounded-xl bg-red-600 text-white hover:bg-red-700"
                                                onClick={() => handleDelete(p._id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
