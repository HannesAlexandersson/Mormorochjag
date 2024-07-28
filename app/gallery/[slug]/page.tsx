import Hero, { HeroData } from "@/app/components/Hero/Hero";
import { sanityFetch } from "@/sanity/client";
import Link from "next/link";
import { groq } from "next-sanity";
import { getGalleryPageObjects } from "@/sanity/querys";
import Button from "@/app/components/Button/Button";

interface GalleryObjectData {
    title: string;
    description: string;
    image: string;   
    _id?: string;
  }

interface Params {
    slug: string;
  }

interface PageProps {
    params: Params;
  }
interface categoryIdData {
    _id: string;
    bgImage: string;
}

const GalleryPage: React.FC<PageProps> = async ({ params }: { params: Params }) => {
    let object = params.slug.split('-').join(' ')
    const first = object.charAt(0)
    object = object.replace(first, first.toUpperCase())

    const slug = params.slug;
    const categoryData = await sanityFetch<categoryIdData>({
        query: groq`*[_type == "galleryCategories" && slug.current == $slug][0]{
                _id,
                "bgImage": categoryImage.asset->url,
                }
                `,
        params: { slug }
    })
    
    const categoryId = categoryData._id;
    

    const galeryObjects = await sanityFetch<GalleryObjectData[]>({
        query: getGalleryPageObjects,
        params: { categoryId }
      });

      const customHero = {
        title: object,
        DesktopImg: categoryData.bgImage,
        alt: object
      }
    return(
        <main>
            <Hero hero={customHero} isLanding={false} />
            <section className="section-contain flex flex-col w-full h-auto my-16 md:my-32">
                <div  className="w-full md:w-1/2 flex gap-1 flex-col items-start justify-start py-6">
                    <h2 className="text-3xl underline underline-offset-4 py-2">{object}</h2>            
                </div>         
                <div className="w-full flex flex-row gap-6">
                    {galeryObjects.map((object) => (
                        <div key={object._id} className="flex flex-col md:flex-row gap-6 bg-annika-lightGreen shadow-md shadow-slate-600 w-full md:w-2/5 ">
                        <div 
                            className="w-full md:w-1/2 h-96 bg-center bg-cover bg-no-repeat" 
                            style={{ backgroundImage: `url('${object.image}')` }}
                        ></div>
                        <div className="w-full md:w-1/2 flex flex-col items-start justify-start p-3">
                            <h3 className="text-4xl underline underline-offset-4 py-2">{object.title}</h3>
                            <p className="text-2xl">{object.description}</p>                                           
                        </div>
                    </div>
                          
                    ))}
                    </div>      
            </section>
            <section className="section-contain flex flex-col my-8 md:my-16">
            <div className='w-full flex justify-center items-center'>
                <Link href='/gallery'>
                    <Button  variant="primary"  className='w-full sm:w-fit' >
                        Tillbaka
                    </Button>
                </Link>
            </div>
        </section>
        </main>
    );
}

export default GalleryPage;