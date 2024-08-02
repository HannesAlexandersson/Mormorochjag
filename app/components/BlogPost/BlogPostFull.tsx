import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { sanityFetch } from '@/sanity/client';
import { groq } from 'next-sanity';
import Typography from '../Typography/Typography';
import { cn } from '@/lib/utils';
import components from '../CustomPort/CustomPort';

interface BlogPostData {
    title: string;
    authorId: string;
    content: any;
    image: string;
    publishedAt: string;
    slug: string;
    author: string;
}

interface PostData {
    post: BlogPostData;
}

interface AuthorData {
    name: string;
    image: string;
}

const BlogPostFull: React.FC<PostData> = async ({ post }) => {

    const author = await sanityFetch<AuthorData>({
        query: groq`
        *[_type == "author" && _id == $id][0]{
            name,
            "image": image.asset->url,
    }`,
        params: { id: post.authorId }
    });
    
    return(
        
            <div className={cn('')}>
                <Typography variant="h2">{post.title}</Typography>
                <PortableText value={post.content} components={components} />

                <Image src={author.image} alt={post.author} width={50} height={50} />
                <Typography className='text-gray-500 mt-2' variant="p" size="sm">{new Date(post.publishedAt).toLocaleDateString()},  {post.author}</Typography>
            </div>
        
        
    );
}
export default BlogPostFull;

/*
<div>                
                <h2 className='text-4xl'>{post.title}</h2>
                <PortableText value={post.content} />
                
                <Image src={author.image} alt={post.author} width={50} height={50} />
                <p className="text-sm text-gray-500 mt-2">{new Date(post.publishedAt).toLocaleDateString()},  {post.author}</p>
            
            </div>
*/