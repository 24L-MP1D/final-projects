import { Bookmark } from 'lucide-react';
import { useParams } from 'next/navigation';
import { formatTitle } from '../../recipe/[slug]/page';
import { Button } from '../ui/Button';
import { Stars } from './stars';

export const Item = ({ item }: { item: any }) => {
  const { img, title, rating, ratingNum, prepTime, id } = item;
  const { slug } = useParams();

  const formattedTitle = formatTitle(title);

  const defaultImg = 'https://static01.nyt.com/images/2014/03/07/dining/07pakoras/07pakoras-square640.jpg?quality=75&auto=webp';

  return (
    <div className="flex flex-col text-[#222222] border-[#d4d4d4] border-[1px] hover:shadow-[0px_0px_20px_-10px_#000] transition-shadow duration-150 w-[260px] h-[350px]">
      <a href={`recipe/${title}`} className="w-full h-[70%]">
        <img className="w-full h-full object-cover" src={img || defaultImg} alt={formattedTitle || 'Recipe Image'} />
      </a>

      <div className="flex flex-col justify-between p-[10px] h-[50%] relative">
        <span className="text-[16px] font-bold">{formattedTitle || 'KHoool'}</span>
        <div className="flex flex-col gap-0.5">
          <Stars size={11} rating={rating || 0} voteNum={ratingNum || 0} id={id} />
          <span className="text-[10px]">{prepTime || 'Prep Time'}</span>
        </div>
        <Button
          className="text-[#CCCCCC] p-2.5 absolute right-0 bottom-0"
          variant={'ghost'}
          onClick={() => {
            console.log(id);
          }}
        >
          <Bookmark size={24} />
        </Button>
      </div>
    </div>
  );
};
