'use client';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  category: string;
}

export default function GetCategory() {
  const [getCategory, setGetCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const get = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setGetCategory(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }

    useEffect(() => {
      get();
    }, []);
  }
  return (
    <><Button onClick={get}>Get Category</Button><div className="ml-5">
      {getCategory.map((category) => (
        <div key={category.id}>
          <h1>{category.category}</h1>
        </div>
      ))}
    </div></>
  )
};
