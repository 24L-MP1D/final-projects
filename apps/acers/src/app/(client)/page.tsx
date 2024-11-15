'use client';

import axios from 'axios';
import { decode } from 'jsonwebtoken';
import { Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HandyCarousel } from './components/homePageComponents/handyCarousel';
import { Stars } from './components/itemComponents/stars';
import { formatTitle } from './recipe/[slug]/page';
import TextBackground from './wrapper';
import { FavoriteRecipes } from './components/homePageComponents/favorites';

const formatSlugForNavigation = (slug: string) => {
  return slug.toLowerCase();
};

export default function Index() {
  const [collections, setCollections] = useState([]);

  const getCollection = async () => {
    const res = await axios('/api/collection');
    setCollections(res.data.res);
  };

  useEffect(() => {
    getCollection();
  }, []);

  console.log(collections);

  return (
    <div className="">
      <div className="flex flex-col gap-16 text-[#222222] ">
        <RecipeOfTheDay />
        <div className="flex flex-col gap-16 max-w-[80%] xl:max-w-[1160px] w-full m-auto">
          <AvailableContent />
          <FavoriteRecipes />
          <OccasionMeals />
          {collections.map((collection: any) => (
            <CollectionByAdmin key={collection._id} collection={collection} />
          ))}
        </div>
      </div>
    </div>
  );
}

const AvailableContent = () => {
  const [recipes, setRecipes] = useState([]);
  const [data, setData] = useState([]);
  const [token, setToken] = useState<null | string>(null);
  const [role, setRole] = useState('');

  const getRecipes = async (role: string) => {
    const res = await axios.post('/api/recipe/getRecipe', { role });
    console.log(res.data.hiddenData);
    setData(res.data.hiddenData);
  };

  useEffect(() => {
    const token = localStorage.getItem('authtoken');
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken) {
        const { role } = decodedToken as { role: string };

        setToken(token);
        setRole(role);
        getRecipes(role);
      }
    }
  }, []);

  if (!token) return;

  return (
    <div className="border-t-2 border-[#222222] max-w-[1110px] w-full m-auto flex flex-col gap-4">
      <TextBackground />
      <HandyCarousel data={data} name="available" />
    </div>
  );
};

const CollectionByAdmin = ({ collection }: { collection: any }) => {
  const [collectionItems, setCollectionItems] = useState([]);

  const getCollectionItems = async () => {
    const res = await axios.post('/api/recipe/getRecipe', { tags: collection.collection });
    setCollectionItems(res.data.hiddenData);
  };

  useEffect(() => {
    getCollectionItems();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl mt-3.5">{collection.name}</span>
      <HandyCarousel data={collectionItems} name={collection.name} />
    </div>
  );
};

const OccasionMeals = () => {
  const [holiday, setHoliday] = useState<null | string>();
  const [data, setData] = useState([]);
  const [holidays, setHolidays] = useState([]);

  const getRecipes = async () => {
    const body = holiday ? { tags: [holiday] } : null;
    const res = await axios.post(`/api/recipe/getRecipe`, body);
    setData(res.data.hiddenData);
  };

  const getHolidays = async () => {
    const res = await axios.get('/api/holidays');
    setHolidays(res.data);
  };

  useEffect(() => {
    getHolidays();
  }, []);

  useEffect(() => {
    getRecipes();
  }, [holiday]);

  return (
    <div className="border-t-2 border-[#222222] max-w-[1160px] w-full m-auto flex flex-col">
      <span className="text-[23px]">Баярын ширээ</span>
      <div className="mt-2 flex gap-1 flex-wrap mb-4">
        {holidays.map((day: { _id: any; name: string }) => (
          <span
            key={day.name}
            onClick={() => {
              if (day._id == holiday) {
                setHoliday(null);
                return;
              }
              setHoliday(day._id);
            }}
            className={`py-3 px-4 rounded-[4px] whitespace-nowrap ${holiday === day._id ? 'bg-[#fddc79]' : ' hover:bg-[#fddc79]'}`}
          >
            {day.name}
          </span>
        ))}
      </div>
      <HandyCarousel data={data} name="occastion" />
    </div>
  );
};

const RecipeOfTheDay = () => {
  const [data, setData] = useState({
    img: 'https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg?semt=ais_hybrid',
    title: 'Malaay Qumbe (Coconut Fish Curry)',
    description: 'This version of coconut fish curry leans heavily on xawaash, a spice blend that is at the heart of Somali cuisine.',
    rating: 0,
    ratingNum: 0,
    id: 'Trend',
    prepTime: '40 minutes',
  });

  const getRecipeOfTheDay = async () => {
    const res = await axios.get(`/api/recipe/trending`);
    setData(res.data[0]);
  };
  useEffect(() => {
    getRecipeOfTheDay();
  }, []);

  const { img, title, description, rating, ratingNum, id, prepTime } = data;
  const formatedTitle = formatTitle(title);
  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 max-w-[auto] md:max-w-[80%] xl:max-w-[1160px] w-full m-auto">
      <div className="relative bg-slate-500">
        <img
          src={img}
          className={`max-w-auto aspect-video sm:w-[710px] object-cover`}
          onClick={() => (window.location.href = `/recipe/${formatedTitle}`)}
        />
        <SaveButton id={id} className="absolute right-6 bottom-6" />
      </div>
      <div className="flex flex-col text-[#222222] max-w-[80%]">
        <span className="text-[#DF321B] text-[14px] font-bold">Recipe of the day</span>
        <span className="text-[31px]">{formatedTitle}</span>
        <span>{description}</span>
        <Stars size={11} rating={rating} voteNum={ratingNum} id={id} />
        <span>{prepTime}</span>
      </div>
    </div>
  );
};

const SaveButton = ({ id, className }: { id: string; className?: string }) => {
  const addToSaved = (id: string) => {
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
