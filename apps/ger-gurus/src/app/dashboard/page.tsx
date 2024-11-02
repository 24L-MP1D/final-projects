'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Page() {
  const [domain, setDomain] = useState('');

  function create() {
    fetch(`/api/schools`, {
      method: 'POST',
      body: JSON.stringify({ domain }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return (
    <div className="flex justify-center h-screen items-center p-6 ">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center text-sky-600">Welcome to Your Content Creating Adventure!</h1>
        <p className="mb-6 text-center text-gray-700">We're excited to have you here! Start by creating your unique space where you can share your skills and knowledge with the world.</p>
        <div className="flex flex-col items-center">
          <span className="flex items-center!">
            <Input onChange={(e) => setDomain(e.target.value)} type="text" placeholder="Enter your unique name" className="w-full max-w-xs text-right text-base" />
            <span className="flex items-center">
              <p>.verse.mn</p>
            </span>
            <Button className="ml-4">
              Check if available
              <Search />
            </Button>
          </span>

          <Button onClick={create} className="w-full max-w-xs mt-10" disabled={true}>
            Create My Space
          </Button>
        </div>
      </div>
    </div>
  );
}
