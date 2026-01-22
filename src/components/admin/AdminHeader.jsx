"use client";

import { useRouter } from "next/navigation";

export default function AdminHeader() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token"); // ✅ JWT token
        router.push("/login");
    };

    return (
        <header className="w-full border-b bg-white">
            <div className="px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                    <p className="text-xs text-gray-500">Manage posts, categories & tags</p>
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
