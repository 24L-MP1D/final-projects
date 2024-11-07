import Link from 'next/link';

export const HelpCenter = () => {
  return (
    <div className="flex flex-col gap-4 border-2 border-solid border-slate-500 px-4 py-8">
      <div className="font-bold text-2xl">Асуух зүйл байна уу?</div>
      <Link className="underline" href={'/helpCenter'}>
      Манай Тусламжийн төвөөр холбогдоно уу
      </Link>
      <div className="font-bold text-2xl">Энэ объектыг найзуудтайгаа хуваалцаарай</div>
      <div className="flex gap-2">
        <Link className="p-3 border-2 border-slate-400" href={''}></Link>
        <Link className="p-3 border-2 border-slate-400" href={''}></Link>
        <Link className="p-3 border-2 border-slate-400" href={''}></Link>
      </div>
    </div>
  );
};
