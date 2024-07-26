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
                <div className="flex items-center justify-center">
                    <h2 className="text-4xl underline underline-offset-4 pt-2 pb-6">Kategorier</h2>
                </div>
                <div className="w-full flex flex-row gap-6">
                    
                    <Link className="flex-1" href="/store/keramik">
                        <div className="rounded-md shadow-lg shadow-gray-600 flex items-center justify-center flex-1 bg-keramik bg-cover bg-center bg-no-repeat h-48" >
                            <p className="text-annika-orange text-2xl">Keramik</p>
                        </div>
                    </Link>

                    <Link className="flex-1" href="/store/textil">
                        <div className="rounded-md shadow-lg shadow-gray-600 flex flex-1 items-center justify-center bg-textil bg-cover bg-center bg-no-repeat h-48">
                            <p className="text-annika-orange text-2xl">Textil och pastill</p>
                        </div>
                    </Link>
                   
                </div>
            </section>
        </main>
        </>
    )
}
export default Store;