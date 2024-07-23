import { groq, createClient } from "next-sanity";


export const client = createClient({
    projectId: "i8zm0npp",
    dataset: "production",        
    apiVersion: "2024-07-19",
});

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