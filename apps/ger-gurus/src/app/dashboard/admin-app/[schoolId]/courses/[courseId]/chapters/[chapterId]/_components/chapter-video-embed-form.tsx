'use client';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { fetcher } from '@/lib/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, PlusCircle, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  videoEmbedUrl: z.string().min(1),
});

interface ChapterVideoEmbedFormProps {
  initialData: {
    _id: string;
    videoEmbedUrl?: string;
    courseId: string;
  };
}
export const ChapterVideoEmbedForm: React.FC<ChapterVideoEmbedFormProps> = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((x) => !x);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { videoEmbedUrl: initialData.videoEmbedUrl || '' },
  });
  const { isSubmitting, isValid } = form.formState;

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

          {!isEditing && !initialData.videoEmbedUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Видео нэмэх
            </>
          )}

          {!isEditing && initialData.videoEmbedUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Видеог засах
            </>
          )}
        </button>
      </div>
      {!isEditing &&
        (!initialData.videoEmbedUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="h-96">
            <div className="relative p-0 aspect-video h-full w-full">
              <iframe
                src={initialData.videoEmbedUrl}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                className="absolute top-0 left-0 w-full h-full"
                title="Хялбар механизм"
              ></iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js"></script>
          </div>
        ))}

      {isEditing && (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="videoEmbedUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Курсын танилцуулга" disabled={isSubmitting} {...field} className="input input-primary input-bordered" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-2">
                <button disabled={!isValid || isSubmitting} type="submit" className="btn btn-primary btn-outline">
                  Хадгалах
                </button>
              </div>
            </form>
          </Form>
          <div className="test-xs text-muted-foreground mt-4">Энэ бүлгийн видеоны линкийг оруулна уу</div>
        </div>
      )}
    </div>
  );
};
