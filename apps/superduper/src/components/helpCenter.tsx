import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { ProductType } from './productType';

export const HelpCenter = ({ oneProduct }: { oneProduct: ProductType }) => {
  return (
    <div className="flex flex-col gap-4 border-2 border-solid border-slate-500 px-4 py-8">
      <div className="font-bold text-2xl">Асуух зүйл байна уу?</div>
      <div className="font-bold text-2xl">Энэ объектыг найзуудтайгаа хуваалцаарай</div>
      <div className="flex gap-2">
        <Link className="p-3 border-2 border-slate-400 " href={''}>
          <FaFacebook className="w-7 h-7" width={100} height={100} />
        </Link>
        <Link className="p-3 border-2 border-slate-400" href={''}>
          <FaInstagram className="w-7 h-7" width={100} height={100} />
        </Link>
        <Link className="p-3 border-2 border-slate-400" href={''}>
          <FaLinkedin className="w-7 h-7" width={100} height={100} />
        </Link>
      </div>
    </div>
  );
};
