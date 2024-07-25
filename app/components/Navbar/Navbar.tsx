import NavbarClient from './NavbarClient';
import { sanityFetch } from "@/sanity/client";
import { getNavbarLogo } from "@/sanity/querys";

interface NavbarProps {    
    logo: string
    alt: string
    
  }

  interface NavProps {
    hero: NavbarProps;
  }

const Navbar = async () => {
    const logo = await sanityFetch<NavbarProps[]>({ query: getNavbarLogo});
   
  return (
    <div>
      <NavbarClient logo={logo[0]} />
    </div>
  );
};

export default Navbar;