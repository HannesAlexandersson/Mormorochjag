import { groq } from "next-sanity";


export const getLandingPage =  groq`*[_type == "landingPageTextsections"]{
    title,
    paragraph,
    position,
    "image": image.asset->url,
      "alt": image.alt,
    "trippleImages": *[_type == "trippleImage" && references(^._id)]{
      "image1": image1.asset->url,
      "alt1": image1.alt,
      "image2": image2.asset->url,
      "alt2": image2.alt,
      "image3": image3.asset->url,
      "alt3": image3.alt
    }
  } | order(position asc)`;
   
  
  export const getTrippleImage =
          groq`*[_type == "trippleImage"]{            
              "image1": image1.asset->url,
                "alt1": image1.alt,
              "image2": image2.asset->url,
                "alt2": image2.alt,
              "image3": image3.asset->url,
                "alt3": image3.alt,
          }`;
  
  export const getContactPage =
          groq`*[_type == "contactPage"]{
          title,
          description,
          position,
          "imageUrl": *[_type == "contactPageImages" && references(^._id)]{
              "imageUrl": Image.asset->url
          }[0].imageUrl
          } | order(position asc)`;
  
  export const getSocial =
          groq`*[_type == "social"]{  
              title, 
              "icon": icon.asset->url,
              "alt": icon.alt,       
          }`;
  
  export const getFooter =
          groq`*[_type == "logo" && _id == "2a447dc6-9bd1-48cf-9054-4ace9091233e"]{
              title,
              "logo": logo.asset->url,
              "altText": logo.alt
              }`;

    export const getHero = groq`*[_type == "heroSection"]{  
    title, 
    "DesktopImg": backgroundImage.asset->url,        
    "alt": backgroundImage.alt,       
    }`;

   
/* NAVBAR QUERY */
export const getNavbarLogo =
        groq`*[_type == "navbarLogo"]{  
            title, 
            "logo": logo.asset->url,
            "alt": logo.alt                
            }`;

export const getBlogPosts = groq`*[_type == "blogPost"]{
    title,
    "slug": slug.current,
     "authorId": author._ref,
    "image": coverImage.asset->url,
    publishedAt,
    excerpt,
    "author": author->name,
    content,
  } | order(publishedAt desc)`;

export const getBlogPageTextSections = groq`*[_type == "blogPageTextSections"]{
    title,
    text,
    position
  } | order(position asc)`;

export const getGalleryCat = groq`*[_type == "galleryCategories"]{
  categoryName,
    categoryDescription,
    "bgImage": categoryImage.asset->url,
      "id": _id,
    "slug": slug.current,
}`;

export const getGalleryTextSections = groq`*[_type == "galleryTextsections"]{
    title,
    text,
    position
  } | order(position asc)`;


export const getStorePageTextSections = groq`*[_type == "storePageTextsections"]{  
  title,
 text,
    position,
} | order(position asc)`;

export const getKeramikCategory = groq`*[_type == "kermaikCategory"]{ 
  _id,
  title,
   "slug": slug.current,
    description,
    "image": image.asset->url,
      "alt": image.alt,
} | order(asc)`;

export const getTextilCategory = groq`*[_type == "textilCategory"]{ 
  _id,
  title,
   "slug": slug.current,
    description,
    "image": image.asset->url,
      "alt": image.alt,
} | order(asc)`;

export const getKeramikObject = groq`*[_type == "keramikObject" && slug.current == $slug]{
  title,
  description,
  price,
  "image": image.asset->url,
    "alt": image.alt,
    }
`;

export const socials = groq`*[_type == "contactInfo"]{  
  email,
  "socialMedia": socialMedia[]{
    platform,
    link,
    icon,
  }
}`;

export const getFullPost = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  "authorId": author._ref,
  "image": coverImage.asset->url,
  publishedAt,
  "author": author->name,
  content
}`;

export const getGalleryPageObjects = groq`*[_type == "gallery" && category._ref == $categoryId]{
            title,
            description,
            "image": images.asset->url,
        }`;