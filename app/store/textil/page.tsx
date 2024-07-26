import { groq } from 'next-sanity';
import { sanityFetch } from '@/sanity/client';
import Hero, { HeroData } from "@/app/components/Hero/Hero";
import Link from 'next/link';
import Button from '@/app/components/Button/Button';



const Textil = async () => {
    const heroData = await sanityFetch<HeroData[]>({ 
        query: groq`*[_type == "heroSection" && _id == "103c5e21-f1bf-4e38-9439-ebb6b4e82524"]{             
            title,
            "DesktopImg": backgroundImage.asset->url,
              "alt": backgroundImage.alt,
          }`
     });
    
    return(
    <>
    <main>
        <Hero hero={heroData[0]} isLanding={false} />

        <section className="section-contain flex flex-col w-full h-auto my-16 md:my-32">
            <div className="w-full md:w-1/2 flex flex-col items-start justify-start py-6">
                <h2 className="text-3xl underline underline-offset-4 py-2">Textil och pastill</h2>
                <p>Textil och pastill</p>
            </div>
        </section>

        <section className="section-contain flex flex-col my-8 md:my-16">
            <div className='w-full flex justify-center items-center'>
                <Link href='/store'>
                    <Button  variant="primary"  className='w-full sm:w-fit' >
                        Tillbaka
                    </Button>
                </Link>
            </div>
        </section>
    </main>
    </>
    )
}
export default Textil;