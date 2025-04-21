import { sanityFetch } from '@/sanity/client'
import { redirect } from 'next/navigation'

import Link from 'next/link'
import Button from '@/app/components/Button/Button'
import { groq } from 'next-sanity'
import { MailQuestion } from 'lucide-react'
import Hero, { HeroData } from '@/app/components/Hero/Hero'
import ObjectCard from '@/app/components/ObjectCard/ObjectCard'
import ObjectCardList from '@/app/components/ObjectCardList/ObjectCardList'

interface categoryIdData {
  title: string
  id: string
  image: {
    _type: string
    alt?: string
    crop?: any
    hotspot?: any
    asset: {
      _ref: string
      _id?: string
      url?: string
    }
  }
}

interface Params {
  slug: string
}

/* interface categoryIdData {
    title: string;
    id: string;
    image: string;
}
 */
interface TextilObjectData {
  title: string
  description: string
  image: string
  price: number
  slug: string
  _id: string
  position: number
}

interface PageProps {
  params: Params
}

interface CategoryData {
  _id: string
  title: string
  slug: string
}

export const generateMetadata = async ({ params }: { params: Params }) => {
  let object = params.slug.split('-').join(' ')
  const first = object.charAt(0)
  object = object.replace(first, first.toUpperCase())

  return {
    title: `Object | ${object}`,
  }
}

const TextilObject: React.FC<PageProps> = async ({
  params,
}: {
  params: Params
}) => {
  const textilCategories = await sanityFetch<CategoryData[]>({
    query: groq`*[_type == "textilCategory"]{
          _id,
          title,
          "slug": slug.current
        }`,
  })

  const slug = params.slug
  const categoryData = await sanityFetch<categoryIdData>({
    query: groq`*[_type == "textilCategory" && slug.current == $slug][0] {
                    title,
                    "id": _id,
                     image {
                        ...,
                        asset-> {
                            _ref,
                            _id,
                            url
                        }
                    }
                }
                `,
    params: { slug },
  })

  const categoryId = categoryData.id

  const textilObjects = await sanityFetch<TextilObjectData[]>({
    query: groq`*[_type == "textil" && category._ref == $categoryId]{
                    title,
                    description,
                    "image": image.asset->url,
                    price,
                    "slug": slug.current,
                    _id,
                    position,
                } | order(position asc, title asc)`,
    params: { categoryId },
  })

  if (textilObjects.length === 0) {
    alert('Inga produkter hittades, du kommer att skickas tillbaka till textil')
    redirect('/store/textil')
  }
  let formattedSlug = slug.split('-').join(' ')
  const first = formattedSlug.charAt(0)
  formattedSlug = formattedSlug.replace(first, first.toUpperCase())

  const customHero: HeroData = {
    title: categoryData.title,
    backgroundImage: {
      ...categoryData.image,
      alt: categoryData.image.alt || formattedSlug,
    },
  }

  return (
    <>
      <main>
        <Hero hero={customHero} isLanding={false} />

        <section className='section-contain my-16 flex h-auto w-full flex-col md:my-32'>
          {textilCategories && (
            <div className='flex flex-row flex-wrap items-center justify-center gap-3 py-6 md:gap-6 md:py-12'>
              {textilCategories.map(section => (
                <Link key={section._id} href={`/store/textil/${section.slug}`}>
                  {slug === section.slug ? (
                    <div className='h-18 flex min-w-20 flex-1 items-center justify-center rounded-md bg-cover bg-center bg-no-repeat shadow-lg shadow-gray-600 ring-2 md:h-28 md:w-28 md:min-w-max'>
                      <p className='p-1 text-2xl text-annika-orange'>
                        {section.title}
                      </p>
                    </div>
                  ) : (
                    <div className='h-18 flex min-w-20 flex-1 items-center justify-center rounded-md bg-cover bg-center bg-no-repeat shadow-lg shadow-gray-600 md:h-28 md:w-28 md:min-w-max'>
                      <p className='px-2 text-2xl text-annika-orange md:p-1'>
                        {section.title}
                      </p>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}

          <ObjectCardList objects={textilObjects} />
        </section>

        <section className='section-contain my-8 flex flex-col md:my-16'>
          <div className='flex w-full items-center justify-center gap-4'>
            <Link href='/store/textil'>
              <Button variant='primary' className='w-full sm:w-fit'>
                Tillbaka
              </Button>
            </Link>
            <Link href='/store/keramik'>
              <Button variant='primary' className='w-full sm:w-fit'>
                Besök keramik
              </Button>
            </Link>
          </div>
        </section>

        <section className='section-contain my-8 flex flex-col md:my-16'>
          <div className='flex w-full items-center justify-center gap-2'>
            <p className='text-2xl'>
              Ser du något du gillar? Tveka inte att slänga iväg ett mail{' '}
            </p>
            <Link href='mailto:annikaalexanderson@hotmail.com'>
              <MailQuestion size={38} />{' '}
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default TextilObject
