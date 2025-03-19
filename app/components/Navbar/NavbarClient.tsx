'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn, isBrowser } from '@/lib/utils';
import Button from '../Button/Button';
import pageLinks from '@/lib/pageLinks';

interface NavbarProps {
  logo: {
    logo: string;
    alt?: string;
  };
  withBg?: boolean;
  variant?: 'dark' | 'light';
}

const Navbar: React.FC<NavbarProps> = ({ logo, withBg = false, variant = 'light' }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [linkIndex, setLinkIndex] = useState<number | null>(null);
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
  const [isNavDown, setIsNavDown] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);

  const isNavBellow = () => {
    if (!isBrowser()) return false;
    return isNavDown && scrollPos > window.innerHeight / 3;
  };

  const toggle = React.useCallback((show: boolean) => {
    setShowMenu(show);
    setTimeout(() => setShowBackdrop(show), !show ? 300 : 0);
  }, []);

  const handleKeyDown = React.useCallback((ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === 'Escape' && showMenu) {
      ev.preventDefault();
      toggle(false);
    }
  }, [showMenu, toggle]);

  const handleScroll = React.useCallback(() => {
    const { scrollY } = window;
    const isScrollingDown = scrollY > scrollPos;
    const isScrollingUp = scrollY < scrollPos;
    const isPastThreshold = Math.abs(scrollY - scrollPos) > 5;
    const isPastScreenThird = scrollPos > window.innerHeight / 3 - 50;

    if (isNavDown && isPastScreenThird && isScrollingDown && isPastThreshold) {
      setIsNavDown(false);
      if (showMenu) toggle(false);
    }

    if (isScrollingUp && isPastThreshold && !isNavDown) {
      setIsNavDown(true);
    }

    setScrollPos(scrollY);
  }, [scrollPos, isNavDown, showMenu, toggle]);

  useEffect(() => {
    if (isBrowser()) {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('keydown', handleKeyDown as any);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('keydown', handleKeyDown as any);
      };
    }
  }, [scrollPos, showMenu, isNavDown, handleKeyDown, handleScroll]);

  const handleToggle = () => {
    setShowMenu(!showMenu);
  };
  
    return (
      <>
        <div
          className={cn(
            'fixed inset-0 z-30 flex h-20 select-none items-center justify-between overflow-y-visible bg-transparent px-6 text-white transition-all duration-300 xl:px-16',
            { 'opacity-0': !isNavDown },
            { 'bg-white bg-opacity-90 shadow-bottom': withBg || isNavBellow() },
            { 'bg-black': variant === 'dark' },
          )}
        >
          <Link href={'/'}>
            <Image 
              src={logo.logo ?? null}
              alt={logo.alt || 'Mormor&jag Logo'}
              width={200 / 1.1}
              height={36 / 1.1}
              className='max-w-[130px] md:max-w-none'
            />
          </Link>
          <Button
            onClick={handleToggle}
            className={cn(
              'fixed right-6 top-10 z-99 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center gap-1 p-0 transition-opacity duration-300 hover:bg-grey xl:right-16 bg-annika-pink text-annika-blue hover:bg-annika-cream',
              { 'bg-transparent hover:bg-transparent': !withBg && !isNavBellow() },
              { 'cursor-default opacity-0': !isNavDown },
            )}
            disabled={!isNavDown}
            variant={'empty'}
            aria-label='Open navigation menu'
          >
            <div className={cn('hamburger-line', { 'line-1': showMenu })} />
            <div className={cn('hamburger-line', { 'line-2': showMenu })} />
            <div className={cn('hamburger-line', { 'line-3': showMenu })} />
          </Button>
        </div>
        {showMenu && (
        <div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
         
          {pageLinks.map((link, index) => (
          <div
            key={link.path}
            className={cn('transition-colors duration-300', {
              'text-zinc-500': index !== linkIndex && linkIndex !== null,
            })}
            
          >
            <Link href={link.path}>
              <p
                onClick={handleToggle}
                className={'py-2 text-end text-xl font-medium uppercase text-annika-pink hover:text-annika-blue'}                           
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