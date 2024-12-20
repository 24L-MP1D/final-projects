import { SidebarDemo } from '@/components/sideBarDemo';
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <div className="flex">
        <SidebarDemo />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
