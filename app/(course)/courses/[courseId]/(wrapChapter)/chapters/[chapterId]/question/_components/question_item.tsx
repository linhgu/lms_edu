'use client';
import { z } from 'zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

interface QuestionItemProps {
  index: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  answer: string;
  handleAnswerChange: (answer: string, correctAnswer: string) => void;
  handleRemoveAnswer: (answer: string, correctAnswer: string) => void;
  listAnswer: object;
}
const FormSchema = z.object({
  answer: z.string(),
});

const QuestionItem = ({
  index,
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  answer,
  listAnswer,
  handleAnswerChange,
  handleRemoveAnswer,
}: QuestionItemProps) => {
  /*   const [message, setMessage] = useState('');
  const [answers, setAnswers] = useState<boolean>(); */
  const formRef = useRef(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const handleRadioButtonChange = (value: string) => {
    form.setValue('answer', value); // Update form state with selected value
    if (value === answer) {
      handleAnswerChange(value, answer);
      /*    setAnswers(true); */
    } else {
      /*   setAnswers(false); */
      handleRemoveAnswer(value, answer);
    }
  };
  return (
    <>
      <div className="mb-4 ">
        <label className="flex text-gray-700 text-sm font-bold mb-2 items-center" htmlFor="question">
          Câu {index} : <p className="text-sm font-normal">{question}</p>
        </label>
        <Form {...form}>
          <form className="w-2/3 space-y-6" ref={formRef} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={handleRadioButtonChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option_a} />
                        </FormControl>
                        <FormLabel className="font-normal">{option_a}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option_b} />
                        </FormControl>
                        <FormLabel className="font-normal">{option_b}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option_c} />
                        </FormControl>
                        <FormLabel className="font-normal">{option_c}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option_d} />
                        </FormControl>
                        <FormLabel className="font-normal">{option_d}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
};

export default QuestionItem;
