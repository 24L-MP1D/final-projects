'use client';

import ConfirmModal from '@/components/modals/confirm-modal';
import { fetcher } from '@/lib/fetcher';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface CourseActionProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const CourseActions = ({ disabled, courseId, isPublished }: CourseActionProps) => {
  const params = useParams();
  const schoolId = params?.schoolId;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await fetcher().patch(`/api/courses/${courseId}/unpublish`);
        toast.success('Course unpublished ');
      } else {
        await fetcher().patch(`/api/courses/${courseId}/publish`);
        toast.success('Course published ');
      }
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await fetcher().delete(`/api/courses/${courseId}`);
      toast.success(' хичээл устсан');
      router.refresh();
      router.push(`/admin-app/${schoolId}/courses`);
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <button onClick={onClick} disabled={disabled || isLoading} className="btn btn-primary btn-sm btn-outline shadow-xl">
        {isPublished ? 'Нийтлэхгүй' : 'Нийтлэх'}
      </button>
      <ConfirmModal onConfirm={onDelete}>
        <button className="btn btn-neutral btn-sm hover:scale-105 transition shadow-xl" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </button>
      </ConfirmModal>
    </div>
  );
};
