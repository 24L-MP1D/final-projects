import { UserRoundPen } from 'lucide-react';
import Link from 'next/link';
import { Input } from './ui/Input';

export default function Header() {
  return (
    <div>
      <div className="bg-[#d4d4d4] flex justify-between p-3 px-8">
        <Link href={'./dashboard?select=Хяналтын самбар'} className="">
          <div>ACERS Dashboard | Admin</div>
        </Link>
        <div>
          <Input placeholder="search" />
        </div>
        <div>
          <UserRoundPen />
        </div>
      </div>
    </div>
  );
}
