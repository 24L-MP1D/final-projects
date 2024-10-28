'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
interface Product {
  name: string;
  image_url: string;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6">
      {products.slice(0, 5).map((product) => (
        <div>
          <Image src={product.image_url} alt="image" height={280} width={280} className="h-[280px] w-[280px]" />
          {product.name}
        </div>
      ))}
    </div>
  );
}
