import { NextResponse } from "next/server";
import {
    createPolicy,
    getAllPolicies,
} from "@/controller/PolicyController";

/* =========================
   CREATE POLICY
========================= */
export async function POST(req) {
    try {
        const body = await req.json();

        const policy = await createPolicy(body);
        console.log("policy:", policy);

        return NextResponse.json({
            success: true,
            policy,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 400 }
        );
    }
}

/* =========================
   GET ALL POLICIES
========================= */
export async function GET() {
    try {
        const policies = await getAllPolicies();

        return NextResponse.json({
            success: true,
            policies,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}
