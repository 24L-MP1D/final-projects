'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
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
  onReorder: () => void;
  onEdit: (id: string) => void;
}
export default function ChapterList({ chapters, onEdit, onReorder }: ChapterListProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable key={chapter._id} draggableId={chapter._id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm',
                      chapter.isPublished && 'bg-sky-100 border-sky-200 text-sky-700'
                    )}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <div
                      className={cn('px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition', chapter.isPublished && 'border-r-sky-200 hover: bg-sky-200')}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && <Badge>Free</Badge>}
                      <Badge className={cn('bg-slate-500 ', chapter.isPublished && 'bg-sky-700')}>{chapter.isPublished ? 'Published' : 'Draft'}</Badge>
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
