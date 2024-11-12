'use client';
import { RealtimeNotif } from '@/app/client/layout';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

// type category = {
//   category: string;
//   _id: string;
// };

// export default function Page() {
//   const [category, setCategory] = useState<category[]>([]);

//   async function cat() {
//     try {
//       const response = await fetch('/api/categories');
//       const data = await response.json();
//       setCategory(data);
//     } catch (error) {
//       console.log('error');
//     }
//   }

//   useEffect(() => {
//     cat();
//   }, []);

const categoryFilter = [
  { value: 'Электроник', name: 'Электроник' },
  { value: 'Урлаг ба цуглуулга', name: 'Урлаг ба цуглуулга' },
  { value: 'Загвар ба дагалдах хэрэгсэл', name: 'Загвар ба дагалдах хэрэгсэл' },
  { value: 'Үнэт эдлэл ба цаг', name: 'Үнэт эдлэл ба цаг' },
  { value: 'Aвтомашинууд', name: 'Aвтомашинууд' },
  { value: 'Үл хөдлөх хөрөнгө', name: 'Үл хөдлөх хөрөнгө' },
  { value: 'Тавилга ба гэрийн чимэглэл', name: 'Тавилга ба гэрийн чимэглэл' },
  { value: 'Спортын дурсгалт зүйлс', name: 'Спортын дурсгалт зүйлс' },
  { value: 'Ном ба гар бичмэл', name: 'Ном ба гар бичмэл' },
];
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

  async function Categories() {
    const response = await fetch(`http://localhost:3000/api/categories`);
    const data = await response.json();
    setCategory(data);
  }
  useEffect(() => {
    Categories();
  }, []);

  return (
    <div className={`${value?.showCategory ? 'bottom-0 top-[15%] ' : ''} fixed -bottom-full overflow-y-scroll h-full pb-28 ease-in-out bg-white left-0 z-20 right-0`}>
      <div className="max-w-[1280px] mx-auto py-8 text-[#000000]">
        <div className="flex justify-between items-center">
          <div className="text-2xl">Ангилалууд</div>
          <X className="cursor-pointer" onClick={() => value?.setShowCategory(false)} />
        </div>
        <div className="grid grid-cols-3 gap-6 mt-5 text-xl">
          {category.map((category, index) => (
            <Link
              href={`/client/filterbycategories/${category._id}`}
              style={{ backgroundColor: colors[index] }}
              className={`flex text-wrap p-4 aspect-video`}
              onClick={() => {
                setSelectedCategory(category.category);
                value?.setShowCategory(false);
              }}
              key={category._id}
            >
              <div className="w-[60%]">{category.category}</div>
              <div className="w-[40%]">
                <Image src={category.image} alt="image" width={400} height={500} className="w-full h-full rounded-full object-cover" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
