// 'use client';
import { useEffect } from 'react';
export default function Page() {
  useEffect(() => {}, [fetch('/api/products')]);

  return (
    <div className="container mx-auto flex flex-col gap-3">
      <div>Add Product</div>
      <div>Live Auction</div>
      <div>
        <input placeholder="Product name" className="border-2 rounded-lg bg-slate-100 p-2" />
      </div>
      <button className="border-2 rounded-lg bg-green-400 p-2">+ Add product</button>
      <div>
        <input placeholder="Bid start date" className="border-2 rounded-lg bg-slate-100 p-2" />
      </div>
      <button className="border-2 rounded-lg bg-yellow-400 p-2">start</button>
      <div>
        <input placeholder="Amount" className="border-2 rounded-lg bg-slate-100 p-2" />
      </div>
      <button className="border-2 rounded-lg bg-orange-200 p-2">set amount</button>
      <div>
        <input placeholder="Image" className="border-2 rounded-lg bg-slate-100 p-2" />
      </div>
      <button className="border-2 rounded-lg bg-red-200 p-2">add image</button>
    </div>
  );
}
