'use client';

import '@/app/styles.css';
import { Category } from '@/components/CategoryType';
import { DialogComponent } from '@/components/Dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategory = async () => {
    const response = await fetch('/api/categories');
    const data = await response.json();
    setCategories(data);
  };
  const saveCategory = (categoryId: string) => {
    const addProductObject = JSON.parse(localStorage.getItem('addProduct') || '{}');

    addProductObject.categoryId = categoryId;
    localStorage.setItem('addProduct', JSON.stringify(addProductObject));
    router.push('/client/addProducts/2');
  };
  useEffect(() => {
    loadCategory();
  }, []);
  if (!categories.length)
    return (
      <div className="min-h-screen">
        <div className=" absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] items-center flex">
          <div className="loader">
            <div className="loader-bar bar-1"></div>
            <div className="loader-bar bar-2"></div>
            <div className="loader-bar bar-3"></div>
            <div className="loader-bar bar-4"></div>
          </div>

          <div className="font-bold text-3xl">Ачаалж байна...</div>
        </div>
      </div>
    );
  return (
    <div className="max-w-[50%] mx-auto mt-10">
      <div className="flex flex-col gap-1 max-w-[500px] mx-auto text-2xl">
        <div className="flex gap-2 items-center justify-center w-full text-[#00253e]">
          <div className="p-0.5 border-2 border-[#00253e] rounded-full">
            <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
          </div>
          <div className="bg-[#f3f3f3] h-0.5 w-[100px]"></div>
          <div className="p-0.5 rounded-full">
            <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
          </div>
          <div className="bg-[#f3f3f3] h-0.5 w-[100px]"></div>
          <div className="p-0.5 rounded-full">
            <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
          </div>
          <div className="bg-[#f3f3f3] h-0.5 w-[100px]"></div>
          <div className="p-0.5 rounded-full">
            <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
          </div>
          <div className="bg-[#f3f3f3] h-0.5 w-[100px]"></div>
          <div className="p-0.5 rounded-full">
            <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
          </div>
        </div>

        <div className="flex gap-5 relative left-[-50px] items-center">
          <div>Ангилал</div>
          <div className="text-[#f3f3f3]">Дэлгэрэнгүй</div>
          <div className="text-[#f3f3f3]">Зураг</div>
          <div className="text-[#f3f3f3] ml-3">Логистик</div>
          <div className="text-[#f3f3f3] ml-5">Хянан үзэх</div>
        </div>
      </div>
      <div className="mt-8 text-center text-[#333] text-[48px]">Ангилалаа сонгоно уу</div>

      <div className="text-[#aeaeae] w-full text-3xl">
        <div className="flex gap-2 items-center py-8">
          <div>
            <ChevronLeft className="w-10 h-10" />
          </div>
          <div>Ангилалууд</div>
        </div>
        <div>
          {categories.map((category, index) => (
            <div key={category._id} className="flex justify-between py-6 border-b-[1px]">
              <div onClick={() => saveCategory(category._id)} className="flex gap-2 text-black text-3xl hover:gap-1 hover:cursor-pointer items-center">
                <div>
                  <ChevronRight className="w-10 h-10" />
                </div>
                <div>{category.category}</div>
              </div>
              <div className="hover:cursor-pointer">
                <Image
                  onClick={() => {
                    setOpen(true);
                    setCategory(category);
                  }}
                  src={category.image || '/'}
                  alt="image"
                  width={500}
                  height={500}
                  className="w-10 h-10"
                />
              </div>
            </div>
          ))}
          <DialogComponent category={category} open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
}
