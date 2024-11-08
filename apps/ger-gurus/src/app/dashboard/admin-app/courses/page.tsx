'use client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
    <div className="w-[1000px] mx-auto p-10">
      <Link href="/admin-app/courses/create">
        <Button className="p-6 mb-8">Шинэ курс нэмэх</Button>
      </Link>
      <Table className="">
        <TableCaption>Та сургуулийнхаа курсүүдийг үүсгэж, удирдаарай.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Нүүр зураг</TableHead>
            <TableHead>Нэр</TableHead>
            <TableHead>Зохиогч</TableHead>
            <TableHead>Үүсгэсэн огноо</TableHead>
            <TableHead>Худалдаа</TableHead>
            <TableHead>Бүртгэлүүд</TableHead>
            <TableHead>Төлөв</TableHead>
            <TableHead className="text-right">Үйлдлүүд</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium"> {course.imageUrl && <Image src={course.imageUrl} height={200} width={200} alt="thumbnail" />}</TableCell>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.author}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">
                <Button onClick={() => deleteCourse(course._id)}>
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
