'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Grip, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
interface Chapter {
  _id: string;
  title: string;
  courseId: string;
  isPublished?: boolean;
  isFree?: boolean;
  position: number;
  // Add other properties here if needed
}
interface ChapterListProps {
  chapters: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}
export default function ChapterList({ chapters, onEdit, onReorder }: ChapterListProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const [reorderedItem] = chapters.splice(result.source.index, 1);
    chapters.splice(result.destination.index, 0, reorderedItem);
    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);
    const updatedChapters = chapters.slice(startIndex, endIndex + 1);
    const bulkUpdatedata = updatedChapters.map((chapter) => ({
      id: chapter._id,
      position: chapters.findIndex((item) => item._id === chapter._id),
    }));
    onReorder(bulkUpdatedata);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable key={chapter._id} draggableId={chapter._id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4  shadow-xl',
                      chapter.isPublished && 'bg-sky-100 border-sky-200 text-sky-700'
                    )}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <div
                      className={cn('px-2 py-3 border-r border-r-slate-200 hover:bg-slate-400 rounded-l-md transition', chapter.isPublished && 'border-r-sky-200 hover: bg-sky-200')}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && <Badge>Free</Badge>}
                      <Badge className={cn('bg-slate-500 shadow-xl', chapter.isPublished && 'bg-sky-700 shadow-xl')}>{chapter.isPublished ? 'Published' : 'Draft'}</Badge>
                      <Pencil onClick={() => onEdit(chapter._id)} className="w-4 h-4 cursor-pointer hover: opacity-75 transition" />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
