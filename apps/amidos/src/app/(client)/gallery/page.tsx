'use client'
import { useState } from 'react';
 
export default function Home() {
    const [selectedImage, setSelectedImage] = useState("/restaurant/1.png");
    const images = [
        "/restaurant/1.png",
        "/restaurant/2.png",
        "/restaurant/3.png",
        "/restaurant/4.png",
        "/restaurant/5.png"
    ];
 
    return (
        <div className="m-auto w-[1000px] pb-10">
            {/* Selected Picture Section */}
            <h1 className='text-5xl font-bold text-gray-600'>AMIDO'S GALLERY</h1>
            <h1 className='text-lg font-bold pb-10 text-gray-600'>Амтат хоол тав тухтай орчин таныг хүлээж байна </h1>
            <div className="mb-4">
                <img className="h-[670px] max-w-full rounded-lg" src={selectedImage} alt="Selected Restaurant" />
            </div>
 
            {/* Thumbnail Images */}
            <div className="grid grid-cols-5 gap-4">
                {images.map((src, index) => (
                    <div key={index} onClick={() => setSelectedImage(src)} className="cursor-pointer">
                        <img className="h-36 max-w-full rounded-lg" src={src} alt={`Restaurant ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
 