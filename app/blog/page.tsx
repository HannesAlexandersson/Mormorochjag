import { groq } from 'next-sanity';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/client';
import Hero, { HeroData } from "@/app/components/Hero/Hero";
import BlogPostExp from '../components/BlogPost/BlogPostExp';
import { getBlogPageTextSections, getBlogPosts } from '@/sanity/querys';
import { randomBgColor } from '@/lib/utils';


interface BlogPagetextData {
    title: string;
    text: string;
    position: number;
    }[];

interface BlogPostExpData {
    title: string;
    slug: string;
    authorId: string;
    image: string;
    publishedAt: string;
    excerpt: string;
    author: string;
    
}

const BlogPage = async () => {
    //b02bdffd-84b9-4126-9068-2cbc14fec2eb
    const heroData = await sanityFetch<HeroData[]>({ 
        query: groq`*[_type == "heroSection" && _id == "b02bdffd-84b9-4126-9068-2cbc14fec2eb"]{             
            title,
            "DesktopImg": backgroundImage.asset->url,
              "alt": backgroundImage.alt,
          }`
     });

    const blogPageTextSections = await sanityFetch<BlogPagetextData[]>({
        query: getBlogPageTextSections
    });

    const blogPosts = await sanityFetch<BlogPostExpData[]>({
        query: getBlogPosts
    });

    /* const bgColor = randomBgColor();
 */
    const colors = [
        'bg-annika-blue',        
        'bg-annika-lightGreen',
        'bg-annika-darkGreen',
        'bg-annika-cream',
        'bg-annika-orange',        
      ];

    return (
        <>
            <main>
                <Hero hero={heroData[0]} isLanding={false} />
                <section className="section-contain w-full h-auto my-16 md:my-32">
                    <div className="flex flex-col md:flex-row w-full h-auto my-16 md:my-32">
                        <div className="flex-1 flex items-start justify-center">
                            <div>
                                <h2 className="text-4xl font-bold mb-4">{blogPageTextSections[0].title}</h2>
                                <div className="text-lg">
                                    <p>{blogPageTextSections[0].text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-contain w-full h-auto my-8 md:my-16">
                    <div className="flex flex-col md:flex-row w-full h-auto my-4 md:my-32 gap-6 items-start justify-start p-6">
                        
                            {blogPosts.map((post, index) => (
                                <div  
                                className='w-full md:w-64'
                                key={post.publishedAt}
                                >
                                    <Link href={`/blog/${post.slug}`} className='max-w-fit ' >
                                        <BlogPostExp key={index} post={post} />
                                    </Link>
                                </div>
                               
                            ))}
                            
                        </div>
                    
                </section>
            </main>
        </>
    );
    };
export default BlogPage;