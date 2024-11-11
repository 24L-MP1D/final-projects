'use client';

import { ProductItem } from '@/app/components/productItem';
import { ProductType } from '@/components/productType';
import { useContext, useEffect, useState } from 'react';
import { RealtimeNotif } from '../layout';

export default function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isClick, setClick] = useState(false);
  const value = useContext(RealtimeNotif);
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem('favourites');
    if (storage) {
      setFavourites(JSON.parse(storage));
    }
    loadProducts();
    console.log(storage);
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

  return (
    <div className="grid grid-cols-3 gap-10 mt-[30px] w-full">
      {products
        .filter((item) => favourites.includes(item._id))
        .slice(0, 20)
        .map((product) => (
          <ProductItem isClick={isClick} product={product} favourite={value?.favourite || []} key={product._id} onClickFavourite={() => handleFavourite(product._id)} />
        ))}
    </div>
  );
}
