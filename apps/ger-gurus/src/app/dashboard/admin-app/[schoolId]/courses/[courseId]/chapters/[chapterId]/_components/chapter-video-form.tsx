'use client';
import { FileUpload } from '@/components/file-upload';
import { fetcher } from '@/lib/fetcher';
import MuxPlayer from '@mux/mux-player-react';
import { Pencil, PlusCircle, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

interface ChapterVideoFormProps {
  initialData: {
    _id: string;
    videoUrl?: string;
    courseId: string;
  };
  playbackId: string;
}
export const ChapterVideoForm: React.FC<ChapterVideoFormProps> = ({ initialData, playbackId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((x) => !x);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetcher().patch(`/api/courses/${initialData.courseId}/chapters/${initialData._id}`, values);
      toast.success('Chapter updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  }

  return (
    <div className="mt-6 border rounded-md p-4 shadow-xl">
      <div className="prose flex items-center justify-between">
        <h4>Бүлгийн видео</h4>
        <button className="btn btn-ghost" onClick={toggleEdit}>
          {isEditing && <>Болих</>}

          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Видео нэмэх
            </>
          )}

          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Видеог засах
            </>
          )}
        </button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative !aspect-video mt-2">
            <MuxPlayer playbackId={playbackId || ''} />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="test-xs text-muted-foreground mt-4">Энэ бүлгийн видеог ачаалж оруулна уу</div>
        </div>
      )}

      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">Видеог боловсруулахад хэдэн минут шаардлагатай байж болно. Видео харагдахгүй бол хуудас дахин ачаална уу.</div>
      )}
    </div>
  );
};
