'use client';
import { LikeButton } from '@/components/heartLike/heartLikeButton';
import { ProductType } from '@/components/productType';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CardBody, CardContainer, CardItem } from './ui/card';

export function ProductItem({ product, favourite, onClickFavourite }: { product: ProductType; isClick: boolean; favourite: string[]; onClickFavourite: () => void }) {
  const [isClick, setClick] = useState(false);

  useEffect(() => {
    if (favourite) {
      setClick(favourite.includes(product._id));
    } else {
      setClick(false);
    }
  }, [favourite]);

  return (
    <CardContainer containerClassName="p-0 w-full h-auto " key={product.productName} className="hover:cursor-pointer">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-xl p-6 border h-auto">
        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white flex justify-between w-[330px] items-center">
          <p className="overflow-hidden text-nowrap text-ellipsis w-[200px]">{product.productName}</p>
          <div className="absolute top-0 right-0 z-[100]" onClick={onClickFavourite}>
            <LikeButton isLiked={isClick} handleLike={() => ''} />
          </div>
        </CardItem>
        <Link href={`/client/productDetails/${product._id}`}>
          <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm mt-2 dark:text-neutral-300">
            {product.description}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image alt={product.frontImage} src={product.frontImage} width={100} height={100} className="!w-full !h-[200px] !object-cover rounded-md" />
          </CardItem>
          <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white mt-5">
            {product.category}
          </CardItem>
          <CardItem translateZ="50" className="text-lg font-bold text-neutral-600 dark:text-white">
            {product.startBid}$
          </CardItem>
          <div className="flex justify-between items-center">
            <CardItem translateZ={20} href="https://twitter.com/mannupaaji" target="__blank" className="py-2 rounded-xl text-sm font-normal dark:text-white">
              Bid now →
            </CardItem>
            <button className="text-sm bg-slate-200 text-blue-700 w-[70px] h-[30px] rounded-xl">Дуудах</button>
          </div>
        </Link>
      </CardBody>
    </CardContainer>
  );
}
