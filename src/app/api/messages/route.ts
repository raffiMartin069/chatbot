import { limiter } from "@/utils/limiter";

export async function POST(req: Request) {
    const URL = process.env.SUPABASE_API_URL;
    const API_KEY = process.env.SUPABASE_API_KEY;

    const ip = req.headers.get("x-forwarded-for") || "unknown";

    if (limiter(ip)) {
        return new Response("Too many requests. Try again later.", { status: 429 });
    }

    if (!URL || !API_KEY) {
        return new Response(
            "Unable to process request this time. Please comeback later.",
            { status: 500 },
        );
    }

    const body = await req.json();

    console.log("body", body.query.length);

    if (typeof body.query !== "string" || body.query.length > 500) {
        console.log("body did not pass");
        return new Response("Invalid query", { status: 400 });
    }

    const question = body.query?.trim().replace(/\s+/g, " ");

    if (!question) {
        return new Response("Missing 'query' in request body.", {
            status: 400,
        });
    }

    try {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                query: question,
            }),
        });

        let data = await res.json();

        if (!res.ok) {
            data =
                "Sorry, I am unable to answer that question at the moment. Please try again later.";
        }

        return new Response(JSON.stringify({ response: data }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(
            "Sorry, I am unable to answer that question at the moment. Please try again later.",
            { status: 500 },
        );
    }
}
