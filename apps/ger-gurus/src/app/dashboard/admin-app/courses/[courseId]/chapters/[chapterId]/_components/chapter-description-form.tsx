'use client';
import { Preview } from '@/components/preview';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
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

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.patch(`/api/courses/${initialData.courseId}/chapters/${initialData._id}`, values);
      toast.success('Chapter description updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  }
  return (
    <div className="mt-6 border rounded-md p-4 shadow-xl">
      <div className="font-medium flex items-center justify-between">
        Бүлгийн тайлбар
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea className="textarea textarea-primary form-control w-full" placeholder="" {...field}></textarea>
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
      )}
    </div>
  );
};
