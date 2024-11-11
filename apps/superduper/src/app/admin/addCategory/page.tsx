'use client';
import { AdminLayout } from '@/components/adminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/Input';
import Image from 'next/image';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { Context } from '../layout';

const CLOUDINARYNAME = process.env.NEXT_PUBLIC_CLOUDINARYNAME;
const CLOUDINARYPRESET = process.env.NEXT_PUBLIC_CLOUDINARYPRESET || '';
export default function CardWithForm() {
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const value = useContext(Context);
  const addCategory = async () => {
    const formData = new FormData();
    if (!image) return;
    formData.append('file', image);
    formData.append('upload_preset', CLOUDINARYPRESET);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARYNAME}/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data.secure_url);
    await fetch('/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        image: data.secure_url,
      }),
    });
    setImage(null);
    setCategory('');
  };

  useEffect(() => {
    value?.setLayoutAside('Dashboard');
  }, []);
  const imageUploader = (event: FormEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files;
    if (!file) return;
    setImage(file[0]);
  };
  return (
    <AdminLayout>
      <div className="container mx-auto flex justify-center p-6">
        <Card className="w-[350px] bg-slate-100">
          <CardHeader>
            <CardTitle>Ангилал нэмэх</CardTitle>
            <CardDescription>Нэг товшилтоор шинэ ангиллаа үүсгээрэй.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input placeholder="Урлаг, үнэт эдлэл гэх мэт шинэ ангиллын нэр" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
  
                <div>
                  <Input type="file" onChange={(e) => imageUploader(e)} value={''} />
                  {image && <Image src={URL.createObjectURL(image)} alt="a" width={500} height={500} className="w-[500px] h-[500px]" />}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={addCategory}>Ангилал нэмэх</Button>
            <Button variant="outline" onClick={() => (window.location.href = 'http://localhost:3000/admin')}>
              Цуцлах
            </Button>
          </CardFooter>
      
        </Card>
      </div>

    </AdminLayout>
  );
}
