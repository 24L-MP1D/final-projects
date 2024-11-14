'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

interface ChapterAccessFormProps {
  initialData: {
    _id: string;
    title?: string;
    description?: string;
    isFree?: boolean;
    courseId?: string;
  };
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const ChapterAccessForm: React.FC<ChapterAccessFormProps> = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((x) => !x);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: Boolean(initialData.isFree),
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(`/api/courses/${initialData.courseId}/chapters/${initialData._id}`, values);
      toast.success('Chapter access updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  }
  return (
    <div className="mt-6 border shadow-xl rounded-md p-4">
      <div className="prose flex items-center justify-between">
        <h4> Бүлгийн хандалт</h4>
        <button className="btn btn-ghost" onClick={toggleEdit}>
          {isEditing && <>Болих</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Хандалтыг засах
            </>
          )}
        </button>
      </div>

      {!isEditing && (
        <div className={cn('text-sm mt-2 text-red-500', !initialData.isFree && 'text-slate-500 italic')}>
          {initialData.isFree ? <>Энэ бүлэг урьдчилан харахыг үнэгүй болгов</> : <>Энэ бүлэг үнэгүй биш</>}
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="checkbox checkbox-primary" />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>Хэрэв та энэ бүлгийг урьдчилан харахыг үнэгүй болгохыг хүсвэл энэ хайрцгийг тэмдэглэнэ үү.</FormDescription>
                  </div>
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
