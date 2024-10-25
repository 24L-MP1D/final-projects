'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { DashboardAside } from '../components /DashboardAside';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components /ui/Table';

export default function Home() {
  interface User {
    _id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    role: string;
    picture: string;
    createdAt: string;
    updatedAt: string;
  }

  const [users, setUsers] = useState<User[]>([]); // State to hold user data
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user/adminFunctions'); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User[] = await response.json();
        setUsers(data); // Set fetched data to state
      } catch (e: any) {
        setError(e.message); // Set error message if there's an error
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run only once on mount

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Error message
  }

  return (
    <div className="flex">
      <DashboardAside />
      <div className="text-center font-bold">USER</div>
      <div>
        <div>Gold хэрэглэгч</div>
        <div>Silver хэрэглэгч</div>
        <div>Bronze хэрэглэгч</div>
        <div>Бусад хэрэглэгч</div>
      </div>
      <Table className="border-[1px] border-[#d1d5db] ml-5 mt-5 w-[800px] rounded-xl bg-white">
        <TableCaption>Хэрэглэгчийн бүртгэлийн жагсаалт</TableCaption>
        <TableHeader>
          <TableRow className="justify-between">
            <TableHead>Username</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Profile Picture</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow className="justify-between" key={user._id}>
              <TableCell className="font-medium">{user.userName}</TableCell>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <img src={user.picture} alt={`${user.userName}'s profile`} className="w-10 h-10 rounded-full" />
              </TableCell>
              <TableCell>{dayjs(user.createdAt).format('YYYY-MM-DD')}</TableCell>
              <TableCell>{dayjs(user.updatedAt).format('YYYY-MM-DD')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
