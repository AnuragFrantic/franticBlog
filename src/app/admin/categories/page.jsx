"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryService } from "@/services/category.service";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Search
    const [search, setSearch] = useState("");

    // form
    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        icon: null,
    });

    // edit mode
    const [editId, setEditId] = useState(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await CategoryService.getAll();
            setCategories(data?.data || data || []);
        } catch (error) {
            console.log("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // auto slug from name
    const makeSlug = (text) => {
        return text
            ?.toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "icon") {
            setForm((prev) => ({ ...prev, icon: files?.[0] || null }));
            return;
        }

        if (name === "name") {
            setForm((prev) => ({
                ...prev,
                name: value,
                slug: makeSlug(value),
            }));
            return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setForm({ name: "", slug: "", description: "", icon: null });
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const fd = new FormData();
            fd.append("name", form.name);
            fd.append("slug", form.slug);
            fd.append("description", form.description);

            if (form.icon) fd.append("icon", form.icon);

            if (editId) {
                await CategoryService.update(editId, fd);
            } else {
                await CategoryService.create(fd);
            }

            await fetchCategories();
            resetForm();
        } catch (error) {
            console.log("Save category error:", error);
            alert(error?.response?.data?.message || "Something went wrong");
        }
    };

    const handleEdit = (cat) => {
        setEditId(cat._id);
        setForm({
            name: cat.name || "",
            slug: cat.slug || "",
            description: cat.description || "",
            icon: null,
        });

        // ✅ scroll to top so form is visible
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        const ok = confirm("Are you sure you want to delete this category?");
        if (!ok) return;

        try {
            await CategoryService.remove(id);
            await fetchCategories();
        } catch (error) {
            console.log("Delete category error:", error);
            alert(error?.response?.data?.message || "Delete failed");
        }
    };

    const filteredCategories = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return categories;

        return categories.filter((c) => {
            const name = (c?.name || "").toLowerCase();
            const slug = (c?.slug || "").toLowerCase();
            const desc = (c?.description || "").toLowerCase();
            return name.includes(q) || slug.includes(q) || desc.includes(q);
        });
    }, [categories, search]);

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            {/* ✅ FORM CARD */}
            <Card className="rounded-2xl border overflow-hidden">
                <CardHeader className="py-5">
                    <div className="flex items-start justify-between gap-4 flex-col sm:flex-row sm:items-center">
                        <div>
                            <h1 className="text-xl font-black tracking-tight">
                                {editId ? "Update Category" : "Create Category"}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Add categories for blog filtering.
                            </p>
                        </div>

                        {editId ? (
                            <Badge className="rounded-full bg-black text-white">
                                Editing Mode
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="rounded-full">
                                New Category
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <Separator />

                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">
                                Category Name
                            </label>
                            <Input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g. Technology"
                                className="rounded-xl"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Slug</label>
                            <Input
                                name="slug"
                                value={form.slug}
                                onChange={handleChange}
                                placeholder="e.g. technology"
                                className="rounded-xl"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full min-h-[90px] rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                                placeholder="Short description"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">
                                Icon (optional)
                            </label>
                            <Input
                                type="file"
                                name="icon"
                                accept="image/*"
                                onChange={handleChange}
                                className="rounded-xl cursor-pointer"
                            />
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                            {editId ? (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="rounded-xl"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </Button>
                            ) : null}

                            <Button
                                type="submit"
                                className="rounded-xl bg-black text-white hover:bg-gray-900"
                            >
                                {editId ? "Update Category" : "Create Category"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* ✅ LIST CARD */}
            <Card className="rounded-2xl border overflow-hidden">
                <CardHeader className="py-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-black tracking-tight">Categories</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Total: {loading ? "-" : filteredCategories.length}
                            </p>
                        </div>

                        <div className="w-full sm:max-w-sm">
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search category..."
                                className="rounded-xl"
                            />
                        </div>
                    </div>
                </CardHeader>

                <Separator />

                <CardContent className="p-0">
                    {/* Loading skeleton */}
                    {loading ? (
                        <div className="p-6 space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-4 w-1/3" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Skeleton className="h-9 w-20 rounded-xl" />
                                        <Skeleton className="h-9 w-20 rounded-xl" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredCategories.length === 0 ? (
                        <div className="p-10 text-center">
                            <p className="text-lg font-bold text-black">No categories found</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Try changing search keyword.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-4 rounded-xl"
                                onClick={() => setSearch("")}
                            >
                                Clear Search
                            </Button>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {filteredCategories.map((cat) => (
                                <div
                                    key={cat._id}
                                    className="p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 hover:bg-gray-50 transition"
                                >
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="font-semibold text-black">{cat?.name}</p>
                                            <Badge variant="outline" className="rounded-full text-[11px]">
                                                /{cat?.slug}
                                            </Badge>
                                        </div>

                                        {cat?.description ? (
                                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                                {cat.description}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-400 mt-2 italic">
                                                No description
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-2 sm:justify-end">
                                        <Button
                                            variant="outline"
                                            className="rounded-xl"
                                            onClick={() => handleEdit(cat)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            className="rounded-xl bg-red-600 text-white hover:bg-red-700"
                                            onClick={() => handleDelete(cat._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
