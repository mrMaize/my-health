import { FC } from 'react';

import { usePropsModalContext } from './hooks/usePropsModalContext';
import { useModalController } from './hooks/useModalController';

interface IModalControllerProps {
  type: string;
  component: FC<any>;
}

const ModalController: FC<IModalControllerProps> = ({
  type,
  component: Component,
}) => {
  const { modalType, modalProps = {} } = usePropsModalContext();
  const { onModalClose } = useModalController();

  if (modalType !== type) {
    return null;
  }

  return <Component onModalClose={onModalClose} {...modalProps} />;
};

export { ModalController };
