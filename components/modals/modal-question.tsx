import * as z from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModal } from '@/hooks/use-modal-store';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  question: z.string().min(1, {
    message: ' Question is required.',
  }),
  option_a: z.string().min(1, {
    message: ' Answer is required.',
  }),
  option_b: z.string().min(1, {
    message: ' Answer is required.',
  }),
  option_c: z.string().min(1, {
    message: ' Answer is required.',
  }),
  option_d: z.string().min(1, {
    message: ' Answer is required.',
  }),
  correct_answer: z.string(),
});

const ModalQuestion = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isOpenModal = isOpen && type === 'openQuestionModal';
  const router = useRouter();
  const handleClose = () => {
    onClose();
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${data?.query?.courseId}/chapters/${data?.query?.chapterId}/question`, values);
      console.log(values);
      toast.success('Create question successfully');
      router.refresh();
      form.reset();
      handleClose();
    } catch (error) {
      console.log('Error: ' + error);
      toast.error('Create question failed');
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={handleClose}>
      <DialogContent className=" max-w-2xl max-h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Thêm câu hỏi</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-4 ">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Câu hỏi</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Nhập câu hỏi" disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <FormField
                  control={form.control}
                  name="option_a"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đáp án A</FormLabel>
                      <FormControl>
                        <Textarea disabled={isLoading} placeholder="Nhập đáp án A " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="option_b"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đáp án B</FormLabel>
                      <FormControl>
                        <Textarea disabled={isLoading} placeholder="Nhập đáp án B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="option_c"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đáp án C</FormLabel>
                      <FormControl>
                        <Textarea disabled={isLoading} placeholder="Nhập đáp án C" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="option_d"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đáp án D</FormLabel>
                      <FormControl>
                        <Textarea className="h-4" disabled={isLoading} placeholder="Nhập đáp án D" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="correct_answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormLabel className="font-normal accent-primary ">Đáp án A</FormLabel>
                            <FormControl>
                              <RadioGroupItem value={form.getValues('option_a')} />
                            </FormControl>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormLabel className="font-normal">Đáp án B</FormLabel>
                            <FormControl>
                              <RadioGroupItem value={form.getValues('option_b')} />
                            </FormControl>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormLabel className="font-normal">Đáp án C</FormLabel>
                            <FormControl>
                              <RadioGroupItem value={form.getValues('option_c')} />
                            </FormControl>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormLabel className="font-normal">Đáp án D</FormLabel>
                            <FormControl>
                              <RadioGroupItem value={form.getValues('option_d')} />
                            </FormControl>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button variant="primary" disabled={isLoading}>
                Lưu
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalQuestion;
