import { sanityFetch } from '@/sanity/client'
import Link from 'next/link'
import Hero, { HeroData } from '@/app/components/Hero/Hero'
import { groq } from 'next-sanity'
import { getStorePageTextSections } from '@/sanity/querys'

interface StoreData {
  title: string
  text: string
  position: number
}
;[]

interface buttonData {
  sectionTitle: string
  buttonImage: string
  alt: string
}

const Store = async () => {
  const heroData = await sanityFetch<HeroData[]>({
    query: groq`*[_type == "heroSection" && _id == "3b46a36d-3bf4-469a-9e01-82a5b7bc6bfa"]{             
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

  const storeData = await sanityFetch<StoreData[]>({
    query: getStorePageTextSections,
  })

  const buttonData = await sanityFetch<buttonData[]>({
    query: groq`*[_type == "buttonImages"]{             
            sectionTitle,
            "buttonImage": buttonImage.asset->url,
              "alt": buttonImage.alt,
          }`,
  })

  const keramikBg = buttonData[0].buttonImage
  const textilBg = buttonData[1].buttonImage

  return (
    <>
      <main>
        {heroData[0] ? (
          <Hero hero={heroData[0]} isLanding={false} />
        ) : (
          <h1>Loading hero...</h1>
        )}

        <section className='section-contain my-16 flex h-auto w-full flex-col md:my-32'>
          {storeData.map((section, index) => (
            <div
              key={index}
              className='flex w-full flex-col items-start justify-start py-6 md:w-1/2'
            >
              <h2 className='py-2 text-3xl underline underline-offset-4'>
                {section.title}
              </h2>
              <p>{section.text}</p>
            </div>
          ))}
        </section>

        <section className='section-contain my-8 flex flex-col md:my-16'>
          <div className='flex w-full flex-col items-center justify-center gap-6 md:flex-row'>
            <Link className='w-2/3 flex-1' href='/store/keramik'>
              <div
                className='flex h-48 w-full flex-1 items-center justify-center rounded-md bg-cover bg-center bg-no-repeat shadow-lg shadow-gray-600'
                style={{ backgroundImage: `url(${keramikBg})` }}
              >
                <p className='text-2xl text-annika-orange'>Keramik</p>
              </div>
            </Link>

            <Link className='w-2/3 flex-1' href='/store/textil'>
              <div
                className='flex h-48 w-full flex-1 items-center justify-center rounded-md bg-cover bg-center bg-no-repeat shadow-lg shadow-gray-600'
                style={{ backgroundImage: `url(${textilBg})` }}
              >
                <p className='text-2xl text-annika-orange'>Stickat/virkat</p>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
export default Store
