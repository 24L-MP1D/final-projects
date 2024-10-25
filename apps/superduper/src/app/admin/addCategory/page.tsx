'use client';

import { Input } from "@/components/ui/Input";
import { useState } from "react";


// const Home = () => {
//   const addCategory = () => {
//     console.log('Successfully added category')
//     ;
//   };

//   const closeCategory = () => {
//     console.log('Rejected add category request');
//   };

export default function Home() {
  const [category, setCategory] = useState('');

  const addCategory = async() => {
    console.log('Successfully added category');
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: 'categories' }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // get();
        setCategory('');
      } else {
        console.error('Failed to add category');
      }
    } catch (error) {
      console.error(error);
    }
  };


return (
    <div className="container mx-auto flex flex-col gap-30">
      <h1>
        <div className="container mx-auto flex flex-col padding-30">
          {' '}
          Add Category👋, <br /> {' '}
        </div>
      </h1>
      <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <br />
      <button className="border-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={addCategory}>
        Add Category
      </button>

      <br />
      {/* <button className="border-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onClick={closeCategory}>
        Close
      </button> */}
    </div>
  );
}
