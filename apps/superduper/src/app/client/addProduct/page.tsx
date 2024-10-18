'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  useEffect(() => {}, [fetch('/api/products')]);

  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ amount, setAmount ] = useState("");
  const [ auctionStartTime, setAuctionStartTime ] = useState("");
  const [ auctionEndTime, setAuctionendTime ] = useState("");


  return (
    <div className="container mx-auto flex flex-col gap-3">
      <div>Add Product</div>
      <div>Live Auction</div>
      <div>
        <input placeholder="title" className="border-2 rounded-lg bg-slate-100 p-2" onChange={(e)=>setTitle(e.target.value)} />
      </div>
      <button className="border-2 rounded-lg bg-black p-2 text-white">+ Add product</button>
      <div>
        <input placeholder="description" className="border-2 rounded-lg bg-slate-100 p-2" onChange={(e)=>setDescription(e.target.value)}/>
      </div>
      <button className="border-2 rounded-lg bg-yellow-400 p-2">set</button>
      <div>
        <input placeholder="amount" className="border-2 rounded-lg bg-slate-100 p-2" onChange={(e)=>setAmount(e.target.value)}/>
      </div>
      <button className="border-2 rounded-lg bg-orange-200 p-2">set amount</button>
      <div>
        <input placeholder="auctionStart" className="border-2 rounded-lg bg-slate-100 p-2" onChange={(e)=>setAuctionStartTime(e.target.value)}/>
      </div>
      <button className="border-2 rounded-lg bg-green-200 p-2">set time</button>
      <div>
        <input placeholder="auctionEnd" className="border-2 rounded-lg bg-slate-100 p-2" onChange={(e)=>setAuctionendTime(e.target.value)}/>
      </div>
      <button className="border-2 rounded-lg bg-red-200 p-2">set time</button>
    </div>
  );
}
