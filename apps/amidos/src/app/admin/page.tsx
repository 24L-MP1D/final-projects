'use client';

export default function Card2() {
  return (
    <>
      <div className="flex">
        <section className="bg-gray-2 pb-10  dark:bg-dark lg:pb-20 pt-6">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <SingleCard image="" CardTitle="Бүтээгдэхүүн" titleHref="/admin/food" btnHref="/admin/food" CardDescription="Меню хэсгийн хоол болон барааг өөрчдөхдөө энд дарна" Button="Үзэх" />
              <SingleCard image="" CardTitle="Захиалгууд" CardDescription="Хүргэлтэнд гарсан хоол" Button="Үзэх" titleHref="/admin/orders" btnHref="/admin/orders" />
              <SingleCard
                image=""
                CardTitle="Ширээ захиалгууд"
                CardDescription="Lorem ipsum dolor sit amet pretium consectetur adipiscing elit. Lorem consectetur adipiscing elit."
                Button="Үзэх"
                titleHref="/admin/tablesOrder"
                btnHref="/admin/tablesOrder"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const SingleCard = ({ image, Button, CardDescription, CardTitle, titleHref, btnHref }: any) => {
  return (
    <>
      {/*  */}
      <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <img src={image} alt="" className="w-full" />
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3>
            <a
              href={titleHref ? titleHref : '/#'}
              className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
            >
              {CardTitle}
            </a>
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">{CardDescription}</p>

          {Button && (
            <a
              href={btnHref ? btnHref : '#'}
              className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
            >
              {Button}
            </a>
          )}
        </div>
      </div>
      {/*  */}
    </>
  );
};
