import Image from "next/image";
import { sanityFetch } from "@/sanity/client";
import { PortableText } from '@portabletext/react';
import { groq } from "next-sanity";
import { getHero, getLandingPage, getTrippleImage } from "@/sanity/querys";
import Hero, { HeroData } from "@/app/components/Hero/Hero";



interface LandingPageSection {
  title: string;
  paragraph: any; // Adjust this type based on your Portable Text configuration
  position: number; // Numeric position
  image?: string;
  alt?: string;
  trippleImages?: {
    image1: string;
    alt1: string;
    image2: string;
    alt2: string;
    image3: string;
    alt3: string;
  };
}

interface LandingPageProps {
  sort(arg0: (a: LandingPageSection, b: LandingPageSection) => number): LandingPageSection[];
  sections: LandingPageSection[];
}





export interface HeroProps {
  hero: HeroData;
  isLanding?: boolean;  
}
//0102a4a9-990e-48c3-a3ff-9858babe5f23

export default async function Home() { 

  const heroData = await sanityFetch<HeroData[]>({ 
    query: groq`*[_type == "heroSection" && _id == "0102a4a9-990e-48c3-a3ff-9858babe5f23"]{             
        title,
        "DesktopImg": backgroundImage.asset->url,
          "alt": backgroundImage.alt,
      }`
 });    
  

  const landingPageData = await sanityFetch<LandingPageProps>({
    query: getLandingPage
  });

  const sortedLandingPageData: LandingPageSection[] = landingPageData.sort((a: LandingPageSection, b: LandingPageSection) => a.position - b.position);
  

  
  
  return (
    <>
      <main>
        
        <Hero hero={heroData[0]} isLanding={true} />
       

{sortedLandingPageData.map((section, index) => (
  <section key={index} className="section-contain w-full h-auto my-16 md:my-32">
    {section.image ? (
      <div className="flex flex-col md:flex-row w-full h-auto">
        <div className="flex-1 flex items-start justify-center p-6 md:p-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
            <div className="text-lg">
              <PortableText value={section.paragraph} />
            </div>
          </div>
        </div>
        <div className="relative flex flex-1 items-start justify-center">
          <Image
            src={section.image}
            alt={section.alt || 'Personal images'}
            width={300}
            height={500}           
            className="p-6 md:p-16"
          />
        </div>
      </div>
    ) : (
      section.trippleImages && (
        <>
          <div className="flex items-start justify-center p-6 md:p-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
              <div className="text-lg">
                <PortableText value={section.paragraph} />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-start justify-center p-6 md:p-16">
            {Object.keys(section.trippleImages).map((key, imgIndex) => (
              <div key={imgIndex} className="flex-1 justify-center">
                <Image
                  src={(section.trippleImages as any)[`image${imgIndex + 1}`]}
                  alt={(section.trippleImages as any)[`alt${imgIndex + 1}`]}
                  width={300}
                  height={500}                  
                />
              </div>
            ))}
          </div>
        </>
      )
    )}
  </section>
))}

      </main>
    </>
  );
}

