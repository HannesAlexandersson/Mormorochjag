
import Button from '@/app/components/Button/Button'
import Navbar from '@/app/components/Navbar/Navbar'
import { OctagonX } from 'lucide-react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <>
      <Navbar />
      <main className='section-contain min-h-screen pt-20'>
        <h1>404 page not found</h1>
        <section className='mx-auto flex max-w-[500px] flex-col items-center gap-4 py-16 md:py-32'>
          <OctagonX size={200} />
          <h2>Sidan kunde inte hittas</h2>
          <Button variant='primary' className='mt-8 w-full text-center'>
            <Link href={'/'}>Gå tillbaka hem</Link>
          </Button>
        </section>
      </main>
    </>
  )
}

export default NotFound