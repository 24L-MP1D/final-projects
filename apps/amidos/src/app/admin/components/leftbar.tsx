'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LeftBar() {
  return (
    <div className="w-[300px] h-[900px] bg-white mt-10 pt-6 flex flex-col gap-4 text-[#121316] p-10 relative rounded-lg">
      <div className="text-2xl mb-4">AMIDO'S</div>
      <Button>
        <Link href="Dashboard"> Dashborad</Link>
      </Button>
      <Button>
        <Link href="/admin/orders"> Захиалга</Link>
      </Button>
      <Button>
        <Link href="/admin/food">Хоол</Link>
      </Button>
      <Button>
        <Link href="/admin/food">Ширээ</Link>
      </Button>
      <Button>
        <Link href="/admin/tablesOrder"> Ширээ захиалга</Link>
      </Button>
      <Button>
        <Link href="/admin/tablesOrder"> Ширээ захиалга</Link>
      </Button>
    </div>
  );
}
