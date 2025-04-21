import { groq } from 'next-sanity'
import { sanityFetch } from '@/sanity/client'
import urlFor from '@/lib/urlBuilder'
import Hero, { HeroData } from '@/app/components/Hero/Hero'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/app/components/Button/Button'
import { getTextilCategory } from '@/sanity/querys'

interface TextilCatData {
  _id: string
  title: string
  slug: string
  image: string
  buttonImage: {
    _type: string
    alt?: string
    crop?: any
    hotspot?: any
    asset: {
      _id: string
      _ref: string
      url: string
    }
  }
}

const Textil = async () => {
  const heroData = await sanityFetch<HeroData[]>({
    query: groq`*[_type == "heroSection" && _id == "103c5e21-f1bf-4e38-9439-ebb6b4e82524"]{             
            title,
             backgroundImage {
      ...,
      asset-> {
        _id,
        _ref,
        url
      }
    }
  }`,
  })

  const textilCatData = await sanityFetch<TextilCatData[]>({
    query: getTextilCategory,
  })

  return (
    <>
      <main>
        <Hero hero={heroData[0]} isLanding={false} />

        <section className='section-contain my-16 flex h-auto w-full flex-col md:my-32'>
          <div className='flex w-full flex-col gap-6 md:flex-row'>
            {textilCatData.map(section => (
              <Link key={section._id} href={`/store/textil/${section.slug}`}>
                <div className='relative flex h-48 min-w-max flex-1 items-center justify-center rounded-md shadow-lg shadow-gray-600 md:w-48'>
                  <Image
                    src={urlFor(section.buttonImage).url() || ''}
                    alt={
                      section.buttonImage.alt ||
                      section.title ||
                      'default alt text'
                    }
                    fill
                    className='object-cover'
                    priority
                  />
                  <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                    <p className='z-10 p-1 text-2xl text-annika-orange'>
                      {section.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className='section-contain my-8 flex flex-col md:my-16'>
          <div className='flex w-full items-center justify-center gap-4'>
            <Link href='/store'>
              <Button variant='primary' className='w-full sm:w-fit'>
                Tillbaka
              </Button>
            </Link>
            <Link href='/store/keramik'>
              <Button variant='primary' className='w-full sm:w-fit'>
                Besök Keramik
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
export default Textil
