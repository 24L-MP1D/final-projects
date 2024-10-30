"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
    name: string,
    image_url: string,
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {

        const fetchProducts = async () => {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data)
        };
        fetchProducts();
    }, []);

    return (
        <div>
            {products.map((product) => (
                <div>{product.name}
                    <Image src={product.image_url} alt="image" height={280} width={280} className="h-[280px] w-[280px]" />
                </div>

            ))}
        </div>
    )
}