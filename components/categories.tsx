'use client';

import { Category } from '@prisma/client';
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from 'react-icons/fc';
import { IconType } from 'react-icons';

import { CategoryItem } from './category-item';

interface CategoriesProps {
  items?: Category[];
}

const iconMap: Record<Category['name'], IconType> = {
  'Âm nhạc': FcMusic,
  'Nhiếp ảnh': FcOldTimeCamera,
  'Thể thao': FcSportsMode,
  'Kế toán': FcSalesPerformance,
  'Công nghệ thông tin': FcMultipleDevices,
  'Quay phim': FcFilmReel,
  'Kỹ thuật': FcEngineering,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items?.map((item) => (
        <CategoryItem key={item.id} label={item.name} icon={iconMap[item.name]} value={item.id} />
      ))}
    </div>
  );
};
