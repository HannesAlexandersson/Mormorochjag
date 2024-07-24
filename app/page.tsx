import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { getHero, getLandingPage, getTrippleImage } from "@/sanity/sanity-utils";
import Hero from "./components/Hero/Hero";


interface LandingPageSection {
  title: string;
  paragraph: any; // Adjust this type based on your Portable Text configuration
  position: number; // Numeric position
  image: string;
  imageAlt: string;
}

interface LandingPageProps {
  sections: LandingPageSection[];
}



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
  const sortedLandingPageData = landingPageData.sort((a: LandingPageSection, b: LandingPageSection) => a.position - b.position);
  

  const trippleImageData = await getTrippleImage();
  
  return (
    <> 
      <main>
        {heroData ? (
          <Hero hero={heroData[0]} isLanding={true} />

        ) : (<h1>Loading...</h1>)}       

        <section className="section-contain flex flex-col md:flex-row w-full h-auto my-16 md:my-32">
          <div className="flex-1 flex items-start justify-center p-6 md:p-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">{sortedLandingPageData[0].title}</h2>
              <div className="text-lg">
                <PortableText  value={sortedLandingPageData[0].paragraph} />
              </div>
            </div>
          </div>
          <div className="relative flex flex-1 items-start justify-center ">
            <Image 
              src={sortedLandingPageData[0].image} 
              alt={sortedLandingPageData[0].imageAlt} 
              width={300}
              height={500}
              objectFit='contain'      
                     
            />
          </div>
        </section>

         <section className="section-contain flex flex-col w-full h-auto my-8 md:my-12">
          <div className="flex items-start justify-center p-6 md:p-16">
              <div>
                <h2 className="text-4xl font-bold mb-4">{sortedLandingPageData[1].title}</h2>
                <div className="text-lg">
                  <PortableText  value={sortedLandingPageData[1].paragraph} />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-start justify-center p-6 md:p-16">
              <div className="flex-1 justify-center">
                <Image 
                  src={trippleImageData[1].image1} 
                  alt={trippleImageData[1].alt1} 
                  width={300}
                  height={500}
                  objectFit='cover'
                />
              </div>
              <div className="flex-1 justify-center">
                <Image 
                  src={trippleImageData[1].image2} 
                  alt={trippleImageData[1].alt2} 
                  width={300}
                  height={500}
                  objectFit='cover'
                />
              </div>
              <div className="flex-1 justify-center">
                <Image 
                  src={trippleImageData[1].image3} 
                  alt={trippleImageData[1].alt3} 
                  width={300}
                  height={500}
                  objectFit='cover'
                />
              </div>
            </div>
         </section>

         <section className="section-contain flex flex-col w-full h-auto my-8 md:my-12">
          <div className="flex items-start justify-center p-6 md:p-16">
              <div>
                <h2 className="text-4xl font-bold mb-4">{sortedLandingPageData[2].title}</h2>
                <div className="text-lg">
                  <PortableText  value={sortedLandingPageData[2].paragraph} />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-start justify-center p-6 md:p-16">
              <div className="flex-1 justify-center">
                <Image 
                  src={trippleImageData[0].image1} 
                  alt={trippleImageData[0].alt1} 
                  width={300}
                  height={500}
                  objectFit='cover'
                />
              </div>
              <div className="flex-1 justify-center">
                <Image 
                  src={trippleImageData[0].image2} 
                  alt={trippleImageData[0].alt2} 
                  width={300}
                  height={500}
                  objectFit='cover'
                />
              </div>
              <div className="flex-1 justify-center">
                <Image 
                  src={trippleImageData[0].image3} 
                  alt={trippleImageData[0].alt3} 
                  width={300}
                  height={500}
                  objectFit='cover'
                />
              </div>
            </div>
         </section>

         <section className="section-contain flex flex-col md:flex-row w-full h-auto my-16 md:my-32">
          <div className="flex-1 flex items-start justify-center p-6 md:p-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">{sortedLandingPageData[3].title}</h2>
              <div className="text-lg">
                <PortableText  value={sortedLandingPageData[3].paragraph} />
              </div>
            </div>
          </div>
          <div className="relative flex flex-col gap-4 items-start justify-center ">
            <Image 
              src={trippleImageData[2].image1} 
              alt={trippleImageData[2].alt1} 
              width={300}
              height={500}
              objectFit='cover'      
                     
            />
             <Image 
              src={trippleImageData[2].image2} 
              alt={trippleImageData[2].alt2} 
              width={300}
              height={500}
              objectFit='cover'      
                     
            />
          </div>
        </section>
      </main>     
    </>
  );
}
