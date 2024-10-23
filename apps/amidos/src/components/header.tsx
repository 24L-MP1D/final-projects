import { Menu } from 'lucide-react';
export function Header() {
  return (
    <div className="flex">
      <div className="hidden lg:block">Бидний тухай</div>
      <div className="hidden lg:block">Меню</div>
      <div className="hidden lg:block">Галлерей</div>
      <div className="lg:hidden text-left">
        <Menu />
      </div>
    </div>
  );
}
