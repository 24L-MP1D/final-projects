'use client';
import Editor from '@/components/blockNoteEditor';
import { Preview } from '@/components/preview';
import { cn } from '@/lib/utils';
import { useCreateBlockNote } from '@blocknote/react';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface ChapterDescriptionFormProps {
  initialData: {
    _id: string;
    description?: string;
    courseId: string;
  };
}
export const ChapterDescriptionForm: React.FC<ChapterDescriptionFormProps> = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((x) => !x);
  const router = useRouter();
  const editor = useCreateBlockNote();

  async function onSubmit() {
    try {
      const content = editor.document;
      console.log(content);
      await axios.patch(`/api/courses/${initialData.courseId}/chapters/${initialData._id}`, content);
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
        <>
          <Editor onChange={() => {}} initialContent={document.content} />
          <div className="flex items-center gap-2">
            <button disabled={true} type="submit" className="btn btn-primary btn-outline" onClick={onSubmit}>
              Хадгалах
            </button>
          </div>
        </>
      )}
    </div>
  );
};
