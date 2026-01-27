import { connectDB } from "@/lib/db";
import { loginAdmin } from "@/controller/auth.controller";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        const result = await loginAdmin(body);

        return NextResponse.json(
            {
                success: true,
                message: "Login successful",
                ...result,
            },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 401 }
        );
    }
}
