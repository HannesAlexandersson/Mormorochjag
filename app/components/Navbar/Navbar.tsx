import NavbarClient from './NavbarClient';
import { getNavbarLogo } from "@/sanity/sanity-utils";

interface NavbarProps {
    logo: {
      logo: string
      alt: string
    }
  }

  interface NavProps {
    hero: NavbarProps;
  }

const Navbar = async () => {
    const logo = await getNavbarLogo();
  return (
    <div>
      <NavbarClient logo={logo[0]} />
    </div>
  );
};

export default Navbar;