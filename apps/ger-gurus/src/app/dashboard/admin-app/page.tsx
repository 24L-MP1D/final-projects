import AppSidebar, { SidebarItem } from '@/components/app-sidebar';
import { Home, Laptop, LibraryBig, Search, Settings } from 'lucide-react';

const items = [
  { title: 'Home', url: '#', icon: Home },
  { title: 'Сургалтууд', url: '/admin-app/courses', icon: LibraryBig },
  { title: 'Сайт', url: '#', icon: Laptop },
  { title: 'Хямдрал', url: '#', icon: Search },
  { title: 'Тохиргоо', url: '#', icon: Settings },
];

export default function Page() {
  return (
    <main className="bg-cover h-screen flex justify-start items-center" style={{ backgroundImage: "url('b1.jpg')" }}>
      <AppSidebar>
        {items.map((item, index) => (
          <SidebarItem key={index} icon={<item.icon />} text={item.title} url={item.url} />
        ))}
      </AppSidebar>
    </main>
  );
}
