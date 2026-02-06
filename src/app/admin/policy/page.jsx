"use client";

import { useEffect, useMemo, useState } from "react";
import { PolicyService } from "@/services/PolicyService";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("@/components/admin/TextEditor"), {
    ssr: false,
    loading: () => <div className="p-4 text-sm text-gray-500">Loading editor...</div>,
});

export default function AdminPolicyPage() {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);

    // search
    const [search, setSearch] = useState("");

    // form
    const [form, setForm] = useState({
        title: "",
        slug: "",
        metaDescription: "",
    });

    const [content, setContent] = useState("");

    // edit
    const [editId, setEditId] = useState(null);

    /* =========================
       FETCH
    ========================= */
    const fetchPolicies = async () => {
        try {
            setLoading(true);
            const data = await PolicyService.getAll();
            setPolicies(data?.policies || data?.data || data || []);
        } catch (err) {
            console.log("Fetch policy error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPolicies();
    }, []);

    /* =========================
       SLUG
    ========================= */
    const makeSlug = (text) =>
        text
            ?.toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "title") {
            setForm((prev) => ({
                ...prev,
                title: value,
                slug: makeSlug(value),
            }));
            return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setForm({
            title: "",
            slug: "",
            metaDescription: "",
        });
        setContent("");
        setEditId(null);
    };

    /* =========================
       SUBMIT
    ========================= */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...form,
                content,
            };

            if (editId) {
                await PolicyService.update(editId, payload);
            } else {
                await PolicyService.create(payload);
            }

            await fetchPolicies();
            resetForm();
        } catch (err) {
            console.log("Save policy error:", err);
            alert(err?.response?.data?.message || "Something went wrong");
        }
    };

    /* =========================
       EDIT
    ========================= */
    const handleEdit = (p) => {
        setEditId(p._id);
        setForm({
            title: p.title || "",
            slug: p.slug || "",
            metaDescription: p.metaDescription || "",
        });
        setContent(p.content || "");

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /* =========================
       DELETE
    ========================= */
    const handleDelete = async (id) => {
        if (!confirm("Delete this policy?")) return;

        try {
            await PolicyService.remove(id);
            await fetchPolicies();
        } catch (err) {
            alert(err?.response?.data?.message || "Delete failed");
        }
    };

    /* =========================
       FILTER
    ========================= */
    const filteredPolicies = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q) return policies;

        return policies.filter((p) => {
            return (
                p?.title?.toLowerCase().includes(q) ||
                p?.slug?.toLowerCase().includes(q) ||
                p?.metaDescription?.toLowerCase().includes(q)
            );
        });
    }, [policies, search]);

    return (
        <div className="max-w-5xl  mx-auto p-6 space-y-6">

            {/* ================= FORM ================= */}
            <Card className="rounded-2xl border overflow-hidden">
                <CardHeader className="py-5">
                    <div className="flex justify-between items-center flex-wrap gap-3">
                        <div>
                            <h1 className="text-xl font-black">
                                {editId ? "Update Policy" : "Create Policy"}
                            </h1>
                            <p className="text-sm text-gray-500">
                                Manage website policies (privacy, terms, etc.)
                            </p>
                        </div>

                        {editId ? (
                            <Badge className="bg-black text-white rounded-full">
                                Editing Mode
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="rounded-full">
                                New Policy
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <Separator />

                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* TITLE */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Title</label>
                            <Input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                placeholder="Privacy Policy"
                                className="rounded-xl"
                            />
                        </div>

                        {/* SLUG */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Slug</label>
                            <Input
                                name="slug"
                                value={form.slug}
                                onChange={handleChange}
                                required
                                placeholder="privacy-policy"
                                className="rounded-xl"
                            />
                        </div>

                        {/* META DESCRIPTION */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Meta Description</label>
                            <textarea
                                name="metaDescription"
                                value={form.metaDescription}
                                onChange={handleChange}
                                className="w-full min-h-[80px] rounded-xl border px-3 py-2 text-sm"
                                placeholder="SEO description"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Content</label>
                            <TextEditor value={content} setValue={setContent} />
                        </div>

                        {/* BUTTONS */}
                        <div className="flex justify-end gap-2">
                            {editId && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    className="rounded-xl"
                                >
                                    Cancel
                                </Button>
                            )}

                            <Button className="rounded-xl bg-black text-white">
                                {editId ? "Update Policy" : "Create Policy"}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>

            {/* ================= LIST ================= */}
            <Card className="rounded-2xl border overflow-hidden">
                <CardHeader className="py-5">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-black">Policies</h2>
                            <p className="text-sm text-gray-500">
                                Total: {loading ? "-" : filteredPolicies.length}
                            </p>
                        </div>

                        <Input
                            placeholder="Search policy..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-xl sm:max-w-sm"
                        />
                    </div>
                </CardHeader>

                <Separator />

                <CardContent className="p-0">

                    {loading ? (
                        <div className="p-6 space-y-4">
                            {[1, 2, 3].map(i => (
                                <Skeleton key={i} className="h-14 rounded-xl" />
                            ))}
                        </div>
                    ) : filteredPolicies.length === 0 ? (
                        <div className="p-10 text-center">
                            No policies found
                        </div>
                    ) : (
                        <div className="divide-y">
                            {filteredPolicies.map((p) => (
                                <div
                                    key={p._id}
                                    className="p-5 flex justify-between gap-4 hover:bg-gray-50"
                                >
                                    <div>
                                        <p className="font-semibold">{p.title}</p>
                                        <p className="text-sm text-gray-500">/{p.slug}</p>
                                        {p.metaDescription && (
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                {p.metaDescription}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="rounded-xl"
                                            onClick={() => handleEdit(p)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className="rounded-xl bg-red-600 text-white"
                                            onClick={() => handleDelete(p._id)}
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
