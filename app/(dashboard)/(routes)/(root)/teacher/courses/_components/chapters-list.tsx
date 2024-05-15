'use client';

import { Chapter } from '@prisma/client';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Grip, Pencil } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ChaptersList = ({ items, onReorder, onEdit }: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    console.log(result);

    if (!result.destination) return;

    //Tạo bạn sao các chương
    const items = Array.from(chapters);
    //cắt  item khỏi mảng
    const [reorderedItem] = items.splice(result.source.index, 1);
    // thêm item vào đích đến
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    console.log('startIndex', startIndex);

    const endIndex = Math.max(result.source.index, result.destination.index);
    console.log('endIndex', endIndex);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);
    console.log('items', items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    console.log('bulkUpdateData', bulkUpdateData);

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      'flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm',
                      chapter.isPublished && 'bg-sky-100 border-sky-200 text-sky-700',
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        'px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition',
                        chapter.isPublished && 'border-r-sky-200 hover:bg-sky-200',
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <span className="line-clamp-1">{chapter.title}</span>
                    <div className="ml-auto pr-2 flex items-center gap-x-4">
                      {chapter.isFree && <Badge className="text-center min-w-[110px]">Miễn phí</Badge>}
                      <Badge
                        className={cn('bg-slate-500 text-center min-w-[110px]', chapter.isPublished && 'bg-sky-700')}
                      >
                        {chapter.isPublished ? 'Đã xuất bản' : 'Chưa xuất bản'}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(chapter.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
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
};
