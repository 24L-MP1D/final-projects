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
    chapters: [];
  };
}
export const ChaptersForm: React.FC<ChaptersFormProps> = ({ initialData }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toggleCreating = () => setIsCreating((x) => !x);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '' },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(`/api/courses/${initialData._id}/chapters`, values);
      toast.success('Chapter created');
      toggleCreating();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating && <>Cancel</>}
          {!isCreating && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="e.g Introduction to the course" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && <div className={cn('text-sm mt-2', !initialData.chapters.length && 'text-slate-500 italic')}>No chapters</div>}
      {!isCreating && <p className="text-sm text-muted-foreground mt-4">Drag and drop to reorder the chapters</p>}
    </div>
  );
};
