'use client';
import { RealtimeNotif } from '@/app/client/layout';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

const colors = ['#C7A881', '#A3CC86', '#639AC6', '#A4AF8B', '#A2938F', '#D5D3E1', '#B0EADF', '#F3CDDB', '#CCECFF', '#AABAC7'];

type CategoriesType = {
  category: string;
  image: string;
  _id: string;
};

export function Categories() {
  const value = useContext(RealtimeNotif);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [category, setCategory] = useState<CategoriesType[]>([]);

  // Fetch categories
  const fetchCategories = async () => {
    const response = await fetch('http://localhost:3000/api/categories');
    const data = await response.json();
    setCategory(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={`${value?.showCategory ? 'bottom-0 top-[10%]' : '-bottom-full top-[100%]'} fixed overflow-y-scroll transition-[10s] h-full pb-28 bg-white left-0 z-20 right-0`}>
      <div className="max-w-[1280px] mx-auto py-8 text-[#000000]">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-semibold tracking-wide text-gray-900">Ангилалууд</div>
          <X className="cursor-pointer text-2xl hover:text-gray-600" onClick={() => value?.setShowCategory(false)} />
        </div>

        <div className="grid grid-cols-3 gap-6 mt-5 text-xl">
          {category.map((category, index) => (
            <Link
              href={`/client/filterbycategories/${category._id}`}
              style={{ backgroundColor: colors[index % colors.length] }}
              className="flex p-6 aspect-video rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => {
                setSelectedCategory(category.category);
                value?.setShowCategory(false);
              }}
              key={category._id}
            >
              <div className="w-[60%] text-2xl font-medium text-gray-800 truncate text">{category.category}</div>
              <div className="w-[40%]">
                <Image
                  src={category.image}
                  alt={category.category}
                  width={400}
                  height={500}
                  className="w-full h-full rounded-full object-cover transition-transform duration-300 transform hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
