'use client';
import { FileUpload } from '@/components/file-upload';
import { Button } from '@/components/ui/button';
import { fetcher } from '@/lib/fetcher';
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
    muxData?: any;
  };
  courseId: string;
  chapterId: string;
}
export const ChapterVideoForm: React.FC<ChapterVideoFormProps> = ({ initialData, courseId, chapterId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((x) => !x);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetcher().patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success('Chapter updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}

          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">Video uploaded!</div>
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
          <div className="test-xs text-muted-foreground mt-4">Upload this chapter's video</div>
        </div>
      )}

      {initialData.videoUrl && !isEditing && <div className="text-xs text-muted-foreground mt-2">Videos can take a few minutes to process. Refresh the page if video does not appear.</div>}
    </div>
  );
};
