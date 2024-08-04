"use client";

import { useState } from 'react';
import Image from 'next/image';
import ObjectCard from '../ObjectCard/ObjectCard';

interface ObjectData {
  title: string;
  description: string;
  image: string;
  price: number;
  slug: string;
  _id: string;
  position: number;
}

export default function ObjectCardList({ objects }: { objects: ObjectData[] }) {
  const [selectedImage, setSelectedImage] = useState<string>('');

  function openModal(image: string) {
    setSelectedImage(image);
  }

  function closeModal() {
    setSelectedImage('');
  }

  return (
    
    <div className="w-full flex flex-wrap gap-6 justify-evenly">

      
        {objects.map((object) => (
          <div key={object._id} onClick={() => openModal(object.image)} className="flex flex-col md:flex-row gap-6 bg-annika-cream shadow-md shadow-slate-600 w-full md:w-2/5 cursor-pointer ">
            <div 
                className="w-full md:w-1/2 h-96 bg-center bg-cover bg-no-repeat" 
                style={{ backgroundImage: `url('${object.image}')` }}
            ></div>
            <div className="w-full md:w-1/2 flex flex-col items-start justify-start p-3">
                <h3 className="text-3xl underline underline-offset-4 py-2">{object.title}</h3>
                <p className="text-lg md:text-2xl ">{object.description}</p>
                {object.price && <p className="text-lg md:text-2xl">{object.price} kr</p>}                
            </div>
        </div>
        ))}
     

      {selectedImage && (
        <div className="fixed inset-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-70" onClick={closeModal}>
          <div className="flex items-center justify-center relative w-[75%] h-[80%]  p-4 bg-white rounded shadow-lg">
            <button onClick={closeModal} className="absolute top-0 right-0 m-2 text-gray-600 text-2xl">
              &times;
            </button>
            <div className='flex justify-center items-center w-full h-full p-2'>
              <Image
                src={selectedImage}
                alt="Selected object image"
                fill={true}  
                style={{objectFit: "contain"}}
                priority={true}       
                className='rounded-lg p-2'
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}