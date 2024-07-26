import Image from "next/image";
import { getFooter } from "@/sanity/querys";
import Link from "next/link";
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
    <footer className="bg-annika-cream text-annika-blue flex flex-col py-6 px-2 border-annika-pink border-t-2">
      

      <div className="flex-1 flex flex-col gap-4 items-center justify-start pt-6 ">
          <div className="flex-1 flex flex-col gap-1 items-center justify-start w-auto h-auto">
              <Image 
              src={footerData[0].logo} 
              alt={footerData[0].altText} 
              width={175}
              height={175}            
              />
            
          </div>
          <div className="flex gap-5 flex-row justify-center pt-2 pb-10">
                <Link href="#" target="_blank" rel="noreferrer">
                <Icon name="facebook" size={28} strokeWidth={1} />
                </Link>
                <Link href="#" target="_blank" rel="noreferrer">
                <Icon name="instagram" size={28} strokeWidth={1} />
                </Link>  
           
                <Link href="https://www.linkedin.com/in/hannes-alexandersson-3226952b3/" target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={28} strokeWidth={1} />
                </Link>
                <Link href="https://github.com/HannesAlexandersson" target="_blank" rel="noreferrer">
                <Icon name="github" size={28} strokeWidth={1} />
                </Link>   
        </div>
          <div className="flex-1 flex flex-col gap-4 items-center justify-end">
              <h4>Sidan konstruerad av <Link href="www.alexanderochson.se/portfolio"><span className="text-annika-lightGreen hover:text-annika-darkGreen">Hannes Alexandersson</span></Link></h4>
          </div>
          <div className="flex-1 flex flex-col gap-4 items-center justify-end">
            <p>&copy; 2024, All rights reserved</p>
          </div>
        </div>
      
        
     
    </footer>
  );
}
export default Footer;