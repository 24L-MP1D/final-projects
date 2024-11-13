import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProductType } from './productType';
import { TextGenerateEffect } from './ui/text-generate-effect';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';

export const ProductDetailImages = ({ oneProduct }: { oneProduct: ProductType }) => {
  const [frontImage, setFrontImage] = useState('');

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
        <div className="text-[40px]">{oneProduct.productName}</div>
        <div>NO.14214</div>
        <div className="flex gap-3">
          <div className="w-full">
            <Image className="object-cover rounded-lg w-full shadow drop-shadow-xl" src={frontImage} alt="front-image" width={1000} height={1000} />
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
      <div className="mt-16">
        <div className="grid grid-cols-2 gap-6 text-xl text-[#333]">
          {/* Product Name */}
          <div className="flex flex-col gap-2">
            <div className="text-sm text-[#565B60]">Бүтээгдэхүүний нэр</div>
            <div>
              <TextGenerateEffect words={oneProduct.productName} />
            </div>
          </div>

          {/* Country */}
          <div className="flex flex-col gap-2">
            <div className="text-sm text-[#565B60]">Тухайн зүйлийн гарал үүслийн улс</div>
            <div>
              <TextGenerateEffect words={oneProduct.Country} />
            </div>
          </div>

          {/* Additional Information */}
          <div className="flex flex-col gap-2">
            <div className="text-sm text-[#565B60]">Нэмэлт мэдээлэл</div>
            <div>
              <TextGenerateEffect words={oneProduct?.additionalInformation} />
            </div>
          </div>

          {/* Signatures */}
          <div className="flex flex-col gap-2">
            <div className="text-sm text-[#565B60]">Эхлэх үнэ</div>
            <div className="flex items-center">
              <TypewriterEffectSmooth words={words(String(oneProduct.startBid))} />
              <div className="text-3xl ml-2">₮</div>
            </div>
          </div>

          {/* Damage Section */}
          <div className="flex flex-col gap-2">
            <div className="text-sm text-[#565B60]">Гэмтэлтэй хэсэг</div>
            <div>
              <TextGenerateEffect words={oneProduct?.damage} />
            </div>
          </div>

          {/* Restoration Info */}
          <div className="flex flex-col gap-2">
            <div className="text-sm text-[#565B60]">Тухайн бараа сэргээгдсэн үү? Хэрэв тийм бол ямар хэмжээгээр?</div>
            <div>
              <TextGenerateEffect words={oneProduct?.restored} />
            </div>
          </div>

          {/* Start Bid */}

          <div className="flex flex-col gap-2">
            <div className="text-sm text-[#565B60]">Гарын үсэг</div>
            <div>
              <TextGenerateEffect words={oneProduct?.signatures} />
            </div>
          </div>

          {/* Currency */}
          {oneProduct.Currency && (
            <div className="flex flex-col gap-2">
              <div className="text-sm text-[#565B60]">Валют</div>
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
