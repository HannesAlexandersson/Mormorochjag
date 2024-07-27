import BlogPostFull from "@/app/components/BlogPost/BlogPostFull";
import { sanityFetch } from '@/sanity/client'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Button from '@/app/components/Button/Button'
import { groq } from 'next-sanity'
import { getFullPost } from '@/sanity/querys'
import Hero, { HeroData } from '@/app/components/Hero/Hero'

 interface BlogPostData {
    title: string;
    authorId: string;
    content: any;
    image: string;
    publishedAt: string;
    slug: string;
    author: string;
}

interface PageProps {
    params: Params;
  }
  interface Params {
    slug: string;
  }

interface AuthorData {
    name: string;
    image: string;
}

const BlogPostPage: React.FC<PageProps> = async ({ params }: { params: Params }) => {
   

    const slug = params.slug;

    const post = await sanityFetch<BlogPostData>({
        query: getFullPost,
        params: { slug }
    });

    


let formattedSlug = slug.split('-').join(' ');
    const first = formattedSlug.charAt(0);
    formattedSlug = formattedSlug.replace(first, first.toUpperCase());

    const customHero: HeroData = {
        title: formattedSlug,
        DesktopImg: post.image,
        alt: formattedSlug
    }



    return (
        <>
            <main>
                <Hero hero={customHero} isLanding={false} />
                <section className="section-contain w-full h-auto my-16 md:my-32">
                    <div className="flex flex-col md:flex-row w-full h-auto my-16 md:my-32">
                       <BlogPostFull post={post} />
                    </div>
                </section>


                <section className="section-contain flex flex-col my-8 md:my-16">
                    <div className='w-full flex justify-center items-center'>
                        <Link href='/blog'>
                            <Button  variant="primary"  className='w-full sm:w-fit' >
                                Tillbaka
                            </Button>
                        </Link>
                    </div>
                </section>

            </main>
        </>
    );
};
export default BlogPostPage;