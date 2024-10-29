'use client';

import { Bookmark } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { HandyCarousel } from './components/homePageComponents/handyCarousel';
import { Stars } from './components/itemComponents/stars';
import { Button } from './components/ui/Button';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div className="">
      <div className="flex flex-col gap-16 text-[#222222] ">
        <RecipeOfTheDay />
        <div className="flex flex-col gap-16 max-w-[80%] xl:max-w-[1160px] w-full m-auto">
          <Suspense>
            <OccasionMeals />
          </Suspense>

          <GetTheLatest />
          <Popular />
        </div>
      </div>
    </div>
  );
}

const Popular = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <CheapAndEasyDinnerIdeas />
      <DiwaliRecipes />
      <div className="text-center">
        <Button className="py-3 px-[75px] rounded-full text-[14px] font-semibold border-[#CCCCCC] border-[1px]">See all Editors’ Collections</Button>
      </div>
    </div>
  );
};

const CheapAndEasyDinnerIdeas = () => {
  return (
    <div>
      <span className="text-2xl underline">Our Newest Recipes</span>
      <HandyCarousel data={Array(10).fill(1)} />
    </div>
  );
};

const EasyBakingRecipes = () => {
  return (
    <div>
      <span className="text-2xl underline">Easy Baking Recipes</span>
      <HandyCarousel data={Array(10).fill(1)} />
    </div>
  );
};

const DiwaliRecipes = () => {
  const id = 'willFix';
  return (
    <div className="flex flex-col gap-2">
      <a href={`/suggestion/${id}`} className=" text-2xl underline">
        Diwali Recipes
      </a>
      <HandyCarousel data={Array(10).fill(1)} />
    </div>
  );
};

const GetTheLatest = () => {
  return (
    <div className="border-t-2 border-[#222222] max-w-[1160px] w-full m-auto flex flex-col gap-4">
      <span className="text-[14px] font-bold">GET THE LATEST</span>
      <OurNewestRecipes />
      <MostPopularOfTheWeek />
    </div>
  );
};

const MostPopularOfTheWeek = () => {
  return (
    <div>
      <span className="text-2xl mt-3.5">Most Popular This Week</span>
      <HandyCarousel data={Array(10).fill(1)} />
    </div>
  );
};

const OurNewestRecipes = () => {
  return (
    <div>
      <span className="text-2xl underline">Our Newest Recipes</span>
      <HandyCarousel data={Array(10).fill(1)} />
    </div>
  );
};

const OccasionMeals = () => {
  const searchParams = useSearchParams();
  const holiday = searchParams.get('holiday');
  const handleHolidayChange = (name: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('holiday', name);

    window.history.pushState({}, '', `?${newSearchParams.toString()}`);
  };

  return (
    <div className="border-t-2 border-[#222222] max-w-[1160px] w-full m-auto flex flex-col">
      <span className="text-[23px]">Make Something to Celebrate</span>
      <span className="text-[17px]">Delicious recipes for Canadian Thanksgiving, Halloween, Diwali and more.</span>
      <div className="mt-2 flex gap-1 flex-wrap mb-4">
        {holidays.map((day) => (
          <span key={day.name} onClick={() => handleHolidayChange(day.name)} className={`py-3 px-4 rounded-[4px] whitespace-nowrap ${holiday === day.name ? 'bg-[#fddc79]' : ' hover:bg-[#fddc79]'}`}>
            {day.name}
          </span>
        ))}
      </div>
      <HolidayCarousal />
    </div>
  );
};

const HolidayCarousal = () => {
  // will fetch here
  return <HandyCarousel data={Array(5).fill(1)} />;
};

const RecipeOfTheDay = () => {
  const router = useRouter();
  const [data, setData] = useState({
    img: 'https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg?semt=ais_hybrid',
    title: 'Malaay Qumbe (Coconut Fish Curry)',
    description: 'This version of coconut fish curry leans heavily on xawaash, a spice blend that is at the heart of Somali cuisine.',
    rating: 0,
    ratingNum: 0,
    id: 'Trend',
    prepTime: '40 minutes',
  });
  const { img, title, description, rating, ratingNum, id, prepTime } = data;
  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 max-w-[auto] md:max-w-[80%] xl:max-w-[1160px] w-full m-auto">
      <div className="relative bg-slate-500">
        <img src={img} className={`max-w-auto sm:w-[710px] object-center`} onClick={() => router.push(`/product/${id}`)} />
        <SaveButton id={id} className="absolute right-6 bottom-6" />
      </div>
      <div className="flex flex-col text-[#222222] max-w-[80%]">
        <span className="text-[#DF321B] text-[14px] font-bold">Recipe of the day</span>
        <span className=" text-[31px]">{title}</span>
        <span>{description}</span>
        <Stars size={11} rating={rating} voteNum={ratingNum} id={id} />
        <span className={``}>{prepTime}</span>
      </div>
    </div>
  );
};

const SaveButton = ({ id, className }: { id: string; className?: string }) => {
  const addToSaved = (id: string) => {
    // here will be fucntion
    console.log(id);
  };
  return (
    <button
      onClick={() => {
        addToSaved(id);
      }}
      className={`border-[#CCCCCC] border-[1px] bg-[#FFFFFF] text-center content-center rounded-full p-[10px] ${className}`}
    >
      <Bookmark size={20} />
    </button>
  );
};

const holidays = [
  { name: "New Year's Day" },
  { name: "Valentine's Day" },
  { name: 'Easter' },
  { name: 'Independence Day' },
  { name: 'Halloween' },
  { name: 'Thanksgiving' },
  { name: 'Christmas' },
  { name: 'Diwali' },
  { name: 'Hanukkah' },
  { name: 'Lunar New Year' },
];
