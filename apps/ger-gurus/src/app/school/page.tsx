import Link from 'next/link';

export default function Page() {
  return (
    <main className="bg-gray-100 flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-center items-center bg-gray-600 h-[50px]">
        <div className="text-3xl font-medium">Header</div>
      </div>
      {/* Main */}
      <div className="w-[1280px] flex flex-col gap-20 bg-white mx-auto py-24">
        <div className="flex flex-col gap-10 px-12">
          <div className="text-center text-2xl">Танилцуулга</div>
          <div className="flex gap-40 justify-center">
            <div className="bg-gray-300 h-[480px] w-[380px] text-center content-center rounded-xl">Өөрийн зураг, бичлэг оруулах</div>
            <div className="w-[250px]">Introduce</div>
          </div>
        </div>
        <div className="flex flex-col gap-10 px-16">
          <div className="text-center text-2xl">Хичээлүүд</div>
          <div className="flex flex-col gap-8">
            <div>Шинэ хичээлүүд</div>
            <div className="pl-3">
              <Link href={'/hicheel'}>
                <div className="w-[180px] h-[120px] bg-slate-400 rounded-lg"></div>
              </Link>
              <Link href={'/hicheel'}>
                <div>Хичээлийн нэр</div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div>#Холбогдолтой хичээлүүд</div>
            <div className="pl-3">
              <Link href={'/hicheel'}>
                <div className="w-[180px] h-[120px] bg-slate-400 rounded-lg"></div>
              </Link>
              <Link href={'/hicheel'}>
                <div>Хичээлийн нэр</div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div>Үнэгүй хичээлүүд</div>
            <div className="pl-3">
              <Link href={'/hicheel'}>
                <div className="w-[180px] h-[120px] bg-slate-400 rounded-lg"></div>
              </Link>
              <Link href={'/hicheel'}>
                <div>Хичээлийн нэр</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-center items-center bg-slate-600 h-[180px]">
        <div className="text-3xl font-medium">Footer</div>
      </div>
    </main>
  );
}
