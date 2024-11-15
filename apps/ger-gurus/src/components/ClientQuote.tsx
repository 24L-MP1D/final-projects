'use client';

export default function ClientQuote() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <section className="max-w-[1020px] mx-auto px-10 py-20 flex flex-col gap-4 items-center">
        <div className="text-3xl font-bold text-purple-600">Бидний эрхэм зорилго</div>
        <div className="text-5xl text-[#201116] font-bold text-center">
          Бид танд өөрийн үнэ цэнэтэй мэдлэг, ур чадвараа бусдад санал болгох боломжийг бүрдүүлэхэд анхаарах бөгөөд технологийн дэвшил, дизайны эрх чөлөөг хүн бүрт хүртээмжтэй, үр дүнтэй болгохоор
          зорьж байна. 👻{' '}
        </div>
      </section>
      <section className="mx-auto px-10 py-20 max-w-[1280px] overflow-hidden">
        <div
          className="w-full h-full min-h-[640px] p-16 rounded-2xl grid grid-cols-2 relative"
          style={{
            background: 'linear-gradient(100deg, #e1e2e2, #e1e2e2 50%, #abaaa8)',
          }}
        >
          <div className="pt-8 pb-4 flex flex-col gap-2">
            <div className="text-3xl font-bold text-purple-600">Анхны хэрэглэгч</div>
            <div className="text-7xl text-[#201116] font-bold">Ууганбаяр гэж хэн бэ?</div>
            <div className="text-xl">
              Уламжлалт анагаах ухааны бага эмч мэргэжилтэй, эрүүл амьдралын хэв маягийн коуч, шим тэжээл судлаач. Нутрилайт Институтын шим тэжээлийн мастер зөвлөх. Та эрүүл сайн сайхан байхын тулд
              цогц үйлчилгээг авах боломжтой бөгөөд цаг товлон ганцаарчилсан уулзалтаар өөрийн бие организм хэрхэн ажиллаж байгааг мэдэж, хоол, шим тэжээлийн нарийн зөвлөгөө авах боломжтой.
            </div>
            <div>icons</div>
          </div>
          <div className="absolute right-0 top-0 h-full">
            <img src="/uuganbileg.png" alt="chars" className="w-full h-full object-cover transform group-hover:scale-105 group-hover:rotate-3 group-hover:brightness-110" />
          </div>
        </div>
      </section>
    </div>
  );
}
