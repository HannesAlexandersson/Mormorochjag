import Image from "next/image";
import { getData } from "@/sanity/sanity-utils";

interface Pottery {
  _id: string;
  title: string;
  image: string;
  imageAlt: string;
  description: string;
}


export default async function Home() {
 
  const data = await getData();
  
  return (
    <>
      <h1>Mormor och Jag</h1>

     <ul>
        {data.map((pottery:Pottery) => (
          <li key={pottery._id}>
            <h2>{pottery.title}</h2>
            <Image src={pottery.image} alt={pottery.imageAlt} width={200} height={200} />
            <p>{pottery.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
