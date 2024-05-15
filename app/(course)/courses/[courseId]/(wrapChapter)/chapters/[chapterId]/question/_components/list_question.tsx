'use client';
import { useState } from 'react';
import { Question } from '@prisma/client';

import { CourseProgressButton } from '../../_components/course-progress-button';
import QuestionItem from './question_item';

interface QuestionItemProps {
  questions: Question[];
  chapterId: string;
  profileId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
  isQuestions?: boolean;
}

export default function ListQuestionPage({
  questions,
  courseId,
  chapterId,
  profileId,
  nextChapterId,
  isCompleted,
  isQuestions,
}: QuestionItemProps) {
  let index = 1;
  const [listAnswer, setListAnswer] = useState<string[]>([]);

  /*   console.log('list đáp án đúng', listAnswer); */

  const handleAnswerChange = (answer: string, correctAnswer: string) => {
    if (answer === correctAnswer && listAnswer.includes(answer)) {
      // Loại bỏ đáp án đúng khỏi list
      setListAnswer(listAnswer);
    } else {
      // Xử lý trường hợp chọn đáp án khác
      if (!listAnswer.includes(answer)) {
        setListAnswer([...listAnswer, answer]);
      }
    }
  };
  const handleRemoveAnswer = (answer: string, correctAnswer: string) => {
    if (answer !== correctAnswer && listAnswer.includes(correctAnswer)) {
      const newListAnswer = listAnswer.filter((answer) => answer !== correctAnswer);
      // Loại bỏ đáp án đúng khỏi list
      setListAnswer(newListAnswer);
    }
  };
  console.log('listAnswer', listAnswer);

  const isAllAnswersCorrect = questions.every((question) => listAnswer.includes(question.answer));

  return (
    <>
      {questions.map((item) => (
        <div key={item.id}>
          <QuestionItem
            index={index++}
            listAnswer={listAnswer}
            question={item.question}
            option_a={item.option_a}
            option_b={item.option_b}
            option_c={item.option_c}
            option_d={item.option_d}
            handleAnswerChange={handleAnswerChange}
            handleRemoveAnswer={handleRemoveAnswer}
            answer={item.answer}
          />
        </div>
      ))}

      <div className="text-center md:flex justify-end items-center">
        <CourseProgressButton
          isAllAnswersCorrect={isAllAnswersCorrect}
          chapterId={chapterId}
          profileId={profileId}
          courseId={courseId}
          nextChapterId={nextChapterId}
          isCompleted={isCompleted}
          isQuestions={isQuestions}
        />
      </div>
    </>
  );
}
