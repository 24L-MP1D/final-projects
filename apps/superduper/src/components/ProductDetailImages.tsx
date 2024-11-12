import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProductType } from './productType';
import { TextGenerateEffect } from './ui/text-generate-effect';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';
export const ProductDetailImages = ({ oneProduct }: { oneProduct: ProductType }) => {
  const [frontImage, setFrontImage] = useState('');
  const [animate, setAnimat] = useState(false);
  const words = (text: string) => {
    const array = [];
    for (let i = 0; i < text.length; i++) {
      array.push({ text: text[i] });
    }
    return array;
  };

  useEffect(() => {
    setFrontImage(oneProduct.frontImage);
  }, []);

  return (
    <div className="max-w-[750px] mx-auto w-full ">
      <div>
        <div>NO.14214</div>
        <div className="text-[30px]">{oneProduct.productName}</div>
        <div className="flex gap-3">
          <div className="w-full relative">
            <motion.img
              key={frontImage}
              src={frontImage}
              alt="Selected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ width: '100%', borderRadius: '8px', maxHeight: '650px', objectFit: 'cover', marginBottom: '20px' }}
            />{' '}
          </div>
          <div className="flex flex-col gap-3 relative">
            <Image
              onClick={() => setFrontImage(oneProduct.frontImage)}
              className="object-cover rounded-lg w-[150px] h-[150px] hover:cursor-pointer shadow drop-shadow-xl"
              src={oneProduct.frontImage}
              alt="front-image"
              width={1000}
              height={1000}
            />

            <Image
              onClick={() => setFrontImage(oneProduct.backImage)}
              className={`object-cover  w-[150px] h-[150px] rounded-lg shadow hover:cursor-pointer drop-shadow-xl`}
              src={oneProduct.backImage}
              alt="front-image"
              width={1000}
              height={1000}
            />

            <Image
              onClick={() => setFrontImage(oneProduct.detailImage)}
              className="object-cover w-[150px] h-[150px] rounded-lg shadow hover:cursor-pointer aspect-video drop-shadow-xl"
              src={oneProduct.detailImage}
              alt="front-image"
              width={1000}
              height={1000}
            />

            {oneProduct.damageImage && (
              <div className="border-solid border-[1px] flex-1 cursor-pointer">
                <Image
                  onClick={() => setFrontImage(oneProduct.damageImage)}
                  className="object-cover w-[150px] h-[150px] shadow rounded-lg  drop-shadow-xl"
                  src={oneProduct.damageImage}
                  alt="front-image"
                  width={1000}
                  height={1000}
                />
              </div>
            )}
            {oneProduct.signatureImage && (
              <div className="border-solid border-[1px] flex-1 cursor-pointer">
                <Image
                  onClick={() => setFrontImage(oneProduct.signatureImage)}
                  className="object-cover  w-[150px] h-[150px] shadow rounded-lg drop-shadow-xl"
                  src={oneProduct.signatureImage}
                  alt="front-image"
                  width={1000}
                  height={1000}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 px-6 py-6">
        <div className="border-b-2 py-6 grid grid-cols-2 text-[#000000]  gap-5 text-xl items-center justify-center">
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Бүтээгдэхүүний нэр</div>
            <div className="w-full">
              <TextGenerateEffect words={oneProduct.productName} />
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Тухайн зүйлийн гарал үүслийн улс</div>
            <div>
              <TextGenerateEffect words={oneProduct.Country} />
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Нэмэлт мэдээлэл</div>
            <div>
              <TextGenerateEffect words={oneProduct?.additionalInformation} />
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Гарын үсэг</div>
            <div>
              <TextGenerateEffect words={oneProduct?.signatures} />
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Гэмтэлтэй хэсэг</div>
            <div>
              <TextGenerateEffect words={oneProduct?.damage} />
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Тухайн бараа сэргээгдсэн үү? Хэрэв тийм бол ямар хэмжээгээр?</div>
            <div>
              <TextGenerateEffect words={oneProduct?.restored} />
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <div className="text-[#565B60] text-sm">Эхлэх үнэ</div>
            <div className="flex items-center">
              <TypewriterEffectSmooth words={words(String(oneProduct.startBid))} />
              <div className="text-3xl">₮</div>
            </div>
          </div>
          {oneProduct.Currency && (
            <div className="flex gap-2 flex-col">
              <div className="text-[#565B60] text-sm">Валют</div>
              <div>
                <TextGenerateEffect words={oneProduct.Currency} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
