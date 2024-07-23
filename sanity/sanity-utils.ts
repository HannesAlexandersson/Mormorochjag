import { createClient, groq } from "next-sanity";

export async function getPottery(){

    const client = createClient({
        projectId: "i8zm0npp",
        dataset: "production",        
        apiVersion: "2024-07-19",
    });
    
    return client.fetch(
        groq`*[_type == "keramik"]{
        _id,
        _createdAt,
        name,
        "slug": slug.current,
        "image": image.asset->url,        
        }`
    );    
}