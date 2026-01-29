import { NextResponse } from "next/server";
import { deleteContact } from "@/controller/ContactController";

/* =========================
   DELETE CONTACT (POST)
========================= */
export async function POST(req, { params }) {
    try {
        const { id } = await params;

        await deleteContact(id);

        return NextResponse.json({
            success: true,
            message: "Contact deleted successfully",
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}
