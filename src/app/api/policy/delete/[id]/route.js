import { NextResponse } from "next/server";
import { deletePolicy } from "@/controller/PolicyController";

/* =========================
   DELETE POLICY (POST)
========================= */
export async function POST(req, { params }) {
    try {
        const { id } = await params;

        await deletePolicy(id);

        return NextResponse.json({
            success: true,
            message: "Policy deleted successfully",
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}
