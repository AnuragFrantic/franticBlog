import { NextResponse } from "next/server";
import {
    getContactById,

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


