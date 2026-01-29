
import { connectDB } from "@/lib/db";
import { getPosts, } from "@/controller/post.controller";
import { NextResponse } from "next/server";


/* ===========================
   GET POST BY ID
=========================== */
export async function GET(req, { params }) {
    try {
        await connectDB();

        const result = await getPosts({ id: params.id });

        if (!result.posts.length) {
            return NextResponse.json(
                { success: false, message: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: result.posts[0],
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}







