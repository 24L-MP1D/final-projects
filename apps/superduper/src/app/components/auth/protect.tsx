import { ReactNode } from 'react';
import { useAuthStore } from './useAuthStore';

export function Protection({ children, role }: { children: ReactNode; role: string }) {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) {
    return null;
  }
  if (currentUser.role !== role) {
    return <div>❌ Forbidden</div>;
  }
  return <>{children}</>;
}
