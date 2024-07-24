import Image from "next/image";
import { getFooter } from "@/sanity/sanity-utils";


const Footer = async () => {
    const footerData = await getFooter();

  return (
    <footer className="bg-annika-cream text-annika-blue flex flex-row py-6 px-2">
        <div className="flex-1 flex items-center justify-center">
            <Image 
            src={footerData[0].logo} 
            alt={footerData[0].altText} 
            width={100}
            height={100}
            objectFit='contain'
            />
        </div>
        <div className="flex-1 flex items-center justify-center">
            <p>&copy; 2021, All rights reserved</p>
        </div>
    </footer>
  );
}
export default Footer;