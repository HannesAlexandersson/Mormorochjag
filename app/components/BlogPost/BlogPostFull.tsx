import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { sanityFetch } from '@/sanity/client';
import { groq } from 'next-sanity';

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
        <>
            
            <div>                
                <h2 className='text-4xl'>{post.title}</h2>
                <PortableText value={post.content} />
                
                <Image src={author.image} alt={post.author} width={50} height={50} />
                <p className="text-sm text-gray-500 mt-2">{new Date(post.publishedAt).toLocaleDateString()},  {post.author}</p>
            
            </div>
            
        
        </>
        
    );
}
export default BlogPostFull;