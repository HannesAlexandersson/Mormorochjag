import { groq } from 'next-sanity';
import { sanityFetch } from '@/sanity/client';
import Hero, { HeroData } from "@/app/components/Hero/Hero";
import Link from 'next/link';
import Button from '@/app/components/Button/Button';
import { getTextilCategory } from '@/sanity/querys';
import { Suspense } from 'react'

interface TextilCatData {
    _id: string;
    title: string;
    slug: string;
    image: string;
}


const Textil = async () => {
    const heroData = await sanityFetch<HeroData[]>({ 
        query: groq`*[_type == "heroSection" && _id == "103c5e21-f1bf-4e38-9439-ebb6b4e82524"]{             
            title,
            "DesktopImg": backgroundImage.asset->url,
              "alt": backgroundImage.alt,
          }`
     });

    const textilCatData = await sanityFetch<TextilCatData[]>({
        query: getTextilCategory,
    });
    
    return(
    <>
    <main>
        <Suspense fallback={<p>Loading Hero...</p>}>
            <Hero hero={heroData[0]} isLanding={false} />
        </Suspense>
        <section className="section-contain flex flex-col w-full h-auto my-16 md:my-32">

        <div className="w-full flex flex-col md:flex-row gap-6">
            {textilCatData.map((section) => (
                <Link key={section._id} href={`/store/textil/${section.slug}`}>
                    <div                        
                        className="rounded-md shadow-lg shadow-gray-600 flex items-center justify-center flex-1 h-48 min-w-max md:w-48 bg-center bg-cover bg-no-repeat"
                        style={{ backgroundImage: `url('${section.image}')` }}
                    >
                        <p className="text-annika-orange text-2xl p-1">{section.title}</p>
                    </div>
                </Link>
            ))} 
        </div>

        </section>

        <section className="section-contain flex flex-col my-8 md:my-16">
            <div className='w-full flex justify-center items-center gap-4'>
                <Link href='/store'>
                    <Button  variant="primary"  className='w-full sm:w-fit' >
                        Tillbaka
                    </Button>
                </Link>
                <Link href='/store/keramik'>
                    <Button  variant="primary"  className='w-full sm:w-fit' >
                        Besök Keramik
                    </Button>
                </Link>
            </div>
        </section>
    </main>
    </>
    )
}
export default Textil;