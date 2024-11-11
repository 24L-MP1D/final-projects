import { Star } from 'lucide-react';
import React, { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (index: number) => {
    onRatingChange(index + 1);
  };

  const getStarClass = (index: number) => {
    const effectiveRating = hoverRating !== null ? hoverRating : rating;
    if (index < Math.floor(effectiveRating)) {
      return 'text-yellow-500';
    }
    if (index === Math.floor(effectiveRating) && effectiveRating % 1 > 0) {
      return 'text-yellow-500';
    }
    return 'text-gray-300';
  };

  return (
    <div className="flex cursor-pointer" onMouseLeave={handleMouseLeave}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="relative w-6 h-6" onMouseEnter={() => handleMouseEnter(index)} onClick={() => handleClick(index)}>
          <Star className={`absolute w-6 h-6 ${getStarClass(index)}`} />
          {index === Math.floor(rating) && rating % 1 > 0 && (
            <div className="absolute top-0 left-0 w-6 h-6 overflow-hidden" style={{ clipPath: 'inset(0 0 0 50%)' }}>
              <Star className="text-yellow-500" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
