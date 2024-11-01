'use client';
import { Button } from '@/components/ui/button';
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

interface ChapterDescriptionFormProps {
  initialData: {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
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
      const response = await axios.patch(`/api/courses/${initialData._id}`, values);
      toast.success('Course description updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
     
      <div className="font-medium flex items-center justify-between">
        Course description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>
      {/* {!isEditing && <p className={cn('text-sm mt-2', !initialData.description && 'text-slate-500 italic')}>{initialData.description || 'No description'}</p>} */}
      
    </div>
  );
};
