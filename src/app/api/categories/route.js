import { connectDB } from "@/lib/db";
import { createCategory, getCategories } from "@/controller/CategoryController";
import { NextResponse } from "next/server";
import { saveFile } from "@/lib/upload";

/* =========================
   GET ALL CATEGORIES
========================= */
export async function GET() {
    try {
        await connectDB();

        const data = await getCategories();

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error("CATEGORY GET ERROR:", error);

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

/* =========================
   CREATE CATEGORY
========================= */
export async function POST(req) {
    try {
        await connectDB();

        const formData = await req.formData();

        const name = formData.get("name");
        const slug = formData.get("slug");
        const description = formData.get("description") || "";
        const isActive = formData.get("isActive") === "true";

        const iconFile = formData.get("icon");

        let icon = "";

        // ✅ Save icon if uploaded
        if (iconFile && typeof iconFile !== "string") {
            icon = await saveFile(iconFile);
        }

        if (!name || !slug) {
            return NextResponse.json(
                { success: false, message: "Name and slug are required" },
                { status: 400 }
            );
        }

        const category = await createCategory({
            name,
            slug,
            description,
            isActive,
            icon,
        });

        return NextResponse.json({
            success: true,
            data: category,
        });
    } catch (error) {
        console.error("CATEGORY CREATE ERROR:", error);

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}
