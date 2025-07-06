import { limiter } from "@/utils/limiter";
import { NextResponse } from "next/server";
import { post } from "../../../utils/api_calls/post.tsx";
import { Environment } from "../../../constants/keys.ts";

export async function POST(req: Request) {

    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (limiter(ip)) {
        return NextResponse.json({
            response: "Too many requests. Try again later.",
        }, { status: 429 });
    }

    const body = await req.json();

    if (typeof body.query !== "string" || body.query.length > 500) {
        return NextResponse.json(
            {
                response:
                    "Invalid request body. Please provide a valid 'query'.",
            },
            { status: 400 },
        );
    }

    const question = body.query?.trim().replace(/\s+/g, " ");

    if (!question) {
        return NextResponse.json(
            { response: "Please provide a valid question." },
            { status: 400 },
        );
    }

    try {
        const data = await post(question, Environment.SUPABASE_API_URL, Environment.SUPABASE_API_KEY);

        // const data = "hello i am kabayan ai!"

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
