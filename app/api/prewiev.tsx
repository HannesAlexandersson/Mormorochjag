import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/sanity/sanity-utils';


export default async function preview(req: NextApiRequest, res: NextApiResponse) {
  // Check the secret and slug parameters
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  const slug = req.query.slug as string;

  res.writeHead(307, { Location: `/posts/${slug}` });
  res.end();
}