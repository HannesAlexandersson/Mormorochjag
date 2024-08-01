import { sanityFetch } from '@/sanity/client'
import { redirect } from 'next/navigation'


import Link from 'next/link'
import Button from '@/app/components/Button/Button'
import { groq } from 'next-sanity'
import { MailQuestion } from 'lucide-react'
import Hero from '@/app/components/Hero/Hero'
import ObjectCard from '@/app/components/ObjectCard/ObjectCard'

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

interface TextilObjectData {
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

  interface CategoryData {
    _id: string
    title: string
    slug: string
  }

  export const generateMetadata = async ({ params }: { params: Params }) => {
    let object = params.slug.split('-').join(' ')
    const first = object.charAt(0)
    object = object.replace(first, first.toUpperCase())
  
    return {
      title: `Object | ${object}`,
    }
  }

  const TextilObject: React.FC<PageProps> = async ({ params }: { params: Params }) => {

    const textilCategories = await sanityFetch<CategoryData[]>({
        query: groq`*[_type == "textilCategory"]{
          _id,
          title,
          "slug": slug.current
        }`,
      })
    

    const slug = params.slug;
    const categoryData = await sanityFetch<categoryIdData>({
        query: groq`*[_type == "textilCategory" && slug.current == $slug][0] {
                    "id": _id,
                    "image": image.asset->url
                    }
                `,
        params: { slug }
    })
    
    const categoryId = categoryData.id;

    const textilObjects = await sanityFetch<TextilObjectData[]>({
        query: groq`*[_type == "textil" && category._ref == $categoryId]{
                    title,
                    description,
                    "image": image.asset->url,
                    price,
                    "slug": slug.current,
                    _id,
                } | order(asc)`,
        params: { categoryId }
      });   

    if (textilObjects.length === 0) {
        alert('Inga produkter hittades, du kommer att skickas tillbaka till textil');
        redirect('/store/textil')
    }
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
            <Hero hero={customHero} isLanding={false} />
            

            <section className="section-contain flex flex-col w-full h-auto my-16 md:my-32">
            {textilCategories && (
                    <div className="flex flex-row flex-wrap gap-3 md:gap-6 items-center justify-center py-6 md:py-12">
                        {textilCategories.map((section) => (
                            <Link key={section._id} href={`/store/textil/${section.slug}`}>
                                {slug === section.slug ? (
                                    <div className="rounded-md shadow-lg shadow-gray-600 flex items-center justify-center flex-1 h-18 md:h-28 min-w-20 md:w-28 bg-center bg-cover bg-no-repeat ring-2" >
                                        <p className="text-annika-orange text-2xl p-1">{section.title}</p>
                                    </div>
                                ) : (
                                    <div className="rounded-md shadow-lg shadow-gray-600 flex items-center justify-center flex-1 h-18 md:h-28 min-w-20 md:w-28 bg-center bg-cover bg-no-repeat" >
                                        <p className="text-annika-orange text-2xl px-2 md:p-1">{section.title}</p>
                                    </div>
                                )}
                                
                            </Link>
                        ))}
                </div>
                )}


                <div className="w-full flex flex-wrap gap-6 justify-evenly">
                    {textilObjects.map((object) => (
                        <ObjectCard key={object._id} object={object} />
                    ))}
                </div>
            </section>

            <section className="section-contain flex flex-col my-8 md:my-16">
            <div className='w-full flex justify-center items-center gap-4'>
                <Link href='/store/textil'>
                    <Button  variant="primary"  className='w-full sm:w-fit' >
                        Tillbaka
                    </Button>
                </Link>
                <Link href='/store/keramik'>
                    <Button  variant="primary"  className='w-full sm:w-fit' >
                        Besök keramik
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

export default TextilObject;

/*
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