'use client';

const userStats = [
  { id: 1, title: 'Gold users', description: 'Хэрэглэгчийн тоо', details: ['Хамаарах хоолны жорны тоо', 'Орлого'], numberOfRecipes: 190 },
  { id: 2, title: 'Silver users', description: 'Хэрэглэгчийн тоо', details: ['Хамаарах хоолны жорны тоо', 'Орлого'], numberOfRecipes: 340 },
  { id: 3, title: 'Bronze users', description: 'Хэрэглэгчийн тоо', details: ['Хамаарах хоолны жорны тоо', 'Орлого'], numberOfRecipes: 560 },
  { id: 4, title: 'Free users', description: 'Хэрэглэгчийн тоо', details: ['Хамаарах хоолны жорны тоо', ''], numberOfRecipes: 890 },
];

const additionalStats = [
  { id: 5, title: 'НИЙТ ОРЛОГО', details: [] },
  { id: 6, title: 'Хамгийн их үзсэн хоолны жор', details: ['үзсэн тоо', 'хамаарах орлого'] },
  { id: 7, title: 'Хамгийн их хандалттай хоолны жор', details: ['үзсэн тоо', 'хамаарах орлого'] },
  { id: 8, title: 'Хамгийн их хандалттай ангилал', details: ['үзсэн тоо', 'хамаарах орлого'] },
  { id: 9, title: 'Хамгийн их хандалттай TAG', details: ['үзсэн тоо', 'хамаарах орлого'] },
  // { id: 10, title: 'Нийт бүтээгдхүүн, хоолны жор', details: ['үзсэн тоо', 'хамаарах орлого'] },
];

export default function Home() {
  return (
    <div className="flex">
      <div className="flex flex-col bg-slate-100 rounded-xl mx-auto mt-2 p-5">
        <div className="text-center font-bold"> БИЗНЕСИЙН ҮЗҮҮЛЭЛТ</div>
        <div className="bg-slate-100 rounded-xl mx-auto mt-2 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {userStats.map(({ id, title, description, details, numberOfRecipes }) => (
              <div className="bg-white shadow-md rounded-lg p-4" key={id}>
                <h2 className="font-bold text-xl text-center">{title}</h2>
                <p className="font-semibold">
                  {description} - {numberOfRecipes}
                </p>

                {details.map((detail, index) => (
                  <p key={index}>{detail}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 mt-4">
            <h2 className="font-bold text-xl">{additionalStats[0].title}</h2>
            {additionalStats[0].details.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {additionalStats.slice(1).map(({ id, title, details }) => (
              <div className="bg-white shadow-md rounded-lg p-4" key={id}>
                <h2 className="font-bold text-xl text-center">{title}</h2>
                {details.map((detail, index) => (
                  <p key={index}>{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
