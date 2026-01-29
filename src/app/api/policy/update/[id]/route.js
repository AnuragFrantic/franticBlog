import { NextResponse } from "next/server";
import { updatePolicy } from "@/controller/PolicyController";

/* =========================
   UPDATE POLICY (POST)
========================= */
export async function POST(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json();

        const policy = await updatePolicy(id, body);

        return NextResponse.json({
            success: true,
            policy,
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}
