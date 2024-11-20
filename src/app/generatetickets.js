import OpenAI from "openai";

export async function POST(request) {
    try {
        const body = await request.json();
        console.log("Request Body:", body.aiDoc);

        const prompt = `
        You are a ticket seller. Generate ${parseInt(body.aiDoc.amount)} unique JSON objects representing different ticket rounds for the event named "${body.aiDoc.name}". Each ticket should be logically consistent and distinct, with the following rules:

        1. The "name" field should be based on the input event name "${body.aiDoc.name}" and include a unique ticket type (e.g., "${body.aiDoc.name} Standard", "${body.aiDoc.name} VIP", "${body.aiDoc.name} Gold").
        2. Each ticket must have non-colliding date ranges. Ensure "startDate" and "endDate" for each ticket are sequential and do not overlap.
        3. Times ("startTime" and "endTime") should be logical for ticket sales and should not include the time zone abbreviation (e.g., "09:00" instead of "09:00 IST").
        4. Prices must vary for each round and increase logically, starting from the cheapest ("Standard") to the most expensive ("VIP" or "Gold").
        5. Use the provided date range (${body.aiDoc.startDate} to ${body.aiDoc.endDateForAi}) to construct valid dates for all rounds.

        Ensure the output is a **valid JSON array** of objects. Do not include any explanations or additional text; only return the JSON array.
        `;

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a ticket seller." },
                { role: "user", content: prompt },
            ],
            model: "gpt-4",
        });

        const rawResponse = completion.choices[0].message.content;
        console.log("Raw OpenAI Response:", rawResponse);

        // Validate and parse the response
        let responseContent;
        try {
            responseContent = JSON.parse(rawResponse); // Attempt to parse the response
            if (!Array.isArray(responseContent)) {
                throw new Error("Response is not a valid JSON array.");
            }
        } catch (error) {
            console.error("Error parsing OpenAI response:", error);
            throw new Error("Invalid JSON response from OpenAI");
        }

        return new Response(
            JSON.stringify(responseContent),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error:", error); // Log the error
        return new Response(
            JSON.stringify({ error: "Failed to generate tickets", details: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
