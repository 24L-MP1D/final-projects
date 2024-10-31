'use client';
import { AdminLayout } from '@/components/adminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';

export default function CardWithForm() {
  const [category, setCategory] = useState('');

  const addCategory = async () => {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    if (response.ok) {
      alert('Category added successfully');
      setCategory('');
    } else {
      alert('Failed to add category');
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto flex justify-center p-6">
        <Card className="w-[350px] bg-slate-100">
          <CardHeader>
            <CardTitle>Add category</CardTitle>
            <CardDescription>Create your new category in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input placeholder="Name of your new category i.e Art, Jewellery" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={addCategory}>Add category</Button>
            <Button variant="outline" onClick={() => (window.location.href = 'http://localhost:3000/admin')}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminLayout>
  );
}
