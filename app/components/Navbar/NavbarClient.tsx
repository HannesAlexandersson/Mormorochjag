'use client'

import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { cn } from '@/lib/utils'
import Button from '../Button/Button'
import pageLinks from '@/lib/pageLinks'

interface NavbarProps {
  logo: {
    logo: string
    alt: string
  }
}

const Navbar:React.FC<NavbarProps> = ({logo}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [linkIndex, setLinkIndex] = useState(null)
  
    const handleToggle = () => {
      setShowMenu(!showMenu);
    };
  
    return (
      <>
        <div
          className={cn(
            'fixed inset-0 z-30 flex h-20 select-none items-center justify-between overflow-y-visible bg-transparent px-6 text-white transition-all duration-300 xl:px-16'
          )}
        >
          <Link href={'/'}>
           { <Image 
              src={logo.logo}
              alt={logo.alt}
              width={200 / 1.1}
              height={36 / 1.1}
              className='max-w-[130px] md:max-w-none'
            />}
          </Link>
          <Button
            onClick={handleToggle}
            className={cn(
              'fixed right-6 top-10 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center gap-1 p-0 transition-opacity duration-300 hover:bg-black xl:right-16'
            )}
            variant={'primary'}
            aria-label='Open navigation menu'
          >
            <div className={cn('hamburger-line', { 'line-1': showMenu })} />
            <div className={cn('hamburger-line', { 'line-2': showMenu })} />
            <div className={cn('hamburger-line', { 'line-3': showMenu })} />
          </Button>
        </div>
        {showMenu && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
          <Button
            onClick={handleToggle}
            className="absolute top-6 right-6 text-white"
            aria-label="Close navigation menu"
          >
            X
          </Button>
          {pageLinks.map((link, index) => (
          <div
            key={link.path}
            className={cn('transition-colors duration-300', {
              'text-zinc-500': index !== linkIndex && linkIndex !== null,
            })}
            
          >
            <Link href={link.path}>
              <p
                onClick={() => handleToggle}
                className={'py-2 text-end text-xl font-medium uppercase'}                           
              >
                {link.title}
              </p>
            </Link>
          </div>
        ))}
        </div>
      )}
      </>
    );
  };
  
  export default Navbar;