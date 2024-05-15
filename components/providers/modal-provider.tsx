'use client';
import { useEffect, useState } from 'react';

import ModalProfile from '../modals/modal-profile';
import ModalUserCreate from '../modals/modal-user-create';
import ModalEditCourse from '../modals/modal-edit-course';
import { ModalDeleteComment } from '../modals/modal-delete-comment';
import ModalQuestion from '../modals/modal-question';
import ModalEditQuestion from '../modals/modal-edit-question';
import { CheckAnswerModal } from '../modals/checkAnswer-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ModalProfile />
      <ModalUserCreate />
      <ModalEditCourse />
      <ModalDeleteComment />
      <ModalQuestion />
      <ModalEditQuestion />
      <CheckAnswerModal />
    </>
  );
};
