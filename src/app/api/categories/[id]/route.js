import { connectDB } from "@/lib/db";
import { updateCategory, deleteCategory } from "@/controller/CategoryController";
import { NextResponse } from "next/server";
import { saveFile } from "@/lib/upload";

/* =========================
   UPDATE CATEGORY
========================= */
export async function PUT(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        const formData = await req.formData();

        const name = formData.get("name");
        const slug = formData.get("slug");
        const description = formData.get("description") || "";
        const isActive = formData.get("isActive") === "true";

        const iconFile = formData.get("icon");

        let icon = "";

        if (iconFile && typeof iconFile !== "string") {
            icon = await saveFile(iconFile);
        }

        const data = {
            name,
            slug,
            description,
            isActive,
        };

        if (icon) data.icon = icon;

        const category = await updateCategory(id, data);

        if (!category) {
            return NextResponse.json(
                { success: false, message: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: category });

    } catch (error) {
        console.error("CATEGORY UPDATE ERROR:", error);

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}

/* =========================
   DELETE CATEGORY
========================= */
export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        await deleteCategory(id);

        return NextResponse.json({
            success: true,
            message: "Category deleted successfully",
        });

    } catch (error) {
        console.error("CATEGORY DELETE ERROR:", error);

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}
