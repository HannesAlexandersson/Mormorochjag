import Image from "next/image";
import { getFooter } from "@/sanity/querys";
import { sanityFetch } from "@/sanity/client";
import pageLinks from "@/lib/pageLinks";
import Icon from "../Icon/Icon";


interface FootProps {
    logo: string;
    altText: string;
  }


const Footer = async () => {
    const footerData = await sanityFetch<FootProps[]>({ query: getFooter});

  return (
    <footer className="bg-annika-cream text-annika-blue flex flex-col py-6 px-2">
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between pt-2 pb-10">
        <div className="flex-1 flex flex-col gap-4 items-center justify-start">
            <h3><strong>Meny:</strong></h3>
            {pageLinks.map((link) => (
                <a key={link.title} href={link.path} className="hover:text-annika-darkGreen ">{link.title}</a>
            ))}
        </div>
        
        <div className="flex-1 flex flex-col gap-4 items-center justify-start">
            <h3>Min sociala medier: </h3>
            <div className="flex flex-col gap-2 ">
                <a href="#" target="_blank" rel="noreferrer">
                <Icon name="facebook" size={28} strokeWidth={1} />
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                <Icon name="instagram" size={28} strokeWidth={1} />
                </a>                
            </div>
            <h3>Följ Hannes på sociala medier: </h3>
            <div className="flex flex-col gap-2 ">
                <a href="https://www.linkedin.com/in/hannes-alexandersson-3226952b3/" target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={28} strokeWidth={1} />
                </a>
                <a href="https://github.com/HannesAlexandersson" target="_blank" rel="noreferrer">
                <Icon name="github" size={28} strokeWidth={1} />
                </a>                
            </div>               
        </div>
        
      </div>

      <div className="flex-1 flex flex-col gap-4 items-center justify-start pt-6 border-annika-pink border-t-2">
          <div className="flex-1 flex flex-col gap-1 items-center justify-start w-auto h-auto">
              <Image 
              src={footerData[0].logo} 
              alt={footerData[0].altText} 
              width={175}
              height={175}            
              />
            
          </div>
          <div className="flex-1 flex flex-col gap-4 items-center justify-end">
              <h4>Sidan konstruerad av <a href="www.alexanderochson.se/portfolio">Hannes Alexandersson</a></h4>
          </div>
          <div className="flex-1 flex flex-col gap-4 items-center justify-end">
            <p>&copy; 2024, All rights reserved</p>
          </div>
        </div>
      
        
     
    </footer>
  );
}
export default Footer;