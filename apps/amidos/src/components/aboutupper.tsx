'use client';
export default function Aboutupper() {
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
        backgroundRepeat: 'repeat-y',
      }}
    >
      <div className="sticky top-0 left-1/2 bg-white h-[100vh] w-[50%] flex flex-col gap-8 text-center justify-center">
        <div className="flex flex-col gap-4">
          <div className="text-[#8B0000] text-4xl">МАНАЙ РЕСТОРАН</div>
          <hr className="max-w-64 border-[#8B0000] border-[1px] ml-40" />
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
    </div>
  );
}
