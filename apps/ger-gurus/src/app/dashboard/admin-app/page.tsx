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
    <div>
      <main className="bg-cover h-screen flex justify-start items-center" style={{ backgroundImage: "url('b1.jpg')" }}>
        <AppSidebar>
          {items.map((item, index) => (
            <SidebarItem key={index} icon={<item.icon />} text={item.title} url={item.url} />
          ))}
        </AppSidebar>
      </main>
      <div className="flex items-center !justify-center flex-col w-full h-full ml-20">
        <p> "Админ Удирдлагын Хуудаст тавтай морил! </p>
        <p> Энд та нэгж хичээл, бүлэг хичээлүүдээ үүсгэж, удирдах, мөн вэбсайтдаа өөрчлөлт оруулах боломжтой. </p>
        <p> Өөрийн агуулгаа бүтээж, өөрийн хүрээлэлтэй болж эхэлцгээе!"</p>
      </div>
    </div>
  );
}
