"use client"
import { useEffect, useState } from "react";
interface Product {
    name: string,
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
                <div>{product.name}</div>
            ))}
        </div>
    )
}