import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { deletePost } from "@/controller/post.controller";
import { NextResponse } from "next/server";

/* ===========================
   DELETE POST (POST)
=========================== */
export async function POST(req, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid post id" },
                { status: 400 }
            );
        }

        const deleted = await deletePost(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Post deleted successfully",
        });

    } catch (err) {
        console.error("DELETE ERROR:", err);
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 400 }
        );
    }
}
