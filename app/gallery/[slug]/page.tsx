import Hero, { HeroData } from '@/app/components/Hero/Hero'
import { sanityFetch } from '@/sanity/client'
import Link from 'next/link'
import { groq } from 'next-sanity'
import { getGalleryPageObjects } from '@/sanity/querys'
import Button from '@/app/components/Button/Button'
import { title } from 'process'

interface GalleryObjectData {
  title: string
  description: string
  image: string
  _id?: string
}

interface Params {
  slug: string
}

interface PageProps {
  params: Params
}
interface categoryIdData {
  _id: string
  bgImage: string
}

interface CategoryData {
  categoryName: string
  categoryDescription: string
  bgImage: string
  id: string
  slug: string
}

const GalleryPage: React.FC<PageProps> = async ({
  params,
}: {
  params: Params
}) => {
  let object = params.slug.split('-').join(' ')
  const first = object.charAt(0)
  object = object.replace(first, first.toUpperCase())

  const slug = params.slug
  const categoryData = await sanityFetch<categoryIdData>({
    query: groq`*[_type == "galleryCategories" && slug.current == $slug][0]{
                _id,
                "bgImage": categoryImage.asset->url,
                }
                `,
    params: { slug },
  })

  const categoryId = categoryData._id

  const galeryObjects = await sanityFetch<GalleryObjectData[]>({
    query: getGalleryPageObjects,
    params: { categoryId },
  })

  const heroData = await sanityFetch<HeroData[]>({
    query: groq`*[_type == "heroSection" && _id == "2519f822-d060-4786-ac47-361fded5f4e3"]{             
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

  const getGalleryCat = groq`
  *[_type == "galleryCategories"]{
    categoryName,
    categoryDescription,
    "bgImage": categoryImage.asset->url,
    "id": _id,
    "slug": slug.current,
  }
`

  const galleryCategories = await sanityFetch<CategoryData[]>({
    query: getGalleryCat, // Use the same query here
  })

  return (
    <main>
      <Hero hero={heroData[0]} isLanding={false} />
      <section className='section-contain my-16 flex h-auto w-full flex-col md:my-32'>
        <div className='flex w-full flex-col items-start justify-start gap-1 py-6 md:w-1/2'>
          <h2 className='py-2 text-3xl underline underline-offset-4'>
            {object}
          </h2>
        </div>
        <section className='category-nav-section'>
          <div className='category-nav flex flex-row flex-wrap items-center justify-center gap-3 py-6 md:gap-6 md:py-12'>
            {galleryCategories.map(section => {
              const backgroundImage = section.bgImage // Direct access since we are already getting the URL
              return (
                <Link key={section.id} href={`/gallery/${section.slug}`}>
                  <div
                    className={`category-item h-18 flex min-w-20 flex-1 items-center justify-center rounded-md bg-cover bg-center bg-no-repeat shadow-lg shadow-gray-600 md:h-28 md:w-28 md:min-w-max ${slug === section.slug ? 'ring-2' : ''}`}
                    style={{
                      backgroundImage: backgroundImage
                        ? `url(${backgroundImage})`
                        : undefined,
                    }}
                  >
                    <p className='px-2 text-2xl text-annika-orange md:p-1'>
                      {section.categoryName}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
        <div className='flex w-full flex-col flex-wrap justify-center gap-6 md:flex-row'>
          {galeryObjects.map(object => (
            <div
              key={object._id}
              className='flex flex-col gap-6 bg-annika-cream shadow-md shadow-slate-600 md:w-2/5 md:flex-row'
            >
              <div
                className='h-96 w-full bg-cover bg-center bg-no-repeat md:w-1/2'
                style={{ backgroundImage: `url('${object.image}')` }}
              ></div>
              <div className='flex w-full flex-col items-start justify-start p-3 md:w-1/2'>
                <h3 className='py-2 text-4xl underline underline-offset-4'>
                  {object.title}
                </h3>
                <p className='text-2xl'>{object.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className='section-contain my-8 flex flex-col md:my-16'>
        <div className='flex w-full items-center justify-center'>
          <Link href='/gallery'>
            <Button variant='primary' className='w-full sm:w-fit'>
              Tillbaka
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}

export default GalleryPage
