'use client';
import { Star } from 'lucide-react';

export default function Comments() {
  const comments = [
    { star: 5, title: 'Mаш тохилог гоё хоолтой газар байна', description: 'Mаш их таалагдлаа хурдан шуурхай үйлчилгээтэй байлаа' },
    { star: 1, title: 'тохилог гоё хоолтой газар байна', description: 'Mаш их таалагдлаа хурдан шуурхай үйлчилгээтэй байлаа' },
    { star: 3, title: 'гоё хоолтой газар байна', description: 'Mаш их таалагдлаа хурдан шуурхай үйлчилгээтэй байлаа' },
  ];
  return (
    <div className="flex gap-6 ">
      {comments.map((comment, index) => (
        <div className="flex  flex-col gap-7 p-28 border border-gray-100 text-justify" key={comment.title + index}>
          <div className="flex">
            <Star color="#FFEA00" fill="#FFEA00" />
            <Star color="#FFEA00" fill={comment.star !== 1 ? '#FFEA00' : 'white'} />
            <Star color="#FFEA00" fill={comment.star !== 1 && comment.star !== 2 ? '#FFEA00' : 'white'} />
            <Star color="#FFEA00" fill={comment.star !== 1 && comment.star !== 2 && comment.star !== 3 ? '#FFEA00' : 'white'} />
            <Star color="#FFEA00" fill={comment.star !== 1 && comment.star !== 2 && comment.star !== 3 && comment.star !== 4 ? '#FFEA00' : 'white'} />
          </div>
          <div className="text-[#8B0000] font-semibold text-base">{comment.title}</div>
          <div className="text-[#342216] text-xs">{comment.description}</div>
        </div>
      ))}
    </div>
  );
}
