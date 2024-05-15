import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const ListCoursePage = () => {
  return (
    <>
      <h2 className="font-bold text-[29px] md:text-[44px] sm:text-[39px]">Nội dung khóa học</h2>
      <div className=" flex items-center justify-center mt-6">
        <Accordion type="single" collapsible className="w-full text-start mx-10 max-w-[800px] space-y-6">
          <AccordionItem value="item-1" className="bg-[#0e2d58] border-[#3b3086] border-[2px] rounded-lg ">
            <AccordionTrigger className="text-[22.5px] sm:text-[26px] md:text-[29px] font-bold  px-6 pt-6">
              Tiêu đề bài 1{' '}
            </AccordionTrigger>
            <AccordionContent className="text-[18px]  px-6 pt-2">
              Neque porta convallis in pulvinar congue porta. Est sit massa magna tempor. Ornare sed dignissim molestie
              amet a, massa. Fringilla facilisi habitant ut faucibus. Sed placerat feugiat nisl curabitur eu enim vitae.
              Fringilla commodo quam at at consequat arcu. Ac porta eget integer bibendum lectus malesuada viverra sed
              at.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="bg-[#0e2d58] border-[#3b3086] border-[2px] rounded-lg ">
            <AccordionTrigger className="text-[22.5px] sm:text-[26px] md:text-[29px] font-bold  px-6 pt-6">
              Tiêu đề bài 2{' '}
            </AccordionTrigger>
            <AccordionContent className="text-[18px]  px-6 pt-2">
              Neque porta convallis in pulvinar congue porta. Est sit massa magna tempor. Ornare sed dignissim molestie
              amet a, massa. Fringilla facilisi habitant ut faucibus. Sed placerat feugiat nisl curabitur eu enim vitae.
              Fringilla commodo quam at at consequat arcu. Ac porta eget integer bibendum lectus malesuada viverra sed
              at.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="bg-[#0e2d58] border-[#3b3086] border-[2px] rounded-lg ">
            <AccordionTrigger className="text-[22.5px] sm:text-[26px] md:text-[29px] font-bold  px-6 pt-6">
              Tiêu đề bài 3{' '}
            </AccordionTrigger>
            <AccordionContent className="text-[18px]  px-6 pt-2">
              Neque porta convallis in pulvinar congue porta. Est sit massa magna tempor. Ornare sed dignissim molestie
              amet a, massa. Fringilla facilisi habitant ut faucibus. Sed placerat feugiat nisl curabitur eu enim vitae.
              Fringilla commodo quam at at consequat arcu. Ac porta eget integer bibendum lectus malesuada viverra sed
              at.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="bg-[#0e2d58] border-[#3b3086] border-[2px] rounded-lg ">
            <AccordionTrigger className="text-[22.5px] sm:text-[26px] md:text-[29px] font-bold  px-6 pt-6">
              Tiêu đề bài 4{' '}
            </AccordionTrigger>
            <AccordionContent className="text-[18px]  px-6 pt-2">
              Neque porta convallis in pulvinar congue porta. Est sit massa magna tempor. Ornare sed dignissim molestie
              amet a, massa. Fringilla facilisi habitant ut faucibus. Sed placerat feugiat nisl curabitur eu enim vitae.
              Fringilla commodo quam at at consequat arcu. Ac porta eget integer bibendum lectus malesuada viverra sed
              at.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="bg-[#0e2d58] border-[#3b3086] border-[2px] rounded-lg ">
            <AccordionTrigger className="text-[22.5px] sm:text-[26px] md:text-[29px] font-bold  px-6 pt-6">
              Tiêu đề bài 5{' '}
            </AccordionTrigger>
            <AccordionContent className="text-[18px]  px-6 pt-2">
              Neque porta convallis in pulvinar congue porta. Est sit massa magna tempor. Ornare sed dignissim molestie
              amet a, massa. Fringilla facilisi habitant ut faucibus. Sed placerat feugiat nisl curabitur eu enim vitae.
              Fringilla commodo quam at at consequat arcu. Ac porta eget integer bibendum lectus malesuada viverra sed
              at.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};
