import Image from "next/image";
import { sanityFetch } from "@/sanity/client";
import { PortableText } from '@portabletext/react';
import { groq } from "next-sanity";
import { getLandingPage } from "@/sanity/querys";
import Hero, { HeroData } from "@/app/components/Hero/Hero";
import components from "./components/CustomPort/CustomPort";



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

export default async function Home() { 

  const heroData = await sanityFetch<HeroData[]>({ 
    query: groq`*[_type == "heroSection" && _id == "0102a4a9-990e-48c3-a3ff-9858babe5f23"]{             
        title,
         backgroundImage {
      ...,
      asset-> {
        _id,
        _ref,
        url
      }
    }
  }`
});

  const landingPageData = await sanityFetch<LandingPageProps>({
    query: getLandingPage
  });

  const sortedLandingPageData: LandingPageSection[] = landingPageData.sort((a: LandingPageSection, b: LandingPageSection) => a.position - b.position);
  

  
  
  return (
    <>
      <main className="relative">
      <div className="fixed inset-0 -z-10"></div>
        
        <Hero hero={heroData[0]} isLanding={true} />
       

{sortedLandingPageData.map((section, index) => (
  <section key={index} className="section-contain w-full h-auto my-16 md:my-32">
    <div className="w-[90%] md:w-3/4 bg-white bg-opacity-50 border border-gray-300 shadow-lg p-8 rounded-lg">
    {section.image ? (
      <div className="flex flex-col md:flex-row w-full h-auto">
        <div className="flex-1 flex items-start justify-center p-6 md:p-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
            <div className="text-lg md:text-2xl">
              <PortableText value={section.paragraph} components={components}/>
            </div>
          </div>
        </div>
        <div className="relative flex flex-1 items-start justify-center">
          <Image
            src={section.image}
            alt={section.alt || 'Personal images'}
            width={300}
            height={500}           
            className="p-6 md:p-16 md:hidden"
            style={{ objectFit: 'contain' }}
          />
          <Image
            src={section.image}
            alt={section.alt || 'Personal images'}
            fill={true}           
            className="p-6 md:p-16 sm:hidden md:block"
            style={{ objectFit: 'contain' }}
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
                <PortableText value={section.paragraph} components={components} />
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
    </div>
  </section>
))}

      </main>
    </>
  );
}

