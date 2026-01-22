"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryService } from "@/services/category.service";
import logo from "@/app/assets/logo.svg";

export default function Navbar() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await CategoryService.getAll();

                // handle both API formats
                if (data?.data) setCategories(data.data);
                else setCategories(data);
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (e) => {
        const slug = e.target.value;
        if (!slug) return;

        router.push(`/blogs?category=${slug}`);
    };

    return (
        <header className="w-full border-b bg-white sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center">
                {/* ✅ Logo */}
                <Link href="/" className="flex items-center justify-center gap-2">
                    <Image src={logo} alt="Logo" width={140} height={40} priority />
                </Link>

                {/* ✅ Right Nav */}
                {/* <div className="flex items-center gap-4">
                    <Link href="/blogs" className="text-sm font-medium hover:text-blue-600">
                        Blogs
                    </Link>

        
                    <select
                        onChange={handleCategoryChange}
                        className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue=""
                    >
                        <option value="">Select Category</option>

                        {categories?.map((cat) => (
                            <option key={cat._id} value={cat.slug}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div> */}
            </div>
        </header>
    );
}
