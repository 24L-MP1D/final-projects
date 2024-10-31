'use client';
import { useState } from 'react';

import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/Sidebar';
import { cn } from '@/lib/utils';
import { IconArrowLeft, IconBrandPaypalFilled, IconBrandProducthunt, IconBrandTabler, IconMoodBitcoin, IconSettings, IconUserBolt, } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function SidebarDemo() {
  const links = [
    {
      label: 'Dashboard',
      href: '/admin/addCategory',
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
        label: 'Leaderboard',
        href: '/admin/leaderboard',
        icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 hover:text-blue-700" />,
      },
      {
        label: 'Products',
        href: '/admin/products',
        icon: <IconBrandProducthunt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 hover:text-blue-700" />,
      },
      {
        label: 'Bids',
        href: '/admin/bids',
        icon: <IconMoodBitcoin className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 hover:text-blue-700" />,
      },
      {
        label: 'Payment',
        href: '/admin/payments',
        icon: <IconBrandPaypalFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 hover:text-blue-700" />,
      },
      {
        label: 'Settings',
        href: '/admin/settings',
        icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 hover:text-blue-700" />,
      },
      {
        label: 'Logout',
        href: '/admin/logout',
        icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 hover:text-blue-700" />,
      },
    ];

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full max-w-[300px] border border-neutral-200 dark:border-neutral-700 overflow-hidden',
        'h-[60vh] min-h-screen' // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: 'Manu Arora',
                href: '#',
                icon: <Image src="" className="h-7 w-7 flex-shrink-0 rounded-full" width={50} height={50} alt="Avatar" />,
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
const Logo = () => {
  return (
    <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white whitespace-pre">
        SuperDuper Admin
      </motion.span>
    </Link>
  );
};
const LogoIcon = () => {
  return (
    <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
