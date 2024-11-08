'use client';

import { CookingPot, Euro, LucideIcon, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface SidebarLinkProps {
  href: string;
  selectValue: string;
  label: string;
  Icon: LucideIcon; // Assuming Icon is a Lucide icon component
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, selectValue, label, Icon }) => {
  const searchParams = useSearchParams();
  const select = searchParams.get('select');

  return (
    <Link href={href} className={`flex py-2 px-4 gap-2 hover:cursor-pointer hover:bg-[#e7e5e4] ${select === selectValue && 'bg-[#F7F7F8]'}`}>
      <div className="text-[#0284c7]">
        <Icon />
      </div>
      <div className="text-[#121316]">{label}</div>
    </Link>
  );
};

export const DashboardAside = () => {
  return (
    <div className="flex flex-col gap-4 text-base bg-[#f3f4f6] min-h-screen">
<<<<<<< HEAD
      {/* <SidebarLink href="./dashboard/?select=Хяналтын самбар" selectValue="Хяналтын самбар" label="Хяналтын самбар" Icon={LayoutDashboard} /> */}
      <SidebarLink href="/admin/income" selectValue="Орлого" label="Орлого | Income" Icon={Euro} />
      <SidebarLink href="/admin/recipe" selectValue="Бүтээгдэхүүн" label="Бүтээгдэхүүн | Recipe" Icon={CookingPot} />
      <SidebarLink href="/admin/user" selectValue="Хэрэглэгч" label="Хэрэглэгч | User" Icon={Users} />
      <SidebarLink href="/admin/settings" selectValue="Тохиргоо" label="Тохиргоо | Settings" Icon={Settings} />
=======
      <Suspense>
        {/* <SidebarLink href="./dashboard/?select=Хяналтын самбар" selectValue="Хяналтын самбар" label="Хяналтын самбар" Icon={LayoutDashboard} /> */}
        <SidebarLink href="/admin/income?select=Орлого" selectValue="Орлого" label="Орлого | Income" Icon={Euro} />
        <SidebarLink href="/admin/products" selectValue="Бүтээгдэхүүн" label="Бүтээгдэхүүн | Recipe" Icon={CookingPot} />
        <SidebarLink href="/admin/user" selectValue="Хэрэглэгч" label="Хэрэглэгч | User" Icon={Users} />
        <SidebarLink href="/admin/settings?select=Тохиргоо" selectValue="Тохиргоо" label="Тохиргоо | Settings" Icon={Settings} />
      </Suspense>
>>>>>>> main
    </div>
  );
};
