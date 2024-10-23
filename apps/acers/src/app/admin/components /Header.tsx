import { UserRoundPen } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <div className="bg-[#d4d4d4] flex justify-between p-3 px-8">
        <Link href={'./dashboard?select=Хяналтын самбар'} className="">
          <div>ACERS Dashboard | Admin</div>
        </Link>
        {/* <Input>search</Input> */} <div>searchbar</div>
        {/* <SearchBar /> */}
        <div>
          <UserRoundPen />
        </div>
      </div>
    </div>
  );
}
