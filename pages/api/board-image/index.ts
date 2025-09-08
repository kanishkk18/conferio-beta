import type { NextApiRequest, NextApiResponse } from 'next';

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseQuery = req.query.q as string;

  if (!baseQuery) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  const tags = ['nature', 'galaxy', 'world', 'professional', 'work'];
  const query = `${baseQuery} ${tags.join(' ')}`;

  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      const randomImage = data.hits[Math.floor(Math.random() * data.hits.length)];
      return res.status(200).json({ imageUrl: randomImage.webformatURL });
    } else {
      return res.status(404).json({ error: 'No image found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch image' });
  }
}
