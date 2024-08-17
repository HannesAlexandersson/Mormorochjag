import { sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Hero, { HeroData } from "@/app/components/Hero/Hero";
import { groq } from "next-sanity";
import { getStorePageTextSections } from "@/sanity/querys";

interface StoreData {
    title: string;
    text: string;
    position: number;
    }[];

interface buttonData {
    sectionTitle: string;
    buttonImage: string;
    alt: string;
    }

const Store = async () => {
    const heroData = await sanityFetch<HeroData[]>({ 
        query: groq`*[_type == "heroSection" && _id == "3b46a36d-3bf4-469a-9e01-82a5b7bc6bfa"]{             
            title,
            "DesktopImg": backgroundImage.asset->url,
              "alt": backgroundImage.alt,
          }`
     });

    const storeData = await sanityFetch<StoreData[]>({
        query: getStorePageTextSections,
    });

    const buttonData = await sanityFetch<buttonData[]>({
        query: groq`*[_type == "buttonImages"]{             
            sectionTitle,
            "buttonImage": buttonImage.asset->url,
              "alt": buttonImage.alt,
          }`
      });
    
      const keramikBg = buttonData[0].buttonImage;
      const textilBg = buttonData[1].buttonImage;
    

    return (
        <>
        <main>
            {heroData[0] ? (
                <Hero hero={heroData[0]} isLanding={false} />

            ): (
                <h1>Loading hero...</h1>
            )}

             <section className="section-contain flex flex-col w-full h-auto my-16 md:my-32">
                {storeData.map((section, index) => (
                    <div key={index} className="w-full md:w-1/2 flex flex-col items-start justify-start py-6">
                        <h2 className="text-3xl underline underline-offset-4 py-2">{section.title}</h2>
                        <p>{section.text}</p>
                    </div>
                ))}
             </section>

            <section className="section-contain flex flex-col my-8 md:my-16">
                
                <div className="w-full flex flex-col md:flex-row gap-6 items-center justify-center">
                    
                    <Link className="flex-1 w-2/3 " href="/store/keramik">
                        <div 
                            className="rounded-md shadow-lg shadow-gray-600 flex items-center justify-center flex-1  bg-cover bg-center bg-no-repeat h-48 w-full"
                            style={{ backgroundImage: `url(${keramikBg})` }}
                        >
                            <p className="text-annika-orange text-2xl">Keramik</p>
                        </div>
                    </Link>

                    <Link className="flex-1 w-2/3" href="/store/textil">
                    <div 
                        className="rounded-md shadow-lg shadow-gray-600 flex items-center justify-center flex-1 bg-cover bg-center bg-no-repeat h-48 w-full"
                        style={{ backgroundImage: `url(${textilBg})` }}
                    >
                            <p className="text-annika-orange text-2xl">Textil</p>
                        </div>
                    </Link>
                   
                </div>
            </section>
        </main>
        </>
    )
}
export default Store;