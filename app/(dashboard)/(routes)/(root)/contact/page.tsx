import { redirect } from 'next/navigation';

import { getUser } from '@/actions/get-user';
import { currentProfile } from '@/lib/current-profile';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { UserAvatar } from '@/components/user-avatar';
import { CourseTeacher } from '@/components/course-teacher';

interface SearchPageProps {
  searchParams: {
    username: string;
  };
}

async function ContactPage({ searchParams }: SearchPageProps) {
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/');
  }

  const { ListTeacher } = await getUser({
    ...searchParams,
  });

  return (
    <div className="p-6 space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {ListTeacher.map((item, index) => {
          const ListCate = item?.courses?.map((course) => course.category);
          if (!ListCate) return null;
          return (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                <div className="flex gap-x-4 justify-between items-center w-full">
                  <div className="flex gap-x-4 items-center">
                    <UserAvatar src={item.imageUrl} />
                    {item.username}
                  </div>
                  <p className="font-normal text-sm">{item.courses.length} Khóa học</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="space-y-2">
                  <span className="font-medium flex">
                    Tên:
                    <p className="font-normal ml-2">{item.username}</p>
                  </span>
                  <span className="font-medium flex">
                    Email:
                    <p className="font-normal ml-2">{item.email}</p>
                  </span>
                </div>
                <div className=" gap-4">
                  <CourseTeacher items={item.courses} ListCategory={ListCate} />
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default ContactPage;
