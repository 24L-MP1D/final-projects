export default function Page() {
  return (
    <main className="bg-gray-100 flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-center items-center bg-gray-600 h-[50px]">
        <div className="text-3xl font-medium">Header</div>
      </div>
      {/* Main */}
      <div className="w-[1280px] h-[95.5vh] flex flex-col gap-20 bg-white mx-auto py-24">
        <div className="px-10">
          <div className="text-xl pl-40 pb-3">Хичээлийн гарчиг</div>
          <div className="flex justify-center">
            <div className="w-[1040px] h-[580px] rounded-lg bg-gray-400 text-center content-center">Хичээлийн бичлэг</div>
          </div>
          <div className="flex flex-col gap-8 pt-16">
            <div>#Холбогдолтой хичээлүүд</div>
            <div className="pl-3">
              <div className="w-[180px] h-[120px] bg-slate-400 rounded-lg"></div>
              <div>Хичээлийн нэр</div>
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
