'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
});

interface ChapterTitleFormProps {
  initialData: {
    _id: string; // Converted to string
    title?: string;
    description?: string;
    videoUrl?: string;
    courseId?: string; // Converted to string
    isPublished?: boolean;
    isFree?: boolean;
    position?: number;
  };
}
export const ChapterTitleForm: React.FC<ChapterTitleFormProps> = ({ initialData }) => {
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
      toast.success('Course updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Бүлгийн нэр
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Болих</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Нэр засах
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Курсын танилцуулга" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Хадгалах
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
