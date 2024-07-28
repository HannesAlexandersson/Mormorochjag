import Link from 'next/link';
import Image from 'next/image';
import { randomBgColor } from '@/lib/utils';

interface BlogPostExpData {
    title: string;
    slug: string;
    authorId: string;
    image: string;
    publishedAt: string;
    excerpt: string;
    author: string;    
}
interface BlogPostExpDataProps {
    post: BlogPostExpData;
}

const BlogPostExp: React.FC<BlogPostExpDataProps> = ({ post }) => {
    const bgColor = randomBgColor();
    console.log(`Background color applied: ${bgColor}`);
    return(
       
            
                <div                 
                className={`flex flex-col border-2 ${bgColor} border-l-violet-50 shadow-md w-full md:w-64 h-96 p-2 m-2`}
                >                   
                    <div className="flex-shrink-0 h-2/6 relative">
                        <Image 
                        src={post.image} 
                        alt={post.title} 
                        layout="fill" 
                        objectFit="cover" 
                        className="rounded-t-md"
                        />
                    </div>
                    <div className="flex flex-col flex-grow p-2">
                        <h2 className="text-2xl font-bold mb-1">{post.title}</h2>
                        <p className="text-base flex-grow">{post.excerpt}</p>
                        <p className="text-sm text-gray-500 mt-2">{new Date(post.publishedAt).toLocaleDateString()}</p>
                    </div>
                </div>
           
        
       
        
    );
}
export default BlogPostExp;