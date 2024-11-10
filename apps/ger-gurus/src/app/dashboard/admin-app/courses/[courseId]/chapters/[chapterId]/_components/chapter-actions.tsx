'use client';

import ConfirmModal from '@/components/modals/confirm-modal';
import { Trash } from 'lucide-react';

interface ChapterActionProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({ disabled, courseId, chapterId, isPublished }: ChapterActionProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <button onClick={() => {}} disabled={disabled} className="btn btn-primary btn-sm btn-outline">
        {isPublished ? 'Нийтлэхгүй' : 'Нийтлэх'}
      </button>
      <ConfirmModal onConfirm={() => {}}>
        <button className="btn btn-neutral btn-sm hover:scale-105 transition">
          <Trash className="h-4 w-4" />
        </button>
      </ConfirmModal>
    </div>
  );
};
