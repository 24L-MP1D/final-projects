'use client';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
  price: z.coerce.number(),
});

interface PriceFormProps {
  initialData: {
    _id: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    categoryId?: string;
  };
}
export const PriceForm: React.FC<PriceFormProps> = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((x) => !x);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { price: initialData?.price || 0 },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.patch(`/api/courses/${initialData._id}`, values);
      toast.success('Course price updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Курсын үнэ
        <button className="btn btn-ghost hover:scale-105 transition" onClick={toggleEdit}>
          {isEditing && <>Болих</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Үнэ засах
            </>
          )}
        </button>
      </div>
      {!isEditing ? (
        <p className={cn('text-sm mt-2', !initialData.price && 'text-slate-500 italic')}>{initialData.price ? initialData.price : 'Үнэ байхгүй'}</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Жишээ нь: Курсын үнээ оруулна уу" type="number" disabled={isSubmitting} {...field} className="input input-primary" />
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
