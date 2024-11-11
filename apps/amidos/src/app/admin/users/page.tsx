'use client';
import { TableHead } from '@/components/table';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table';
import axios from 'axios';
import * as React from 'react';
import toast from 'react-hot-toast';

export type Users = {
  username: string;
  role: string;
  email: string;
  _id: string;
};

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [usersData, setUsersdata] = React.useState<Users[]>([]);

  function renderusers() {
    axios
      .get('/api/admin/users')
      .then((res) => setUsersdata(res.data))
      .catch(function (error) {
        toast.error('Something went wrong');
      });
  }
  React.useEffect(() => {
    renderusers();
  }, []);

  function makeadmin(user: Users) {
    if (user.role === 'admin') {
      axios
        .put('/api/admin/removeadmin', { id: user._id })
        .then((res) => {
          if (res.status === 200) {
            toast.success('Амжилттай хэрэглэгч боллоо');
          }
        })
        .catch(function (error) {
          toast.error('Алдаа гарлаа. Дахин оролдоно уу');
        })
        .finally(() => renderusers());
    } else {
      axios
        .put('/api/admin/users', { id: user._id })
        .then((res) => {
          if (res.status == 200) {
            toast.success('Амжилттай админ боллоо');
          }
        })
        .catch(function (error) {
          toast.error('Алдаа гарлаа. Дахин оролдоно уу');
        })
        .finally(() => renderusers());
    }
  }

  return (
    <div className="max-w-screen-lg m-auto">
      <div className="rounded-md border">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Нэр</TableHead>
                <TableHead>Имэйл хаяг</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Статус солих</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user._id}>
                  <TableCell key={user._id}>{user.username}</TableCell>
                  <TableCell key={user._id}>{user.email}</TableCell>
                  <TableCell key={user._id}>{user.role}</TableCell>
                  <Button onClick={() => makeadmin(user)}>{user.role === 'admin' ? 'Хэрэглэгч болгох' : 'Админ болгох'}</Button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground"></div>
      </div>
    </div>
  );
}
