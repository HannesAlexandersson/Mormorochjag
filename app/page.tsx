import Image from "next/image";
import { getPottery } from "@/sanity/sanity-utils";

export default async function Home() {
  const potterys = await getPottery();
  return (
    <>
      <h1>Mormor och Jag</h1>

      <ul>
        {potterys.map((pottery) => (
          <li key={pottery._id}>
            <h2>{pottery.name}</h2>
            <Image src={pottery.image} alt={pottery.name} width={200} height={200} />
            <p>{pottery.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
