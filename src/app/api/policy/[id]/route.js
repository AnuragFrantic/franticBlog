import { NextResponse } from "next/server";
import {
    getPolicyById,
    updatePolicy,
    deletePolicy,
} from "@/controller/PolicyController";

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

/* =========================
   UPDATE
========================= */
export async function PUT(req, { params }) {
    try {
        const { id } = await params;

        const body = await req.json();
        const policy = await updatePolicy(id, body);

        return NextResponse.json({ success: true, policy });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}

/* =========================
   DELETE
========================= */
export async function DELETE(req, { params }) {
    try {
        const { id } = await params;

        await deletePolicy(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}
