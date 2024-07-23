import Image from "next/image";
import { getData, getHero } from "@/sanity/sanity-utils";
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
  
  return (
    <>
      <main>
        {heroData ? (
          <Hero hero={heroData[0]} />

        ) : (<h1>Loading...</h1>)}        
      </main>     
    </>
  );
}
