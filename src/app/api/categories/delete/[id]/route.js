import { connectDB } from "@/lib/db";
import { deleteCategory } from "@/controller/CategoryController";
import { NextResponse } from "next/server";

/* =========================
   DELETE CATEGORY (POST)
========================= */
export async function POST(req, { params }) {
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
