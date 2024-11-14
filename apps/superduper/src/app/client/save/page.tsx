'use client';

import { ProductItem } from '@/app/components/productItem';
import '@/app/styles.css';
import { ProductType } from '@/components/productType';
import { useContext, useEffect, useState } from 'react';
import { RealtimeNotif } from '../layout';

export default function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isClick, setClick] = useState(false);
  const value = useContext(RealtimeNotif);

  useEffect(() => {
    const storage = localStorage.getItem('favourites');
    if (storage) {
      value?.setFavourite(JSON.parse(storage));
    }
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        body: JSON.stringify({
          searchValue: value?.searchValue,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();

      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFavourite = (productId: string) => {
    let result: string[] = [];
    if (value?.favourite) result = [...value.favourite];
    if (result.find((id) => id === productId)) {
      result = result.filter((id) => id !== productId);
      setClick(false);
    } else {
      result.push(productId);
      setClick(true);
    }
    localStorage.setItem('favourites', JSON.stringify(result));
    value?.setFavourite(result);
  };

  if (!products.length)
    return (
      <div className="text-3xl min-h-screen  font-bold ">
        <div className="flex gap-1 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="loader">
            <div className="loader-bar bar-1"></div>
            <div className="loader-bar bar-2"></div>
            <div className="loader-bar bar-3"></div>
            <div className="loader-bar bar-4"></div>
          </div>
          <div className="">Ачаалж байна...</div>
        </div>
      </div>
    );
  if (!value?.favourite.length)
    return (
      <div className="text-3xl font-bold min-h-screen">
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">Хадгалсан бараа байхгүй байна.</div>
      </div>
    );
  return (
    <div className="grid grid-cols-3 gap-10 mt-[30px] w-full" id="rooter">
      {products
        .filter((item) => value.favourite.includes(item._id))
        .slice(0, 20)
        .map((product) => (
          <ProductItem isClick={isClick} product={product} favourite={value?.favourite || []} key={product._id} onClickFavourite={() => handleFavourite(product._id)} />
        ))}
    </div>
  );
}
