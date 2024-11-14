'use client';

import ConfirmModal from '@/components/modals/confirm-modal';
import { fetcher } from '@/lib/fetcher';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ChapterActionProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({ disabled, courseId, chapterId, isPublished }: ChapterActionProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await fetcher().patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
        toast.success('Chapter unpublished ');
      } else {
        await fetcher().patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
        toast.success('Chapter published ');
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
      await fetcher().delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success('Нэгж хичээл устсан');
      router.refresh();
      router.push(`/admin-app/courses/${courseId}`);
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
