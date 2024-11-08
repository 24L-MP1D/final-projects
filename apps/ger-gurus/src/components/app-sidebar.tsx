'use client';

import { ChevronFirst, ChevronLast, Home, Laptop, LibraryBig, MoreVertical, Search, Settings } from 'lucide-react';
import { createContext, ReactNode, useContext, useState } from 'react';

const items = [
  { title: 'Home', url: '#', icon: Home },
  { title: 'Сургалтууд', url: '/admin-app/courses', icon: LibraryBig },
  { title: 'Сайт', url: '#', icon: Laptop },
  { title: 'Хямдрал', url: '#', icon: Search },
  { title: 'Тохиргоо', url: '#', icon: Settings },
];

interface SidebarContextType {
  expanded: boolean;
  toggleExpanded: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
  children: ReactNode;
}

export default function AppSidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const toggleExpanded = () => setExpanded((curr) => !curr);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col backdrop-blur-[4px] backdrop-saturate-[139%] bg-[rgba(255,255,255,0.11)] shadow-2xl">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img src="/char-2.jpeg" className={`overflow-hidden rounded-full transition-all duration-300 ${expanded ? 'w-14' : 'w-0'}`} alt="logo" />
          <button onClick={toggleExpanded} className="p-1.5 rounded-lg text-gray-400">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, toggleExpanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <img src="/char-3.png" className={`overflow-hidden rounded-full transition-all duration-300 ${expanded ? 'w-[300px]' : 'w-0'}`} alt="logo" />
        <div className="border-t flex p-3">
          <img src="/favicon.ico" alt="avatar" className="w-10 h-10 rounded-md" />
          <div className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${expanded ? 'w-52 ml-3' : 'w-0'}`}>
            <div className="leading-4">
              <h4 className="font-semibold">Verse.mn</h4>
              <span className="text-xs text-gray-600">versemn@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  url: string;
}

export function SidebarItem({ icon, text, active = false, alert = false, url }: SidebarItemProps) {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('SidebarItem must be used within a SidebarContext.Provider');
  }

  const { expanded } = context;

  return (
    <li
      className={`
        relative flex items-center mt-10 py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors duration-300 group
        ${active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-gray-500' : 'hover:bg-indigo-50 text-gray-600'}
      `}
    >
      {icon}
      <span className={`overflow-hidden transition-all duration-300 ${expanded ? 'w-52 ml-3' : 'w-0'}`}>{text}</span>
      {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`} />}
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-gray-600 text-sm
            invisible opacity-20 -translate-x-3 transition-all duration-300
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
      <a href={url} className="absolute inset-0" />
    </li>
  );
}
