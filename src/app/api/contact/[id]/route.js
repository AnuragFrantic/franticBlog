import { NextResponse } from "next/server";
import {
    getContactById,
    deleteContact,
} from "@/controller/ContactController";

/* GET SINGLE */
export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const contact = await getContactById(id);

        return NextResponse.json({ success: true, contact });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 404 }
        );
    }
}

/* DELETE */
export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        await deleteContact(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}
