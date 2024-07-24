import { groq, createClient } from "next-sanity";


export const client = createClient({
    projectId: "i8zm0npp",
    dataset: "production",        
    apiVersion: "2024-07-19",
});

/* TEST QUERY */
export async function getData(){ 
   
    return client.fetch(
        groq`*[_type == "keramik"]{
            _id,
            title,
            description,
            "slug": slug.current,
            "image": image.asset->url,
           "imageAlt": image.alt,
        }`
    );    
}
/* NAVBAR QUERY */
export async function getNavbarLogo(){ 
   
    return client.fetch(
        groq`*[_type == "navbarLogo"]{  
            title, 
            "logo": logo.asset->url,
                "alt": logo.alt                
            }`
    );    
}

/* HERO QUERY */
export async function getHero(){

    return client.fetch(
        groq`*[_type == "heroSection"]{  
        title, 
        "DesktopImg": backgroundImage.asset->url,        
        "alt": backgroundImage.alt,       
        }`
    );
}

export async function getLandingPage(){
    return client.fetch(
        groq`*[_type == "landingPageTextsections"]{  
            title, 
            paragraph,
            position,
            "image": image.asset->url,       
        }`
    );
    
}

export async function getTrippleImage(){

    return client.fetch(
        groq`*[_type == "trippleImage"]{            
            "image1": image1.asset->url,
              "alt1": image1.alt,
            "image2": image2.asset->url,
              "alt2": image2.alt,
            "image3": image3.asset->url,
              "alt3": image3.alt,
        }`
    );
}

export async function getContactPage(){

    return client.fetch(
        groq`*[_type == "contactPage"]{
        title,
        description,
        position,
        "imageUrl": *[_type == "contactPageImages" && references(^._id)]{
            "imageUrl": Image.asset->url
        }[0].imageUrl
        } | order(position asc)`
    );
}

export async function getSocial(){
    return client.fetch(
        groq`*[_type == "social"]{  
            title, 
            "icon": icon.asset->url,
            "alt": icon.alt,       
        }`
    );
}

export async function getFooter(){
    return client.fetch(
        groq`*[_type == "logo" && _id == "2a447dc6-9bd1-48cf-9054-4ace9091233e"]{
            title,
            "logo": logo.asset->url,
            "altText": logo.alt
            }`
    );
}