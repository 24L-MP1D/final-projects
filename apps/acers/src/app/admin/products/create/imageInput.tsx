import { Plus, X } from 'lucide-react';
import { useRef, useState } from 'react';

export const ImageInput = ({ register }: { register: (name: string, value: File[]) => void }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newFiles];
        register('imagesFiles', updatedImages); // Use setValue to register files
        return updatedImages;
      });
    }
  };

  const deleteImage = (img: File) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image !== img);
      register('imagesFiles', updatedImages); // Update register on delete
      return updatedImages;
    });
  };

  return (
    <div className="rounded-[12px] p-6 bg-white">
      <span className="font-semibold text-sm">Бүтээгдэхүүний зураг</span>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" multiple onChange={handleFileChange} />
      <div className="flex gap-2 flex-wrap mt-4">
        {images.map((image, index) => (
          <div className="w-[125px] border-[1px] border-[#D6D8DB] border-dashed rounded-[16px] relative group" key={index}>
            <img className="object-cover w-full h-full" src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} />
            <button className="rounded-full w-5 h-5 -right-2.5 -top-2.5 bg-slate-600 text-white absolute group-hover:block hidden" onClick={() => deleteImage(image)}>
              <X size={13} className="m-auto" />
            </button>
          </div>
        ))}
        <button className="w-[125px] border-[1px] border-[#D6D8DB] border-dashed rounded-[16px] flex items-center justify-center" onClick={handleClick} type="button">
          <div className="rounded-full bg-[#ECEDF0]">
            <Plus size={26} strokeWidth={1.5} />
          </div>
        </button>
      </div>
      <span className="text-red-500 text-start"></span>
    </div>
  );
};
