'use client';

import { ProductType } from '@/components/productType';
import { ProfileAside } from '@/components/profileAside';
import { BackgroundGradient } from '@/components/ui/background-gradiant';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const search = useSearchParams();
  const queryValue = search.get('seller') || '';
  const loadProduct = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadProduct();
  }, []);
  return (
    <div className="min-h-screen bg-slate-200 flex gap-5">
      <ProfileAside queryValue={queryValue} />
      <div className="flex-1 bg-white px-4 py-8">
        <div className="flex mb-6">
          <div className="flex-1">Барааны тодорхойлолт</div>
          <div className="flex-1 flex justify-center">Төлөв</div>
          <div className="flex-1 text-center">Үйлдэл</div>
        </div>
        <div className="flex flex-col">
          {products.map((product) => (
            <div key={product._id} className="flex-1 py-4 border-t flex items-center">
              <div className="flex gap-2 items-center flex-1">
                <div>
                  <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                    <Image src={product.frontImage} alt="jordans" height={400} width={400} className="object-cover w-[150px] h-[150px]" />
                    <div className="flex flex-col gap-2">
                      <div>Улс: {product.Country}</div>
                      <div>Бүтээгдэхүүний нэр: {product.productName}</div>
                      <div>Ангилал: {product.category}</div>
                    </div>
                  </BackgroundGradient>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-1 max-w-[500px] mx-auto text-2xl">
                  <div className="flex gap-2 items-center justify-center w-full text-[#00253e]">
                    <div className="p-0.5 border-2 border-[#00253e] rounded-full">
                      <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
                    </div>
                    <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
                    <div className={`p-0.5 rounded-full ${product.status == 'denied' && 'border-2'}`}>
                      <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
                    </div>
                    <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
                    <div className="p-0.5 rounded-full">
                      <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
                    </div>
                    <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
                    <div className="p-0.5 rounded-full">
                      <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
                    </div>
                  </div>
                  <div className="flex gap-8 ml-4 items-center ">
                    <div>Хүлээн авсан</div>
                    {product.status == 'denied' && <div className="text-[#f3f3f3]">Хаагдсан</div>}
                    {product.status !== 'denied' && <div className="text-[#f3f3f3]">Хүлээн зөвшөөрсөн</div>}
                    {product.status !== 'denied' && <div className="text-[#f3f3f3]">Жагсаалтад орсон</div>}
                    {product.status !== 'denied' && <div className="text-[#f3f3f3]">Худалдсан</div>}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex justify-center">
                <Button>Дэлгэрэнгүй</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
