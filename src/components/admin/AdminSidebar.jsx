"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

    const linkClass = (href) =>
        `block px-4 py-2 rounded-lg text-sm font-medium transition ${isActive(href)
            ? "bg-black text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`;

    return (
        <aside className="w-full md:w-[260px] border-r bg-white">
            <div className="p-5 border-b">
                <h2 className="text-lg font-bold">Admin Panel</h2>
                <p className="text-xs text-gray-500 mt-1">Manage your blog content</p>
            </div>

            <nav className="p-4 space-y-2">
                <Link href="/admin" className={linkClass("/admin")}>
                    Dashboard
                </Link>

                <Link href="/admin/posts" className={linkClass("/admin/posts")}>
                    Posts
                </Link>

                <Link href="/admin/categories" className={linkClass("/admin/categories")}>
                    Categories
                </Link>

                {/* <Link href="/admin/tags" className={linkClass("/admin/tags")}>
                    Tags
                </Link> */}

                <div className="pt-3 border-t">
                    <Link href="/blogs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                        View Website
                    </Link>
                </div>
            </nav>
        </aside>
    );
}
