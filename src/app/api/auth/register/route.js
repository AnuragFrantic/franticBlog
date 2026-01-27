import { connectDB } from "@/lib/db";
import { registerAdmin } from "@/controllers/auth.controller";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();

        const result = await registerAdmin(body);

        return NextResponse.json({
            success: true,
            message: "Admin registered successfully",
            ...result,
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 400 }
        );
    }
}
