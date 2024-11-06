'use client';

import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../(client)/components/ui/Table';
import { DashboardAside } from '../components/DashboardAside';
import { Input } from '../components/ui/Input';

export default function Home() {
  interface User {
    _id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    role: Role; // Use the enum for role
    picture: string;
    createdAt: string;
    updatedAt: string;
  }

  enum Role {
    GOLD = 'gold',
    SILVER = 'silver',
    BRONZE = 'bronze',
    FREE = 'free',
    admin = 'admin',
  }

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;
  const isAdmin = true; // Replace with actual admin check logic

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user/adminFunctions/searchUsers', { method: 'POST', body: JSON.stringify({ search: searchValue }) });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [searchValue]);

  const searchFilt = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleRoleChange = async (userId: string, newRole: Role) => {
    try {
      const response = await fetch(`/api/user/adminFunctions/updateUserRole`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      // Update the local state
      const updatedUsers = users.map((user) => (user._id === userId ? { ...user, role: newRole } : user));
      setUsers(updatedUsers);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const confirmDelete = window.confirm('Энэ хэрэглэгчийг устгах уу?');
    if (!confirmDelete) {
      return; // If the user cancels, exit the function
    }
    try {
      const response = await fetch(`/api/user/adminFunctions/deleteUser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: userId }), // backend der
      });

      if (!response.ok) {
        window.alert('User deleted successfully');
        throw new Error('Failed to delete user');
      }

      // Remove the user from local state
      setUsers(users.filter((user) => user._id !== userId));
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex">
      <DashboardAside />
      <div>
        <div className="text-center font-bold">Хэрэглэгчийн мэдээлэл хянах хэсэг</div>
        <div className="justify-center">
          <Input value={searchValue} onChange={searchFilt} placeholder="search" type="text" className="w-100 ml-5" />
        </div>
        <Table className="border-[1px] border-[#d1d5db] ml-5 mt-5 w-[800px] rounded-xl bg-white">
          <TableCaption>Хэрэглэгчийн бүртгэлийн жагсаалт</TableCaption>
          <TableHeader>
            <TableRow className="justify-between">
              <TableHead>#</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Profile Picture</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              {isAdmin && <TableHead>Role </TableHead>} {/* Show Actions column for admins */}
              <TableHead>delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user, index) => (
              <TableRow className="justify-between" key={user._id}>
                <TableCell className="font-medium">{(currentPage - 1) * usersPerPage + index + 1}</TableCell>
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
                {isAdmin && (
                  <TableCell>
                    <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value as Role)}>
                      <option value={Role.GOLD}>Gold</option>
                      <option value={Role.SILVER}>Silver</option>
                      <option value={Role.BRONZE}>Bronze</option>
                      <option value={Role.FREE}>Free</option>
                    </select>
                  </TableCell>
                )}
                <TableCell>
                  <button onClick={() => handleDeleteUser(user._id)} className=" hover:text-red-700">
                    <X />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center mt-4 gap-4">
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            Өмнөх хуудас
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} className={currentPage === index + 1 ? 'font-bold' : ''} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            Дараагийн хуудас
          </button>
        </div>
      </div>
    </div>
  );
}
