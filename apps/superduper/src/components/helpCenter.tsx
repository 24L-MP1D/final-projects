import Link from 'next/link';
import { ProductType } from './productType';

export const HelpCenter = ({ oneProduct }: { oneProduct: ProductType }) => {
  return (
    <div className="flex flex-col gap-4 border-2 border-solid border-slate-500 px-4 py-8">
      <div className="font-bold text-2xl">Any questions?</div>
      <Link className="underline" href={'/helpCenter'}>
        Get in touch via our Help Centre
      </Link>
      <div className="font-bold text-2xl">Share this object with your friends</div>
      <div className="flex gap-2">
        <Link className="p-3 border-2 border-slate-400" href={''}></Link>
        <Link className="p-3 border-2 border-slate-400" href={''}></Link>
        <Link className="p-3 border-2 border-slate-400" href={''}></Link>
      </div>
    </div>
  );
};
