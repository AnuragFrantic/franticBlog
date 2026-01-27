"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        posts: 0,
        categories: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [postsRes, catRes] = await Promise.all([
                    api.get("/api/posts"),
                    api.get("/api/categories"),
                ]);

                const posts =
                    postsRes?.data?.data ||
                    postsRes?.data?.posts ||
                    postsRes?.data ||
                    [];

                const categories =
                    catRes?.data?.data ||
                    catRes?.data?.categories ||
                    catRes?.data ||
                    [];

                setStats({
                    posts: posts.length,
                    categories: categories.length,
                });
            } catch (error) {
                console.log("Stats error:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white border rounded-xl p-5">
                    <h3 className="text-sm text-gray-600">Total Posts</h3>
                    <p className="text-3xl font-bold mt-2">{stats.posts}</p>
                </div>

                <div className="bg-white border rounded-xl p-5">
                    <h3 className="text-sm text-gray-600">Total Categories</h3>
                    <p className="text-3xl font-bold mt-2">{stats.categories}</p>
                </div>
            </div>

            <div className="mt-8 bg-white border rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-1">Quick Tips</h3>
                <p className="text-sm text-gray-600">
                    • Add categories first, then create your posts.
                    <br />
                    • Use SEO meta title + meta description for better Google ranking.
                </p>
            </div>
        </div>
    );
}
