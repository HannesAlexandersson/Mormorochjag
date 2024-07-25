import React from 'react';
import Image from 'next/image';
import Button from '../Button/Button';
import Link from 'next/link';

export interface HeroData {
    title: string;
    DesktopImg: string;
    alt: string;    
  }
  
  export interface HeroProps {
    hero: HeroData;
    isLanding?: boolean;
  }

const Hero: React.FC<HeroProps> = ({ hero, isLanding }) => { 
  
    return (
      <section className='relative h-screen bg-black/30 object-cover'>
        <Image
          className='absolute -z-10'
          src={hero.DesktopImg}
          alt={hero.alt || 'Hero image'}          
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
          priority={true}
        />
        <div className='mx-auto flex h-full max-w-[1440px] items-end justify-center px-6 pb-24 sm:items-center sm:pb-0 sm:pt-24'>
          <div className='flex flex-col items-center gap-12 text-center text-annika-pink'>
            <div className='flex flex-col items-center gap-2 md:gap-4'>
              <h1 className='text-4xl sm:text-5xl lg:text-8xl'>{hero.title}</h1>
            </div>
            {isLanding && (
            <Button
            className='w-full sm:w-fit'
            variant='outlined-secondary'
            >
                <Link href='#'>Besök galleriet</Link>
            </Button>
            )}
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;