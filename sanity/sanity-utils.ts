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
            "Image1": image1.asset->url,
            "Image2": image1.asset->url,
            "Image3": image1.asset->url,
        }`
    );
}