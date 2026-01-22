"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import { setToken } from "@/services/auth";


export default function LoginPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            const res = await AuthService.login(form);

            if (!res?.success) {
                setError(res?.message || "Login failed");
                return;
            }

            // ✅ Save JWT token
            setToken(res.token);

            // ✅ Redirect to admin dashboard
            router.push("/admin");
        } catch (err) {
            setError(err?.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white border rounded-xl p-6 shadow-sm"
            >
                <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
                <p className="text-sm text-gray-600 mb-6">
                    Login to access Admin Panel
                </p>

                {error ? (
                    <div className="mb-4 text-sm bg-red-50 text-red-700 border border-red-200 px-3 py-2 rounded-lg">
                        {error}
                    </div>
                ) : null}

                <label className="text-sm font-medium">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="admin@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <label className="text-sm font-medium">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1 mb-5 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white rounded-lg py-2 font-medium hover:opacity-90 disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
