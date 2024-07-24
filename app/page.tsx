import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { getHero, getLandingPage, getTrippleImage } from "@/sanity/sanity-utils";
import Hero from "./components/Hero/Hero";



export interface HeroData {
  title: string;
  DesktopImg: string;
  alt: string;  
}

export interface HeroProps {
  hero: HeroData;
}


export default async function Home() { 

  const heroData = await getHero();

  const landingPageData = await getLandingPage();
  

  const trippleImageData = await getTrippleImage();
  
  return (
    <> 
      <main>
        {heroData ? (
          <Hero hero={heroData[0]} />

        ) : (<h1>Loading...</h1>)}       

        <section className="section-contain flex flex-col md:flex-row w-full h-screen my-16 md:my-32">
          <div className="flex-1 flex items-start justify-center p-6 md:p-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">{landingPageData[0].title}</h2>
              <div className="text-lg">
                <PortableText  value={landingPageData[0].paragraph} />
              </div>
            </div>
          </div>
          <div className="relative flex flex-1 md:h-auto">
            <Image 
              src={landingPageData[0].image} 
              alt={landingPageData[0].imageAlt} 
              width={200}
              height={300}
              objectFit='cover' 
              className="absolute top-0 left-1/2 -translate-x-1/2"
            />
          </div>
        </section>
      </main>     
    </>
  );
}
