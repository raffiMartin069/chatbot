import { limiter } from "@/utils/limiter";
import { NextResponse } from "next/server";
import { post } from "@/utils/api_calls/post";
import { Environment } from "@/constants/keys";
import { sanitizeInput } from "@/utils/sanitizeInput";
import { validateRequestBody } from "@/utils/validateRequestBody";

export async function POST(req: Request) {

    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (limiter(ip)) {
        return NextResponse.json({
            response: "Too many requests. Try again later.",
        }, { status: 429 });
    }

    const body = await req.json();

    try {
        validateRequestBody(body.data);
    } catch (error: any | unknown) {
        return NextResponse.json(
            { response: error.message },
            { status: 400 },
        );
    }

    const question = body.data?.trim();

    const sanitizedData = sanitizeInput(question);

    try {
        const data = await post(sanitizedData, Environment.SUPABASE_API_URL, Environment.SUPABASE_API_KEY);

        // const data = "Hello! Kamusta ka Kabayan. Ako si Kabayan AI, ang iyong virtual na katulong. Paano kita matutulungan ngayon?";

        console.log("Response from AI:", data);

        return NextResponse.json(
            {
                response: data,
            },
            { status: 200 },
        );
    } catch (error) {
        return new Response(
            "Sorry, I am unable to answer that question at the moment. Please try again later: " + error,
            { status: 500 },
        );
    }
}
