import OpenAI from "openai";

export async function POST(request) {
    try {
        // Parse the request body
        const body = await request.json();
        const prompt = body.prompt;
        const type = body.type
        console.log(type)
        const prompt2 = `
        You are a skilled graphic designer tasked with creating a captivating design for the event:
        ---
        Type: ${type}
        Details: ${prompt}
        ---
        **Key Instructions:**
        1. **Date and Time:**
           - Highlight the **date** ("${body.startDate} - ${body.endDate}") and **time** ("${body.startTime} - ${body.endTime}") prominently.
           - Ensure readability with a font size larger than 12px and a subtle shadow for visibility.
           - Use a clean, stylish font that complements the theme.
        
        2. **Theme Consistency:**
           - If "מדבר" (desert) is mentioned, use warm, sandy tones (gold, beige, brown) and elements like dunes, clear skies, and natural textures.
           - For "מסיבת טבע" (nature party), use vibrant, magical colors (greens, blues, purples) with glowing plants, celestial skies, and ethereal lighting.
           - Adapt other themes to match their mood (sleek for corporate, bold for parties).
        
        3. **Typography:**
           - Ensure the date and time stand out and align with the design theme.
           - For text following "את הכיתוב הבא:" or "את הכיתוב":
             - Display exactly as written, without changes.
             - Use absolute positioning and a subtle shadow for emphasis.
        
        4. **Composition:**
           - Keep the design balanced and clean with depth and layers for a professional look.
        
        5. **Impact and Integration:**
           - Add textures (sand, glowing elements) for emotional resonance.
           - Ensure the date, time, and key text blend harmoniously with the design.
        
        **Final Goal:** Deliver an eye-catching, theme-aligned design that emphasizes the **date** and **time** clearly while adhering to the specific style requirements.
        `;
        
        const fullPrompt = prompt2;
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
