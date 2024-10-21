'use client';

import { Star, Bookmark } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div className="">
      <div className="flex flex-col gap-16 max-w-[1160px] w-full m-auto text-[#222222]">
        <RecipeOfTheDay />
        <OccasionMeals />
      </div>
    </div>
  );
}

const OccasionMeals = () => {
  const searchParams = useSearchParams();
  const holiday = searchParams.get("holiday");
  const handleHolidayChange = (name:string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("holiday", name);
    
    window.history.pushState({}, '', `?${newSearchParams.toString()}`);
  };

  return (
    <div className="border-t-2 border-[#222222] max-w-[1160px] w-full m-auto flex flex-col">
      <span className="text-[23px]">Make Something to Celebrate</span>
      <span className="text-[17px]">Delicious recipes for Canadian Thanksgiving, Halloween, Diwali and more.</span>
      <div className="mt-2 flex gap-1 flex-wrap">
        {holidays.map((day) => (
          <span
            key={day.name}
            onClick={() => handleHolidayChange(day.name)}
            className={`py-3 px-4 rounded-[4px] whitespace-nowrap ${holiday === day.name ? 'bg-[#fddc79]' : ' hover:bg-[#fddc79]'}`}
          >
            {day.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const RecipeOfTheDay = () => {
  const router = useRouter();
  const [data, setData] = useState({
    img: 'https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg?semt=ais_hybrid',
    title: 'Malaay Qumbe (Coconut Fish Curry)',
    description: 'This version of coconut fish curry leans heavily on xawaash, a spice blend that is at the heart of Somali cuisine.',
    rating: 0,
    voteNum: 0,
    id: 'Trend',
    prepTime: '40 minutes',
  });
  const { img, title, description, rating, voteNum, id, prepTime } = data;
  return (
    <div className="flex items-center gap-10">
      <div className="relative bg-slate-500">
        <img src={img} className={`w-[710px] object-center`} onClick={() => router.push(`/product/${id}`)} />
        <SaveButton id={id} className="absolute right-6 bottom-6" />
      </div>
      <div className="flex flex-col text-[#222222]">
        <span className="text-[#DF321B] text-[14px] font-bold">Recipe of the day</span>
        <span className=" text-[31px]">{title}</span>
        <span>{description}</span>
        <Stars rating={rating} voteNum={voteNum} id={id} />
        <span className={``}>{prepTime}</span>
      </div>
    </div>
  );
};

export const Stars = ({ rating, voteNum, id }: { rating: number; voteNum: number; id: string }) => {
  return (
    <div className="flex gap-[5px] text-[#222222] items-center">
      <div className={`flex gap-[3px]`}>
        {Array(5)
          .fill(1)
          .map((_, index) => (
            <Star fill={(Math.round(rating) >= index + 1 && '#222222') || '#CCCCCC'} strokeWidth={0} key={`${id}_${index}`} />
          ))}
      </div>
      <span className="text-[12px]">{voteNum}</span>
    </div>
  );
};

export const SaveButton = ({ id, className }: { id: string; className: string }) => {
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
