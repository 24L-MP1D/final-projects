import { Star } from 'lucide-react';

export const Stars = ({ rating, voteNum, id, size }: { rating: number; voteNum: number; id: string; size: number }) => {
  return (
    <div className="flex gap-[5px] text-[#222222] items-center">
      <div className={`flex gap-[3px]`}>
        {Array(5)
          .fill(1)
          .map((_, index) => (
            <Star size={size} fill={(Math.round(rating) >= index + 1 && '#222222') || '#CCCCCC'} strokeWidth={0} key={`${id}_${index}`} />
          ))}
      </div>
      <span className="text-[12px]">{voteNum}</span>
    </div>
  );
};
