import { NextResponse } from "next/server";
import { getPolicyById } from "@/controller/PolicyController";

/* =========================
   GET SINGLE
========================= */
export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const policy = await getPolicyById(id);

        return NextResponse.json({ success: true, policy });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 404 }
        );
    }
}
