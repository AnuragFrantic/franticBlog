"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/services/auth"; // ✅ adjust path

export default function AdminAuthGuard({ children }) {
    const router = useRouter();

    useEffect(() => {
        const token = getToken();

        // ✅ No token => redirect
        if (!token) {
            router.replace("/");
        }
    }, [router]);

    return <>{children}</>;
}
