import OpenAI from "openai"

export default async function handler(req, res) {  
    try {
        
        const config = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        })
        const openai = new OpenAI(config)
        const {topic, keywords, data} = req.body
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: "a white siamese cat",
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json'
        })
        const postContent = response.data.choices[0]?.message?.content
        console.log(postContent)

    
        res.status(200).json({ post: {
        postContent,
    }})
    } catch (error) {
        
    }      
  }
