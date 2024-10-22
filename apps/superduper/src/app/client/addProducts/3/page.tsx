'use client';

import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Page() {
  const [image, setImage] = useState<FileList | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  useEffect(() => {
    const url: string[] = [];
    if (image) {
      const imageUrl = URL.createObjectURL(image[0]);
      url.push(imageUrl);
      setImageUrls([...imageUrls, ...url]);
    }
  }, [image]);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (files) {
      setImage(files);
    }
  };

  return (
    <form className="pb-12">
      <div className="max-w-[50%] mx-auto mt-10">
        <div className="flex flex-col gap-1 max-w-[500px] mx-auto text-2xl">
          <div className="flex gap-2 items-center justify-center w-full text-[#00253e]">
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[70px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#00253e] h-0.5 w-[70px]"></div>
            <div className="p-0.5 border-2 border-[#00253e] rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#00253e]"></div>
            </div>
            <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
            </div>
            <div className="bg-[#f3f3f3] h-0.5 w-[70px]"></div>
            <div className="p-0.5 rounded-full">
              <div className="rounded-full w-4 h-4 bg-[#f3f3f3]"></div>
            </div>
          </div>
          <div className="flex gap-10 justify-center items-center ">
            <div>Category</div>
            <div>Detail</div>
            <div>Photos</div>
            <div className="text-[#f3f3f3]">Logistics</div>
            <div className="text-[#f3f3f3]">Review</div>
          </div>
        </div>
        <div className="mt-8 text-center text-[#333] text-[48px] mb-16">Upload photos and documents</div>
        <div className="flex  gap-4 text-[#333333]">
          <div className="max-w-[600px] grid gap-6 grid-cols-2 w-full">
            <div className="hover:cursor-pointer text-center h-[420px] row-span-3 col-span-2 border-dashed border-[1px] flex flex-col justify-center items-center relative p-4">
              <div>
                <Camera />
              </div>
              <div>Click or drag and drop an image to upload</div>
              <div className="mt-10">Front</div>
              <Input type="file" onChange={handleFileChange} className="absolute w-full h-full opacity-0 z-50" />
            </div>
            <div className="hover:cursor-pointer h-[200px] text-center border-dashed border-[1px] flex flex-col justify-center items-center relative p-4">
              <div>
                <Camera />
              </div>
              <div>Click or drag and drop an image to upload</div>
              <div className="mt-10">Back</div>
              <Input type="file" onChange={handleFileChange} className="absolute w-full h-full opacity-0 z-50" />
            </div>
            <div className="hover:cursor-pointer text-center border-dashed border-[1px] flex flex-col justify-center items-center relative p-4">
              <div>
                <Camera />
              </div>
              <div>Click or drag and drop an image to upload</div>
              <div className="mt-10">Details</div>
              <Input type="file" className="absolute w-full h-full opacity-0 z-50" />
            </div>
            <div className="hover:cursor-pointer text-center border-dashed border-[1px] flex flex-col justify-center items-center relative p-4">
              <div>
                <Camera />
              </div>
              <div>Click or drag and drop an image to upload</div>
              <div className="mt-10">Signature</div>
              <Input type="file" className="absolute w-full h-full opacity-0 z-50" />
            </div>
            <div className="hover:cursor-pointer text-center border-dashed border-[1px] flex flex-col justify-center items-center relative p-4">
              <div>
                <Camera />
              </div>
              <div>Click or drag and drop an image to upload</div>
              <div className="mt-10">Damage</div>
              <Input type="file" className="absolute w-full h-full opacity-0 z-50" />
            </div>
            <div className="hover:cursor-pointer text-center border-dashed border-[1px] flex flex-col justify-center items-center relative p-4">
              <div>
                <Camera />
              </div>
              <div>Click or drag and drop an image to upload</div>
              <div className="mt-10">Additional</div>
              <Input type="file" className="absolute w-full h-full opacity-0 z-50" />
            </div>
          </div>
          <div>
            <div className=" pb-12 border-b-2 border-black">
              <div className="text-2xl">Tips:</div>
              <ol className="flex flex-col gap-4 list-decimal px-5">
                <li>One photo of entire item as close as possible</li>
                <li>One detail shot, 25% of item unless item very smal</li>
                <li>Take in bright day light. Turn on flash</li>
                <li>Take at slight angle off center to avoid reflection and flash back</li>
                <li>Check clarity on computer before uploading. Reshoot if not in focus</li>
                <li>Remove from glass when possible</li>
                <li>Show scale and context; details and texture</li>
                <li>Use your own photos: we cannot accept a photograph of a photo of the work</li>
              </ol>
            </div>
            <div className="mt-4">
              <div>Examples:</div>
              <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-4">
                <Image className="border-2" src={'/images/handbag.jpg'} alt="a" width={200} height={200} />
                <Image className="border-2" src={'/images/handbag.jpg'} alt="a" width={200} height={200} />
                <Image className="border-2" src={'/images/handbag.jpg'} alt="a" width={200} height={200} />
                <Image className="border-2" src={'/images/handbag.jpg'} alt="a" width={200} height={200} />
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full justify-center fixed bottom-0 bg-[#ffffff] py-2 left-[50%] translate-x-[-50%]">
            <div>Click “continue” to save your progress for this step</div>
            <Link className="bg-slate-300 text-center py-2 px-4 rounded-lg" href={'/client/addProducts/2'}>
              BACK
            </Link>
            <Button type="submit">CONTINUE</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
