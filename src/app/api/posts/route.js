import { connectDB } from "@/lib/db";
import { createPost, getPosts } from "@/controller/post.controller";
import { NextResponse } from "next/server";
import { saveFile } from "@/lib/upload";

export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);

        const result = await getPosts({
            keyword: searchParams.get("keyword"),
            page: Number(searchParams.get("page")),
            perPage: Number(searchParams.get("perPage")),
        });

        return NextResponse.json({ success: true, ...result });
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}

/* ================================
   CREATE POST (APP ROUTER WAY)
================================ */
export async function POST(req) {
    try {
        await connectDB();

        const formData = await req.formData();

        const title = formData.get("title");
        const category = formData.get("category");
        const content = formData.get("content");
        const metaDescription = formData.get("metaDescription");
        const keywords = JSON.parse(formData.get("keywords") || "[]");

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

        const post = await createPost({
            title,
            category,
            content,
            metaDescription,
            keywords,
            banner,
            thumbnail,
        });

        return NextResponse.json({
            success: true,
            data: post,
        });

    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { success: false, message: err.message },
            { status: 400 }
        );
    }
}
