import OpenAI from "openai";

export async function POST(request) {
    try {
        // Parse the request body
        const body = await request.json();
        const prompt = body.prompt;
        const type = body.type

        const goalContext = `
        :אתה מעצב גרפי המתמחה ביצירת עיצובים עבור 
        ---
        ${type}
        ---
        . צור גרפיקה בהתאם לפרטים הבאים:
        ---
        ${prompt}
        ---
        `;
        const fullPrompt = goalContext;
        // Initialize OpenAI client
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, // Replace with your OpenAI API key
        });

        // Generate images
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: fullPrompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json',
        });

        // Format the images as Base64
        const images = response.data.map((img) => `data:image/png;base64,${img.b64_json}`);

        // Return the images in the response
        return new Response(JSON.stringify({ images }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error generating images:", error);
        return new Response(
            JSON.stringify({ error: "Failed to generate images" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
