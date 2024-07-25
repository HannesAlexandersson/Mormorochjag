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
                
             </section>
        </main>
        </>
    )
}