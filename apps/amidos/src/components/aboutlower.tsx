'use client';
export default function Aboutlower() {
  const aboutRestaurant = [
    { title: 'АЖИЛЛАХ ЦАГ', description: 'Monday to Friday - 09:00 - 00:00am' },
    { title: 'ХОЛБОО БАРИХ ', description: '99769901, 88819900' },
    { title: 'ХАЯГ', description: 'МОНКОН БАРИЛГА 1-Р ДАВХАР' },
  ];
  return (
    <div
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-photo/food-set-dishes-white-table-food-background-top-view-free-copy-space_187166-16569.jpg?w=1380')",
        height: '100vh',
        width: '100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="sticky top-0 left-0 bg-white h-[100vh] w-[50%] flex flex-col gap-8 justify-center items-center text-center ">
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
    </div>
  );
}
