import Hero, { HeroData } from "@/app/components/Hero/Hero";
import { sanityFetch } from "@/sanity/client";
import Link from "next/link";
import { groq } from "next-sanity";
import { getGalleryTextSections, getGalleryCat } from "@/sanity/querys";

interface GalleryCatData{
    categoryName: string;
    categoryDescription: string;
    bgImage: string;
    id: string;
    slug: string;
}

const Galleriet = async () => {
    //2519f822-d060-4786-ac47-361fded5f4e3
    const heroData = await sanityFetch<HeroData[]>({ 
        query: groq`*[_type == "heroSection" && _id == "2519f822-d060-4786-ac47-361fded5f4e3"]{             
            title,
            "DesktopImg": backgroundImage.asset->url,
              "alt": backgroundImage.alt,
          }`
     });

    const galleryText = await sanityFetch<{title: string, text: string, position: number }[]>({
        query: getGalleryTextSections,
    });
    const firstItem = galleryText[0];
    const remainingItems = galleryText.slice(1);

    const galleryCategories = await sanityFetch<GalleryCatData[]>({
        query: getGalleryCat,
    });

    

    return(
<>
<main>
    <Hero hero={heroData[0]} isLanding={false} />

    <section className="section-contain flex flex-col w-full h-auto my-16 md:my-32">
        
            <div  className="w-full md:w-1/2 flex gap-1 flex-col items-start justify-start py-6">
                <h2 className="text-3xl underline underline-offset-4 py-2">{firstItem.title}</h2>            
                <p className="text-2xl py-1" >{firstItem.text}</p>
            </div>
        
    </section>

    <section className="section-contain flex flex-col w-full h-auto my-16 md:my-32">
        <div className="flex flex-col items-start justify-start py-6">
            <h2 className="text-3xl underline underline-offset-4 py-2">Kategorier</h2>            
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {galleryCategories.map((category) => (
                <Link key={category.id} className="flex-1 w-2/3" href={`/gallery/${category.slug}`}>
                    <div className="w-full">
                        <div 
                            className="rounded-md shadow-lg shadow-gray-600 flex items-center justify-center flex-1 ${} bg-cover bg-center bg-no-repeat h-48" 
                            style={{ backgroundImage: `url('${category.bgImage}')` }}
                        >
                        <h3 className="text-annika-orange text-3xl uppercase break-words pt-1 ">{category.categoryName}</h3>
                    </div>
                        <div className="w-full">
                            <p className="text-annika-orange break-words text-2xl font-light py-1">{category.categoryDescription}</p>
                        </div>
                    </div>
                </Link>
            ))}
                    
        </div>
    </section>


    {remainingItems.length > 0 && (
        <section className="section-contain flex flex-col w-full h-auto my-16 md:my-32">
            {remainingItems.map((section, index) => (
                <div key={section.position} className="w-full md:w-1/2 flex gap-1 flex-col items-start justify-start py-6">
                    <h2 className="text-3xl underline underline-offset-4 py-2">{section.title}</h2>            
                    <p className="text-2xl py-1" >{section.text}</p>
                </div>
            ))}
        </section>
    )}
    


</main>
</>
    );
}
export default Galleriet;