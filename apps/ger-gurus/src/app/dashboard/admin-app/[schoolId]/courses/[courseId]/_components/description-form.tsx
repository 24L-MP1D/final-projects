'use client';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
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
  description: z.string().min(1, {
    message: 'Title is required',
  }),
});

interface DescriptionFormProps {
  initialData: {
    _id: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    categoryId?: string;
  };
}
export const DescriptionForm: React.FC<DescriptionFormProps> = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((x) => !x);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: initialData?.description || '' },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.patch(`/api/courses/${initialData._id}`, values);
      toast.success('Course description updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  }
  return (
    <div className="mt-6 border shadow-xl rounded-md p-4">
      <div className="prose flex items-center justify-between">
        <h4>Курсын тайлбар</h4>
        <button className="btn btn-ghost hover:scale-105" onClick={toggleEdit}>
          {isEditing && <>Цуцлах</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Тайлбар засах
            </>
          )}
        </button>
      </div>
      {!isEditing && <h4 className={cn('mt-2', !initialData.description && 'text-slate-500 italic')}>{initialData.description || 'Тайлбар байхгүй'}</h4>}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Жишээ нь: Энэ курс нь ... тухай" disabled={isSubmitting} {...field} className="textarea textarea-primary" />
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
