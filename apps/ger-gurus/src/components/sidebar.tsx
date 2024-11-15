'use client';
import { DollarSign, Home, Laptop, LibraryBig, Settings } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const SideBar: React.FC<Props> = ({ children }) => {
  const params = useParams();
  const schoolId = params?.schoolId;
  const items = [
    { title: 'Нүүр хуудас', url: `/admin-app/${schoolId}`, icon: Home },
    { title: 'Сургалтууд', url: `/admin-app/${schoolId}/courses`, icon: LibraryBig },
    { title: 'Вебсайт тохиргоо', url: '#', icon: Laptop },
    { title: 'Орлого', url: '#', icon: DollarSign },
    { title: 'Тохиргоо', url: '#', icon: Settings },
  ];

  return (
    <div className="drawer lg:drawer-open font-pangolin z-10">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        {/* <label htmlFor="my-drawer-2" className="drawer-button hidden ml-0 mb-10 absolute left-0 top-0">
          <MenuIcon className="w-12 h-12 p-2" />
        </label> */}
        {children}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-8 text-base text-center">
          {/* Sidebar content here */}
          <div className="flex gap-4 items-center ">
            <div className="avatar mb-6">
              <div className="mask mask-squircle w-12 shadow-xl">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className="shadow-xl" />
              </div>
            </div>
            {/* <p>Сургууль: {schoolId}</p> */}
          </div>

          {items.map((item) => (
            <li key={item.title} className="shadow-sm rounded-lg">
              <a className="hover:scale-105 transition !font-pangolin hover:bg-accent" href={item.url}>
                <item.icon /> {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
