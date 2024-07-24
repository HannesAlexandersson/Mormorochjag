import Image from "next/image";
import { PortableText } from '@portabletext/react';
import Hero from "../components/Hero/Hero";
import { getHero, getContactPage,  } from "@/sanity/sanity-utils";

interface ContactPageSection {
    title: string;
    paragraph: any; // Adjust this type based on your Portable Text configuration
    position: number; // Numeric position
    image: string;
    imageAlt: string;
}


const Contact = async () => {
    const heroData = await getHero();    

    const contactData = await getContactPage();
    const sortedContactData = contactData.sort((a: ContactPageSection, b: ContactPageSection) => a.position - b.position);
    
    return (
        <>
            <main>
                <Hero hero={heroData[1]} isLanding={false} />

                <section className="section-contain flex flex-col md:flex-row w-full h-auto my-16 md:my-32">
                    <div className="flex-1 flex items-start justify-center p-6 md:p-16">
                        <div>
                        <h2 className="text-4xl font-bold mb-4">{sortedContactData[0].title}</h2>
                        <div className="text-lg">
                            <p>{sortedContactData[0].description} </p>
                        </div>
                        </div>
                    </div>
                    <div className="relative flex flex-1 items-start justify-center ">
                        <Image 
                        src={sortedContactData[0].imageUrl} 
                        alt={sortedContactData[0].title} 
                        width={300}
                        height={500}
                        objectFit='contain'                                
                        />
                    </div>
                </section>

                <section className="section-contain flex flex-col md:flex-row w-full h-auto my-16 md:my-32">
                    
                    <div className="relative flex flex-1 items-start justify-center ">
                        <Image 
                        src={sortedContactData[1].imageUrl} 
                        alt={sortedContactData[1].title} 
                        width={300}
                        height={500}
                        objectFit='contain'                                
                        />
                    </div>
                    
                    <div className="flex-1 flex items-start justify-center p-6 md:p-16">
                        <div>
                        <h2 className="text-4xl font-bold mb-4">{sortedContactData[1].title}</h2>
                        <div className="text-lg">
                            <p>{sortedContactData[1].description} </p>
                        </div>
                        </div>
                    </div>
                    
                </section>

                <section className="section-contain flex flex-col w-full h-auto my-8 md:my-16">
                    <div className="p-6 md:p-16">
                        <h2 className="text-3x1 font-bold mb-1">Kontaktuppgifter:</h2>
                    </div>
                    <div  className="p-6 md:p-16">
                        <p>Email: </p>
                        <p>Socialamedier: </p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Contact;