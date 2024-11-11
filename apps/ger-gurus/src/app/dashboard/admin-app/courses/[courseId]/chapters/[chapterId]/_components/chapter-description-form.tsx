'use client';
import Editor from '@/components/blockNoteEditor';
import { Preview } from '@/components/preview';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useCreateBlockNote } from '@blocknote/react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  description: z.string().min(1),
});

interface ChapterDescriptionFormProps {
  initialData: {
    _id: string;
    title?: string;
    description?: string;
    courseId: string;
  };
}
export const ChapterDescriptionForm: React.FC<ChapterDescriptionFormProps> = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((x) => !x);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const editor = useCreateBlockNote();

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const content = editor.document;
      console.log(content);
      const response = await axios.patch(`/api/courses/${initialData.courseId}/chapters/${initialData._id}`, content);
      toast.success('Chapter description updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  }
  return (
    <div className="mt-6 border rounded-md p-4 shadow-xl">
      <div className="prose flex items-center justify-between">
        <h4>Бүлгийн тайлбар</h4>
        <button className="btn btn-ghost hover:scale-105 transition" onClick={toggleEdit}>
          {isEditing && <>Болих</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Тайлбар засах
            </>
          )}
        </button>
      </div>
      {!isEditing && (
        <div className={cn('text-sm mt-2', !initialData.description && 'text-slate-500 italic')}>
          {!initialData.description && 'Тайлбар байхгүй'}
          {initialData.description && <Preview value={initialData.description} />}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Description field with custom editor */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* Integrate BlockNoteEditor with form */}
                    <Editor editor={editor} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <div className="flex items-center gap-2">
              <button disabled={!form.formState.isValid || form.formState.isSubmitting} type="submit" className="btn btn-primary btn-outline">
                Хадгалах
              </button>
            </div>
          </form>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/bqhwlU8qVsk?"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>

          <iframe
            src="https://player.vimeo.com/video/821101511?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            title="THANK YOU FOR NOT ANSWERING"
          ></iframe>
        </Form>
      )}
    </div>
  );
};
