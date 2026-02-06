
import { connectDB } from "@/lib/db";
import { getPosts, } from "@/controller/post.controller";
import { NextResponse } from "next/server";


/* ===========================
   GET POST BY ID
=========================== */
export async function GET(req, { params }) {
    const { id } = await params;

    await connectDB();

    const result = await getPosts({ id });

    if (!result.posts.length) {
        return NextResponse.json(
            { success: 0, message: "Post not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(result);
}








