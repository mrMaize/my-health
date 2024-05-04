import { IPropsModalContext, PropsModalContext } from '../modal-context';
import { useContext } from 'react';

const usePropsModalContext = (): IPropsModalContext => {
  const modalProps = useContext(PropsModalContext);

  if (!modalProps) {
    throw new Error('PropsModalContext не подключен!');
  }

  return modalProps;
};

export { usePropsModalContext };
