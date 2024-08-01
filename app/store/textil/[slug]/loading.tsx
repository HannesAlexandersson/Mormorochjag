import { NavbarSkeleton } from '@/app/components/Navbar/Navbar'
import { PageTitleSkeleton } from '@/app/components/Skeleton/Header-Skeleton'
import Skeleton from '@/app/components/Skeleton/Skeleton'
import { HeroSkeleton } from '@/app/components/Hero/Hero'


const loading = () => {
  return (
    <>
      <NavbarSkeleton />
      <HeroSkeleton />
      <main className='section-contain min-h-screen pt-20'>
        <PageTitleSkeleton />
        <p className={'my-16 md:my-32'}>
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} />
          ))}
        </p>
        <section className='flex flex-col gap-16'>
          <Skeleton className={'h-32'} />
          <Skeleton className={'h-32'} />
          <Skeleton className={'h-32'} />
          <Skeleton className={'h-32'} />
        </section>
      </main>
    </>
  )
}

export default loading