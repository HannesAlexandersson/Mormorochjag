import { sanityFetch } from "@/sanity/client";
import Hero, { HeroData } from "../components/Hero/Hero";
import { getHero } from "@/sanity/querys";


const Store = async () => {
    const heroData = await sanityFetch<HeroData[]>({ query: getHero });

    return (
        <>
        <main>
            {heroData[3] ? (
                <Hero hero={heroData[3]} isLanding={false} />

            ): (
                <h1>Loading hero...</h1>
            )}

             <section className="section-contain flex flex-col md:flex-row w-full h-auto my-16 md:my-32">
                <div className="flex-1 flex items-start justify-center p-6 md:p-16">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">Välkommen till "affären"!</h2>
                        <div className="text-lg">
                            <p>Här hittar du våra produkter. Vi har allt från kläder till accessoarer. </p>
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-1 items-start justify-center ">
                   {/*  <Image 
                    src="https://cdn.pixabay.com/photo/2016/11/29/08/00/abstract-1867006_960_720.jpg" 
                    alt="Välkommen till vår webbshop" 
                    width={300}
                    height={500}                                                        
                    /> */}
                </div>
             </section>
        </main>
        </>
    )
}