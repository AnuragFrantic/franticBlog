import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { updatePost } from "@/controller/post.controller";
import { NextResponse } from "next/server";
import { saveFile } from "@/lib/upload";

/* ===========================
   UPDATE POST (POST)
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

        const formData = await req.formData();

        const title = formData.get("title");
        const category = formData.get("category");
        const content = formData.get("content");
        const metaDescription = formData.get("metaDescription");

        let keywords = [];
        try {
            keywords = JSON.parse(formData.get("keywords") || "[]");
        } catch {
            keywords = [];
        }

        const bannerFile = formData.get("banner");
        const thumbFile = formData.get("thumbnail");

        let banner = "";
        let thumbnail = "";

        if (bannerFile && typeof bannerFile !== "string") {
            banner = await saveFile(bannerFile);
        }

        if (thumbFile && typeof thumbFile !== "string") {
            thumbnail = await saveFile(thumbFile);
        }

        const data = {
            title,
            category,
            content,
            metaDescription,
            keywords,
        };

        if (banner) data.banner = banner;
        if (thumbnail) data.thumbnail = thumbnail;

        const post = await updatePost(id, data);

        if (!post) {
            return NextResponse.json(
                { success: false, message: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: post,
        });

    } catch (err) {
        console.error("UPDATE ERROR:", err);
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 400 }
        );
    }
}
