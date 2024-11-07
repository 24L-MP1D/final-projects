'use client';
import { Parallax } from 'react-parallax';
export default function Aboutupper() {
  const aboutRestaurant = [
    { title: 'АЖИЛЛАХ ЦАГ', description: 'Monday to Friday - 09:00 - 00:00am' },
    { title: 'ХОЛБОО БАРИХ ', description: '99769901, 88819900' },
    { title: 'ХАЯГ', description: 'МОНКОН БАРИЛГА 1-Р ДАВХАР' },
  ];
  return (
    <>
      <Parallax blur={{ min: -10, max: 10 }} bgImage={'/test1.png'} bgImageAlt="food" strength={-1000} className="hidden md:block">
        <div className="sticky top-0 left-1/2 bg-white h-[100vh] w-[50%] flex flex-col gap-8 text-center justify-center items-center">
          <div className="flex flex-col gap-4">
            <div className="text-[#8B0000] text-4xl">МАНАЙ РЕСТОРАН</div>
            <hr />
          </div>
          <div className="flex flex-col gap-8">
            {aboutRestaurant.map((restaurant) => (
              <div key={restaurant.title} className="flex flex-col gap-4">
                <h3 className="text-[#52071B] text-lg font-semibold">{restaurant.title}</h3>
                <h4 className="text-[#342216] text-base">{restaurant.description}</h4>
              </div>
            ))}
          </div>
        </div>
        <div className="sticky top-0 left-0 bg-white h-[100vh] w-[50%] flex flex-col gap-8 justify-center items-center text-center">
          <div className="flex flex-col gap-4">
            <div className="text-[#8B0000] text-4xl text-center">Тогоочийн тухай</div>
            <hr />
          </div>
          <div className="flex flex-col gap-8 max-w-[500px] text-justify">
            <h3 className="text-[#52071B] text-lg font-semibold">"Италид карьераа эхлүүлсэн"</h3>
            <h4 className="text-[#342216] text-base self-start">
              Тухайн үедээ гэрийнхээ бүх хоолыг хийдэг байсан би төгсөөд сонирхлынхоо дагуу тогоочоор суралцана хэмээн сэтгэл шулуудсан байв. Ийнхүү ахлах сургуулиа төгсөөд тогоочийн академид суралцаж
              мэргэжлийн тогооч болсон юм. Академидаа суралцаж төгсөөд 4-5 жил гал тогоонд ажилласан.
            </h4>
          </div>
        </div>
      </Parallax>
      <div className=" w-full bg-white py-6 flex flex-col gap-8 text-center justify-center items-center md:hidden">
        <div className="flex flex-col gap-4">
          <div className="text-[#8B0000] text-4xl">МАНАЙ РЕСТОРАН</div>
          <hr />
        </div>
        <div className="flex flex-col gap-8">
          {aboutRestaurant.map((restaurant) => (
            <div key={restaurant.title} className="flex flex-col gap-4">
              <h3 className="text-[#52071B] text-lg font-semibold">{restaurant.title}</h3>
              <h4 className="text-[#342216] text-base">{restaurant.description}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
