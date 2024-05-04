import { useContext } from 'react';
import { HandlersModalContext, IHandlersModalContext } from '../modal-context';

const useModalController = (): IHandlersModalContext => {
  const modalHandlers = useContext(HandlersModalContext);

  if (!modalHandlers) {
    throw new Error('HandlersModalContext не подключен!');
  }

  const { onModalOpen, onModalClose } = modalHandlers;

  return {
    onModalClose,
    onModalOpen,
  };
};

export { useModalController };
