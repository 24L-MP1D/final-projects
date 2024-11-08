'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import ChapterList from './chapterList';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});

interface ChaptersFormProps {
  initialData: {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    chapters: Chapter[];
  };
}

interface Chapter {
  _id: string;
  title: string;
  courseId: string;
  isPublished?: boolean;
  isFree?: boolean;
  position: number;
  // Add other properties here if needed
}
export const ChaptersForm: React.FC<ChaptersFormProps> = ({ initialData }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>(initialData.chapters);
  const toggleCreating = () => setIsCreating((x) => !x);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '' },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/courses/${initialData._id}/chapters`, values);
      toast.success('Chapter created');
      toggleCreating();
      const response = await axios.get(`/api/courses/${initialData._id}/chapters`);
      setChapters(response.data);
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  }

  async function onReorder(updateData: { id: string; position: number }[]) {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${initialData._id}/chapters/reorder`, { list: updateData });
      toast.success('Chapters reordered successfully');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsUpdating(false);
    }
  }

  const onEdit = (id: string) => {
    router.push(`/admin-app/courses/${initialData._id}/chapters/${id}`);
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Курсын бүлгүүд
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating && <>Болих</>}
          {!isCreating && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Бүлэг нэмэх
            </>
          )}
        </Button>
      </div>
      {/* {!isCreating && ( */}
      <div className={cn('text-sm mt-2', !initialData.chapters?.length && 'text-slate-500 italic')}>
        {!initialData.chapters.length && 'Бүлэг байхгүй'}
        <ChapterList onEdit={onEdit} onReorder={onReorder} chapters={chapters || []} />
      </div>
      {/* )} */}
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Жишээ нь: Курсын танилцуулга" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={!isValid || isSubmitting} type="submit">
              Үүсгэх
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && <p className="text-sm text-muted-foreground mt-4">Бүлгүүдийг чирж, байрлалыг өөрчилнө үү</p>}
    </div>
  );
};
