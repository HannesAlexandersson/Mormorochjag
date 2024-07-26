import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import { PortableText } from '@portabletext/react';
import Hero, { HeroData } from "@/app/components/Hero/Hero";
import { socials, getContactPage,  } from "@/sanity/querys";
import Icon from "../components/Icon/Icon";



interface SocialMediaItem {    
    platform: string;
    link: string;
    icon: string;
  }
  
  // Interface for the main document
  interface DocumentWithSocialMedia {
    email: string;
    socialMedia: SocialMediaItem[];
  }

interface ContactPageSection {
    title: string;
    description: any; // Adjust this type based on your Portable Text configuration
    position: number; // Numeric position
    imageUrl?: string;
    imageAlt?: string;
    sort(arg0: (a: ContactPageSection, b: ContactPageSection) => number): ContactPageSection[];
}

//e5a62374-841f-4876-ac6a-1e675bd703c0
const Contact = async () => {
    const heroData = await sanityFetch<HeroData[]>({ 
        query: groq`*[_type == "heroSection" && _id == "e5a62374-841f-4876-ac6a-1e675bd703c0"]{             
            title,
            "DesktopImg": backgroundImage.asset->url,
              "alt": backgroundImage.alt,
          }`
     });    

    const socialData = await sanityFetch<DocumentWithSocialMedia[]>({
        query: socials,
    });

    const contactData = await sanityFetch<ContactPageSection[]>({ query: getContactPage});
    const sortedContactData = contactData.sort((a: ContactPageSection, b: ContactPageSection) => a.position - b.position);
    

    return (
        <>
            <main>
                <Hero hero={heroData[0]} isLanding={false} />

                <section className="section-contain flex flex-col md:flex-row w-full h-auto my-16 md:my-32">
                    <div className="flex-1 flex items-start justify-center p-6 md:p-16">
                        <div>
                        <h2 className="text-4xl font-bold mb-4">{sortedContactData[0].title}</h2>
                        <div className="text-lg">
                            <p>{sortedContactData[0].description} </p>
                        </div>
                        </div>
                    </div>
                    {sortedContactData[0].imageUrl && (

                    <div className="relative flex flex-1 items-start justify-center ">
                        <Image 
                        src={sortedContactData[0].imageUrl} 
                        alt={sortedContactData[0].title || 'alt text for image'} 
                        width={300}
                        height={500}                                                        
                        />
                    </div>

                    ) }
                </section>

                
                <section className="section-contain flex flex-col w-full h-auto my-8 md:my-16">
                    <div className="p-6 md:p-16">
                        <h2 className="text-3x1 font-bold mb-1">Kontaktuppgifter:</h2>
                    </div>
                    <div  className="p-6 md:p-16">
                        <p>Email: {socialData[0].email}</p>
                        <p>Socialamedier:</p>
                        <div className="text-annika-blue">
                            {socialData[0].socialMedia.map((social, index) => (
                                <Link key={index} href={social.link} target="_blank" rel="noreferrer">
                                    <Icon name="instagram" size={28} strokeWidth={1} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Contact;