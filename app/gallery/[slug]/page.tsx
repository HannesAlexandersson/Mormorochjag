import Hero, { HeroData } from "@/app/components/Hero/Hero";
import { sanityFetch } from "@/sanity/client";
import Link from "next/link";
import { groq } from "next-sanity";
import { getGalleryPageObjects } from "@/sanity/querys";
import Button from "@/app/components/Button/Button";
import { title } from "process";

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

interface CategoryData {
  categoryName: string;
  categoryDescription: string;
  bgImage: string;
  id: string;
  slug: string;
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

      const heroData = await sanityFetch<HeroData[]>({ 
        query: groq`*[_type == "heroSection" && _id == "2519f822-d060-4786-ac47-361fded5f4e3"]{             
            title,
            backgroundImage {
      ...,
      asset-> {
        _id,
        _ref,
        url
      }
    }
  }`
});

 const getGalleryCat = groq`
  *[_type == "galleryCategories"]{
    categoryName,
    categoryDescription,
    "bgImage": categoryImage.asset->url,
    "id": _id,
    "slug": slug.current,
  }
`;

const galleryCategories = await sanityFetch<CategoryData[]>({
    query: getGalleryCat,  // Use the same query here
  });

     
    return(
        <main>
            <Hero hero={heroData[0]} isLanding={false} />
            <section className="section-contain flex flex-col w-full h-auto my-16 md:my-32">
                <div  className="w-full md:w-1/2 flex gap-1 flex-col items-start justify-start py-6">
                    <h2 className="text-3xl underline underline-offset-4 py-2">{object}</h2>            
                </div>
                 <section className="category-nav-section">
          <div className="category-nav flex flex-row flex-wrap gap-3 md:gap-6 items-center justify-center py-6 md:py-12">
            {galleryCategories.map((section) => {
              const backgroundImage = section.bgImage; // Direct access since we are already getting the URL
              return (
                <Link key={section.id} href={`/gallery/${section.slug}`}>
                  <div
                    className={`category-item rounded-md shadow-lg shadow-gray-600 flex items-center justify-center flex-1 h-18 md:h-28 min-w-20 md:min-w-max md:w-28 bg-center bg-cover bg-no-repeat ${slug === section.slug ? 'ring-2' : ''}`}
                    style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
                  >
                    <p className="text-annika-orange text-2xl px-2 md:p-1">{section.categoryName}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
                <div className="w-full flex flex-col md:flex-row gap-6">
                    {galeryObjects.map((object) => (
                        <div key={object._id} className="flex flex-col md:flex-row gap-6 bg-annika-cream shadow-md shadow-slate-600 w-full md:w-2/5 ">
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