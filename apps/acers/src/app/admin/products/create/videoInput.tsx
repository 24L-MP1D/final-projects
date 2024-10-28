import { Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const VideoInput = ({ register }: { register: (name: string, value: File | null) => void }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedVideo = files[0];
      setVideo(selectedVideo);
      register('videoFile', selectedVideo);
    }
  };

  const deleteVideo = () => {
    setVideo(null);
    setVideoURL(null);
    register('videoFile', null); // Clear the register
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the input value
    }
  };

  useEffect(() => {
    if (video) {
      const url = URL.createObjectURL(video);
      setVideoURL(url);

      // Cleanup function to revoke the object URL
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [video]);

  return (
    <div className="rounded-[12px] p-6 bg-white">
      <span className="font-semibold text-sm">Бүтээгдэхүүний видео</span>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="video/*" onChange={handleFileChange} />
      <div className="flex gap-2 flex-wrap mt-4">
        {video ? (
          <div className="w-[125px] border-[1px] border-[#D6D8DB] border-dashed rounded-[16px] relative group flex gap-2">
            <video className="object-cover w-full h-full" controls>
              <source src={videoURL || ''} type={video.type} />
              Your browser does not support the video tag.
            </video>
            <p className="text-xs text-center mt-1 w-full">{video.name}</p>
            <button className="rounded-full w-5 h-5 -right-2.5 -top-2.5 bg-slate-600 text-white absolute group-hover:block hidden" onClick={deleteVideo}>
              <X size={13} className="m-auto" />
            </button>
          </div>
        ) : (
          <button className="w-[125px] border-[1px] border-[#D6D8DB] border-dashed rounded-[16px] flex items-center justify-center" onClick={handleClick} type="button">
            <div className="rounded-full bg-[#ECEDF0]">
              <Plus size={26} strokeWidth={1.5} />
            </div>
          </button>
        )}
      </div>
      <span className="text-red-500 text-start"></span>
    </div>
  );
};
