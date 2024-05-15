import * as z from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  title: z.string().min(1, {
    message: ' Name is required.',
  }),
  price: z.coerce.number(),
  description: z.string().min(1, {
    message: ' Name is required.',
  }),
});

const ModalEditCourse = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isOpenModal = isOpen && type === 'openEditCourse';
  const router = useRouter();
  const { id, title, price, description } = data;
  const handleClose = () => {
    onClose();
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      price: price,
      description: description,
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    form.setValue('title', title);
    form.setValue('price', price);
    form.setValue('description', description);
  }, [description, form, price, title]);

  const onSubmit = async (values: any) => {
    try {
      await axios.patch(`/api/courses/${id}`, values);
      toast.success('Cập nhật thành công');
      handleClose();
      router.refresh();
    } catch (error) {
      console.log('error', error);
      toast.error('Đã có lỗi xảy ra');
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Chỉnh sửa khóa học {title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-8 p-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter title" disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        disabled={isLoading}
                        placeholder="Đặt giá cho khóa học của bạn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea disabled={isLoading} placeholder="Nhập mô tả..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
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

export default ModalEditCourse;
