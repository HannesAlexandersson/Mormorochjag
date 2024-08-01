'use client'

import Button from '@/app/components/Button/Button'

import { OctagonX } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'




 
    export default function Error({
      error,
      reset,
    }: {
      error: Error & { digest?: string }
      reset: () => void
    }) {
      useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
      }, [error])
    return (
      <>
        
        <main className='section-contain mt-20 min-h-screen'>
          <h1>FEL</h1>
          <section className='mx-auto my-16 flex max-w-[500px] flex-col items-center gap-4 text-center md:my-32'>
            <OctagonX size={200} />
            <h3>Sidan kunde inte laddas</h3>
            <p className='text-center'>
              Ett fel uppstod och sidan laddades inte ordentligt. Testa att ladda
              om sidan med knappen eller återgå till startsidan.
            </p>
            <div className='mt-8 flex w-full flex-col gap-4 sm:flex-row'>
              <Button variant='primary' className='grow text-center'>
                <Link href={'/'}>Gå tillbaka hem</Link>
              </Button>
              <Button variant='primary' className={'grow'} onClick={() => reset()}>
                Ladda om sidan
              </Button>
            </div>
          </section>
        </main>
      </>
    )
  }

