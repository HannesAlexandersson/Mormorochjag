'use client'

import { useContext, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button/Button';

import useEventListener from '@/hooks/useEventListener'
import { cn, isBrowser } from '@/lib/utils'
import { MenuContext } from '@/context/menuProvider'

interface NavbarProps {
    withBg?: boolean;
    variant?: string;
  }
  
  const Navbar: React.FC<NavbarProps> = ({ withBg = true, variant = 'light' }) => {
    const context = useContext(MenuContext);
  
    if (!context) {
      // Handle the case where the context is undefined
      throw new Error('MenuContext must be used within a MenuContextProvider');
    }
  
    const { showMenu, toggle } = context;
  const [isNavDown, setIsNavDown] = useState(true)
  const [scrollPos, setScrollPos] = useState(0)

  const isNavBellow = () => {
    if (!isBrowser()) return false

    return isNavDown && scrollPos > window.innerHeight / 3
  }

  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === 'Escape' && showMenu) {
      ev.preventDefault()
      toggle(false)
    }
  }

  const handleScroll = () => {
    const { scrollY } = window
    const isScrollingDown = scrollY > scrollPos
    const isScrollingUp = scrollY < scrollPos
    const isPastThreshold = Math.abs(scrollY - scrollPos) > 5
    const isPastScreenThird = scrollPos > window.innerHeight / 3 - 50

    if (isNavDown && isPastScreenThird && isScrollingDown && isPastThreshold) {
      setIsNavDown(false)
      if (showMenu) toggle(false)
    }

    if (isScrollingUp && isPastThreshold && !isNavDown) {
      setIsNavDown(true)
    }

    setScrollPos(scrollY)
  }

  const handleToggle = () => {
    if (!isNavDown) return
    toggle(!showMenu)
  }

  useEventListener('keydown', handleKeyDown)
  useEventListener('scroll', handleScroll)



    return (
        <>
          <nav
            className={cn(
              'fixed inset-0 z-30 flex h-20 select-none items-center justify-between overflow-y-visible bg-transparent px-6 text-white transition-all duration-300 xl:px-16',
              { 'opacity-0': !isNavDown },
              { 'bg-white shadow-bottom': withBg || isNavBellow() },
              { 'bg-black': variant === 'dark' },
            )}
          >
            <Link href={'/'}>
            {variant === 'dark' ? (
              <Image 
                src={'/images/krogare_logo_vit_text_500_X_90.png'}
                alt='Svenska krögares logga med vit text'
                width={200 / 1.1}
                height={36 / 1.1}
                className='max-w-[130px] md:max-w-none'
              />
            ) : (
              <Image
                src={'/images/krogare_logo_200_X_36.png'}
                alt='Svenska krögares logga med svart text'
                width={200 / 1.1}
                height={36 / 1.1}
                className='max-w-[130px] md:max-w-none'
              />
            )}
              
            </Link>
            <div className='flex gap-4'>
              <Button
                variant={
                  (!withBg && !isNavBellow()) || (withBg && variant === 'dark')
                    ? 'outlined-secondary'
                    : 'outlined-primary'
                }
                size={'sm'}
                asChild
                aria-label='Open membership menu'
              >
                {isNavDown ? (
                  <Link href={'/medlemskap#member-form'}>Bli medlem</Link>
                ) : (
                  <span>Bli medlem</span>
                )}
              </Button>
              <div className='h-10 w-10' />
            </div>
          </nav>
          <Button
            onClick={handleToggle}
            className={cn(
              'fixed right-6 top-10 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center gap-1 p-0 transition-opacity duration-300 hover:bg-black xl:right-16',
              { 'bg-transparent hover:bg-transparent': !withBg && !isNavBellow() },
              { 'cursor-default opacity-0': !isNavDown },
            )}
            disabled={!isNavDown}
            variant={'primary'}
            aria-label='Open navigation menu'
          >
            <div className={cn('hamburger-line', { 'line-1': showMenu })} />
            <div className={cn('hamburger-line', { 'line-2': showMenu })} />
            <div className={cn('hamburger-line', { 'line-3': showMenu })} />
          </Button>
        </>
      )
    }


export default Navbar;