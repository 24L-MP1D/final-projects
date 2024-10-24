"use client"
import { Button } from "@/src/app/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/app/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Page() {
    interface Course {
        _id: string;
        title: string;
        author: string;
        description: string;
        thumbnail: string
    }
    const [courses, setCourses] = useState<Course[]>([]);

    const getCourses = async () => {
        const response = await fetch("/api/courses");
        const data = await response.json();
        setCourses(data);
      };
    
    async function deleteCourse(id: string) {
        await fetch(`/api/courses/${id}`,
            {
                method: 'DELETE'
            })
            .then(() => getCourses())
    }

      useEffect(() => {
        getCourses();
      }, []);


    return (<div>
        <Link href="/school/admin-app/courses/create"><Button>Add new course</Button></Link>

        <Table className="w-[80%]">
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
                {courses.map((course)=>(
                                <TableRow>
                                    <TableCell className="font-medium">
                                        <Image src={course.thumbnail} height={40} width={40} alt="thumbnail"/>
                                    </TableCell>
                                    <TableCell>{course.title}</TableCell>
                                    <TableCell>{course.author}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell className="text-right">
                                        <Button onClick={()=>deleteCourse(course._id)}>delete</Button>
                                    </TableCell>
                                </TableRow>
                ))}

            </TableBody>
        </Table>
        </div>)}
