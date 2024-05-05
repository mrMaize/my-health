import { useContext } from 'react';

import { IPropsModalContext, PropsModalContext } from '../modal-context';

const usePropsModalContext = (): IPropsModalContext => {
  const modalProps = useContext(PropsModalContext);

  if (!modalProps) {
    throw new Error('PropsModalContext не подключен!');
  }

  return modalProps;
};

export { usePropsModalContext };
