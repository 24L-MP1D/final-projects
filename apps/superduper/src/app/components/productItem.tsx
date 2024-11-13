'use client';
import { LikeButton } from '@/components/heartLike/heartLikeButton';
import { ProductType } from '@/components/productType';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../styles.css';
import { CardBody, CardContainer, CardItem } from './ui/card';
export interface Product {
  Country: string;
  additionalInformation: string;
  backImage: string;
  category: string;
  city: string;
  countryOfOrigin: string;
  createdAt: string;
  damage: string;
  detailImage: string;
  email: string;
  endDate: string;
  firstName: string;
  frontImage: string;
  lastName: string;
  productName: string;
  restored: string;
  signatures: string;
  startBid: number;
  startDate: string;
  status: string;
  _id: string;
}

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
    <CardContainer containerClassName="p-0 w-full h-auto " key={product._id} className="hover:cursor-pointer ">
      <CardBody className="bg- relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-xl p-6 border h-auto">
        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white flex justify-between w-[330px] items-center">
          <p className="overflow-hidden text-nowrap text-ellipsis">
            {dayjs(product.startDate).format('YYYY.MM.DD')} - {dayjs(product.endDate).format('YYYY.MM.DD')}
          </p>
          <div className="absolute top-0 right-0 z-[100]" onClick={onClickFavourite}>
            <LikeButton isLiked={isClick} handleLike={() => ''} />
          </div>
        </CardItem>
        <Link href={`/client/productDetails/${product._id}`}>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image alt={product.frontImage} src={product.frontImage} width={100} height={100} className="!w-full !h-[200px] !object-cover rounded-md shadow-product" />
          </CardItem>
          <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white mt-5 overflow-hidden h-[30px]">
            {product.productName}
          </CardItem>

          <div className="flex justify-between items-center mt-5">
            <CardItem translateZ={20} href="https://twitter.com/mannupaaji" target="__blank" className="py-2 rounded-xl text-sm font-normal dark:text-white">
              {product.startBid}₮
            </CardItem>
            <button className="text-sm bg-slate-200 text-[#3a7bd5] p-2 rounded-xl">Дуудлага худалдаанд оролцох</button>
          </div>
        </Link>
      </CardBody>
    </CardContainer>
  );
}
