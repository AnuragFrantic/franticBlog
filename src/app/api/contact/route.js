import { NextResponse } from "next/server";
import {
    createContact,
    getAllContacts,
} from "@/controller/ContactController";

/* CREATE */
export async function POST(req) {
    try {
        const body = await req.json();
        const contact = await createContact(body);

        return NextResponse.json({ success: true, contact });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
}

/* GET ALL */
export async function GET() {
    try {
        const contacts = await getAllContacts();
        return NextResponse.json({ success: true, contacts });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
