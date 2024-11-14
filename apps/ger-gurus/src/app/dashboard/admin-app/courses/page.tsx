'use client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Home, Laptop, LibraryBig, Settings, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const items = [
  { title: 'Нүүр хуудас', url: '#', icon: Home },
  { title: 'Сургалтууд', url: '/admin-app/courses', icon: LibraryBig },
  { title: 'Вебсайт тохиргоо', url: '#', icon: Laptop },
  { title: 'Орлого', url: '#', icon: DollarSign },
  { title: 'Тохиргоо', url: '#', icon: Settings },
];

export default function Page() {
  interface Course {
    _id: string;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
  }
  const [courses, setCourses] = useState<Course[]>([]);

  const getCourses = async () => {
    const response = await fetch('/api/courses');
    const data = await response.json();
    setCourses(data);
  };

  async function deleteCourse(id: string) {
    await fetch(`/api/courses/${id}`, {
      method: 'DELETE',
    }).then(() => getCourses());
  }

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <main className="max-w-[1000px] ">
      <Link href="/admin-app/courses/create">
        <button className="btn btn-primary hover:bg-transparent my-8 text-base">Шинэ хичээл нэмэх</button>
      </Link>

      <Table>
        <TableCaption>Та сургуулийн сургалтуудыг үүсгэж, удирдаарай.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Зураг</TableHead>
            <TableHead>Нэр</TableHead>
            <TableHead>Зохиогч</TableHead>
            <TableHead>Үүсгэсэн огноо</TableHead>
            <TableHead>Борлуулалт</TableHead>
            <TableHead>Бүртгүүлсэн</TableHead>
            <TableHead>Төлөв</TableHead>
            <TableHead className="text-right">Үйлдлүүд</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                <Link href={`/admin-app/courses/${course._id}`}>
                  {course.imageUrl && (
                    <div className="aspect-auto rounded-md overflow-hidden">
                      <Image src={course.imageUrl} height={80} width={80} alt="thumbnail" className="object-cover hover:scale-125 transition" />
                    </div>
                  )}{' '}
                </Link>
              </TableCell>
              <TableCell>
                <a className="link link-primary hover:text-lg transition" href={`/admin-app/courses/${course._id}`}>
                  {course.title}
                </a>
              </TableCell>
              <TableCell>{course.author}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">
                <button onClick={() => deleteCourse(course._id)} className="btn btn-neutral btn-sm">
                  <Trash2 className="h-4 w-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
