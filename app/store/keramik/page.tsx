import { groq } from 'next-sanity';
import { sanityFetch } from '@/sanity/client';
import Link from 'next/link';
import Hero, { HeroData } from "@/app/components/Hero/Hero";
import { getKeramikCategory } from "@/sanity/querys";
import Button from '@/app/components/Button/Button';

interface KeramikCatData {
    _id: string;
    title: string;
    slug: string;
    image: string;
}

const Keramik = async () => {
    const heroData = await sanityFetch<HeroData[]>({ 
        query: groq`*[_type == "heroSection" && _id == "2d7f48a7-c5d4-4b5d-84b0-71f39b86167f"]{             
            title,
            "DesktopImg": backgroundImage.asset->url,
              "alt": backgroundImage.alt,
          }`
     });

    const keramikCatData = await sanityFetch<KeramikCatData[]>({
        query: getKeramikCategory,
    });




    
    return(
    <>
    <main>
        <Hero hero={heroData[0]} isLanding={false} />

        <section className="section-contain flex flex-col w-full h-auto my-16 md:my-32">

        <div className="flex flex-col md:flex-row flex-wrap gap-6">
            {keramikCatData.map((section) => (
                <Link key={section._id} href={`/store/keramik/${section.slug}`}>
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
export default Keramik;