'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

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

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  console.log(selectedCategory);

  const [filtering, setFiltering] = useState(false);
  console.log(filtering);

  const [category, setCategory] = useState([]);

  async function filterCategory() {
    setFiltering(true);

    const response = await fetch(`http://localhost:3000/api/products?category=${selectedCategory}`);
    const data = await response.json();
    setCategory(data);
    setFiltering(false);
  }

  useEffect(() => {
    filterCategory();
  }, [selectedCategory]);

  return (
    <div className="container grid-flow-col m-7 justify-center">
      {categoryFilter.map((category) => (
        // <span className="container grid-cols-4">
        <Button className="bg-sky-500 h-40 w-96 rounded-sm m-2" onClick={() => setSelectedCategory(category.value)} key={category.value}>
          {category.name}
        </Button>
        // </span>
      ))}

      {/* ${selecedCategory === category.value ? "bg-sky-700" : "bg-sky-500"} */}
    </div>
  );
}
