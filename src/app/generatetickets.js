import OpenAI from "openai";

export async function POST(request) {
    try {
        const body1 = await request.json();
        const body = body1.aiDoc

        const prompt = `
        You are a ticket seller. Generate ${parseInt(body.amount)} unique JSON objects representing different ticket rounds for the event named "${body.name}". Each ticket should be logically consistent and distinct, with the following rules:
        
        1. The "name" field should be based on the input event name "${body.name}" and include a unique ticket type (e.g., "${body.name} Standard", "${body.name} VIP", "${body.name} Gold").
        2. Each ticket must have non-colliding date ranges. Ensure "startDate" and "endDate" for each ticket are sequential and do not overlap.
        3. Times ("startTime" and "endTime") should be logical for ticket sales and should not include the time zone abbreviation (e.g., "09:00" instead of "09:00 IST").
        4. Prices for each ticket type must:
           - Start at the provided minimum price (${body.prices[0]}) and increment logically across ticket rounds, reaching or approaching the maximum price (${body.prices[1]}) for the most expensive ticket.
           - Be distributed proportionally, ensuring a steady price progression from the cheapest to the most expensive ticket type.
        5. Use the provided date range (${body.startDate} to ${body.endDateForAi}) to construct valid dates for all rounds.
        6. Distribute the total ticket quantity (${body.ticketsAmount}) proportionally across all ticket types under the "amount" key. Ensure:
           - The sum of all "amount" values equals ${body.ticketsAmount}.
           - Distribute amounts logically based on the ticket type, starting with higher quantities for less expensive tickets and reducing quantities for more premium tickets.
        
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
