'use client';
import { FileUpload } from '@/components/file-upload';
import { fetcher } from '@/lib/fetcher';
import axios from 'axios';
import { File, Loader2, PlusCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as z from 'zod';

const formSchema = z.object({
  url: z.string().min(1),
});

interface Attachment {
  _id: string;
  createdAt?: string | null;
  url?: string;
  name?: string;
  courseId?: string;
}
interface AttachmentFormProps {
  initialData: {
    _id: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    categoryId?: string;
    attachments?: Attachment[];
  };
}
export const AttachmentForm: React.FC<AttachmentFormProps> = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const toggleEdit = () => setIsEditing((x) => !x);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/courses/${initialData._id}/attachments`, values);
      toast.success('Course description updated');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  }

  async function onDelete(id: string) {
    try {
      setDeletingId(id);
      await fetcher().delete(`/api/courses/${initialData._id}/attachments/${id}`);
      toast.success('Attachment deleted');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setDeletingId(null);
    }
  }
  return (
    <div className="mt-6 border shadow-xl rounded-md p-4">
      <div className="prose flex items-center justify-between">
        <h4>Курсын хавсралтууд</h4>
        <button className="btn btn-ghost hover:scale-105 transition" onClick={toggleEdit}>
          {isEditing && <>Болих</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Файл нэмэх
            </>
          )}
        </button>
      </div>
      {!isEditing && (
        <>
          {(initialData.attachments ?? []).length === 0 && <h4 className="text-sm mt-2 text-slate-500 italic">Хавсралт одоогоор алга байна</h4>}
          {(initialData.attachments ?? []).length > 0 && (
            <div className="space-y-2">
              {(initialData.attachments ?? []).map((attachment) => (
                <div key={attachment._id} className="flex items-center p-3 w-full bg-sky-200 border-sky-200 border text-sky-700 rounded-md">
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment._id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment._id && (
                    <button className="ml-auto hover:opacity-75 transition" onClick={() => onDelete(attachment._id)}>
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachments"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">Курсээ гүйцээхийн тулд оюутнуудад хэрэгтэй бүхнийг нэмээрэй</div>
        </div>
      )}
    </div>
  );
};
