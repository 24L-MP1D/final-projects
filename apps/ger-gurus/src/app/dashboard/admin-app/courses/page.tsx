'use client';
import AppSidebar, { SidebarItem } from '@/components/app-sidebar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Home, Laptop, LibraryBig, Search, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const items = [
  { title: 'Home', url: '#', icon: Home },
  { title: 'Сургалтууд', url: '/admin-app/courses', icon: LibraryBig },
  { title: 'Сайт', url: '#', icon: Laptop },
  { title: 'Хямдрал', url: '#', icon: Search },
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
    <div className="bg-cover pr-24 h-screen flex justify-start gap-10 items-center" style={{ backgroundImage: "url('/b1.jpg')" }}>
      <AppSidebar>
        {items.map((item, index) => (
          <SidebarItem key={index} icon={<item.icon />} text={item.title} url={item.url} />
        ))}
      </AppSidebar>

      <div className="max-h-[1000px] w-full rounded-3xl p-10 backdrop-blur-[4px] backdrop-saturate-[139%] bg-[rgba(255,255,255,0.11)] shadow-2xl">
        <div className="max-h-[920px] overflow-scroll">
          <Link href="/admin-app/courses/create">
            <Button className="sticky font-serif rounded-2xl backdrop-blur-[4px] backdrop-saturate-[139%] border-gray-500 bg-[rgba(255,255,255,0.35)] text-slate-700 hover:bg-transparent hover:shadow font-bold text-base">
              Шинэ хичээл нэмэх
            </Button>
          </Link>
          <Table className="">
            <TableCaption>Create and manage courses in your school.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Thumbnail</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Creation date</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell className="font-medium"> {course.imageUrl && <Image src={course.imageUrl} height={40} width={40} alt="thumbnail" />}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.author}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => deleteCourse(course._id)}
                      className="font-serif rounded-2xl backdrop-blur-[4px] backdrop-saturate-[139%] border-gray-500 bg-[rgba(255,255,255,0.35)] text-slate-700 hover:bg-transparent hover:shadow font-bold text-base"
                    >
                      устгах
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
