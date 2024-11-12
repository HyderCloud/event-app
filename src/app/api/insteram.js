// pages/api/instagram.js
import axios from 'axios';

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const PAGE_ID = process.env.INSTAGRAM_PAGE_ID;

export default async function handler(req, res) {
  const { type } = req.query;

  try {
    if (type === 'pageInfo') {
      // Fetch Instagram Page Info
      const response = await axios.get(
        `https://graph.facebook.com/v14.0/${PAGE_ID}?fields=name,username&access_token=${ACCESS_TOKEN}`
      );
      return res.status(200).json(response.data);
    } else if (type === 'pageMedia') {
      // Fetch Instagram Page Media
      const response = await axios.get(
        `https://graph.facebook.com/v14.0/${PAGE_ID}/media?fields=id,caption,media_type,media_url,timestamp&access_token=${ACCESS_TOKEN}`
      );
      return res.status(200).json(response.data);
    } else {
      return res.status(400).json({ error: 'Invalid request type' });
    }
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
