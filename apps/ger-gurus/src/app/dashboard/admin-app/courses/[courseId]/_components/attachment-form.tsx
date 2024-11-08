'use client';
import { FileUpload } from '@/components/file-upload';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';
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
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && <>{(initialData.attachments ?? []).length === 0 && <p className="text-sm mt-2 text-slate-500 italic">No attachments yet</p>}</>}
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
          <div className="test-xs text-muted-foreground mt-4">Add anything your students might need to complete the course</div>
        </div>
      )}
    </div>
  );
};
