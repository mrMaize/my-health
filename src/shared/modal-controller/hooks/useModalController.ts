import { useContext } from 'react';
import { HandlersModalContext } from '../modal-context';

interface IUseModalControllerReturnProps {
  onModalOpen: (type: string, props?: object) => void;
  onModalClose: VoidFunction;
}

const useModalController = (): IUseModalControllerReturnProps => {
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
