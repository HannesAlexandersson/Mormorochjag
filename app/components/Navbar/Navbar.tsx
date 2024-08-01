import NavbarClient from './NavbarClient';
import { sanityFetch } from "@/sanity/client";
import { getNavbarLogo } from "@/sanity/querys";

interface NavbarProps {    
    logo: string
    alt: string
    withBg?: boolean;
    variant?: 'dark' | 'light';
  }

  interface NavProps {
    hero: NavbarProps;
  }

const Navbar = async () => {
    const logo = await sanityFetch<NavbarProps[]>({ query: getNavbarLogo});
   
  return (
    <div>
      <NavbarClient logo={logo[0]} withBg={false} variant='light'/>
    </div>
  );
};

export const NavbarSkeleton = () => {
  return (
    <div>
      <NavbarClient logo={{logo: '', alt: ''}} withBg={false} variant='light'/>
    </div>
  );
}

export default Navbar;