import { sanityFetch } from '@/sanity/client'
import { redirect } from 'next/navigation'

import ObjectCard from '@/app/components/ObjectCard/ObjectCard'
import Link from 'next/link'
import Button from '@/app/components/Button/Button'
import { groq } from 'next-sanity'
import { MailQuestion } from 'lucide-react'
import Hero from '@/app/components/Hero/Hero'

interface HeroData {
    title: string;
    DesktopImg: string;
    alt: string;    
  }
  
 interface HeroProps {
    hero: HeroData;
    isLanding?: boolean;
  }

interface Params {
    slug: string;
  }

  interface categoryIdData {
    id: string;
    image: string;
}

interface KeramikObjectData {
    title: string;
    description: string;
    image: string;
    price: number;
    slug: string;
    _id: string;
}
interface PageProps {
    params: Params;
  }

export const generateMetadata = async ({ params }: { params: Params }) => {
    let object = params.slug.split('-').join(' ')
    const first = object.charAt(0)
    object = object.replace(first, first.toUpperCase())
  
    return {
      title: `Object | ${object}`,
    }
  }


  const KeramikObject: React.FC<PageProps> = async ({ params }: { params: Params }) => {
    

    const slug = params.slug;
    const categoryData = await sanityFetch<categoryIdData>({
        query: groq`*[_type == "kermaikCategory" && slug.current == $slug][0] {
                    "id": _id,
                    "image": image.asset->url
                    }
                `,
        params: { slug }
    })
    
    const categoryId = categoryData.id;

    const keramikObjects = await sanityFetch<KeramikObjectData[]>({
        query: groq`*[_type == "keramik" && category._ref == $categoryId]{
                    title,
                    description,
                    "image": image.asset->url,
                    price,
                    "slug": slug.current,
                    _id,
                } | order(asc)`,
        params: { categoryId }
      });
      
    if (!keramikObjects) redirect('/store/keramik')

    let formattedSlug = slug.split('-').join(' ');
    const first = formattedSlug.charAt(0);
    formattedSlug = formattedSlug.replace(first, first.toUpperCase());

    const customHero = {
        title: formattedSlug,
        DesktopImg: categoryData.image,
        alt: formattedSlug
    }

    return(
        <>
        <main>
            <Hero hero={customHero} isLanding={false}  />
            
            <section className="section-contain flex flex-col w-full h-auto my-16 md:my-32">
                <div className="w-full flex flex-wrap gap-6 justify-evenly">
                    {keramikObjects.map((object) => (
                        <ObjectCard key={object.title} object={object} />
                      
                    ))}
                </div>
            </section>

            <section className="section-contain flex flex-col my-8 md:my-16">
            <div className='w-full flex justify-center items-center'>
                <Link href='/store/keramik'>
                    <Button  variant="primary"  className='w-full sm:w-fit' >
                        Tillbaka
                    </Button>
                </Link>
            </div>
        </section>

        <section className="section-contain flex flex-col my-8 md:my-16">
            <div className='w-full flex gap-2 justify-center items-center'>
                <p className="text-2xl">Ser du något du gillar? Tveka inte att slänga iväg ett mail </p>
                <Link href="mailto:annikaalexanderson@hotmail.com"><MailQuestion size={38} /> </Link>
            </div>
        </section>

        </main>
        </>
    );
}

export default KeramikObject;

 /*  
 REFERENCES:
 <div key={object._id} className="flex flex-col md:flex-row gap-6 bg-annika-lightGreen shadow-md shadow-slate-600 w-full md:w-2/5 ">
    <div 
        className="w-full md:w-1/2 h-96 bg-center bg-cover bg-no-repeat" 
        style={{ backgroundImage: `url('${object.image}')` }}
    ></div>
    <div className="w-full md:w-1/2 flex flex-col items-start justify-start p-3">
        <h3 className="text-4xl underline underline-offset-4 py-2">{object.title}</h3>
        <p className="text-2xl">{object.description}</p>
        <p className="text-2xl">{object.price} kr</p>
    </div>
</div>
                        
*/