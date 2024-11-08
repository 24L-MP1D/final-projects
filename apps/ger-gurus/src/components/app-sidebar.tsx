import { DollarSign, Home, Laptop, LibraryBig, Settings } from 'lucide-react';

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

// Menu items.
const items = [
  {
    title: 'Нүүр хуудас',
    url: '#',
    icon: Home,
  },
  {
    title: 'Курсууд',
    url: '/admin-app/courses',
    icon: LibraryBig,
  },
  {
    title: 'Вебсайт тохиргоо',
    url: '#',
    icon: Laptop,
  },
  {
    title: 'Орлого',
    url: '#',
    icon: DollarSign,
  },
  {
    title: 'Ерөнхий тохиргоо',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Javzaa's School</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
