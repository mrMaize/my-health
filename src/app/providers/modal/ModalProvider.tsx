import { FC, PropsWithChildren, useMemo, useState } from 'react';

import {
  HandlersModalContext,
  PropsModalContext,
} from '../../../shared/modal-controller';

const MODAL_PROPS_INITIAL_VALUES = {
  modalType: null,
  modalProps: undefined,
};

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ modalType, modalProps }, setModalProps] = useState<{
    modalType: string | null;
    modalProps?: any;
  }>(MODAL_PROPS_INITIAL_VALUES);

  const modalHandlers = useMemo(
    () => ({
      onModalOpen: (openedModalType: string, props?: any) => {
        setModalProps({ modalType: openedModalType, modalProps: props });
      },
      onModalClose: () => {
        setModalProps(MODAL_PROPS_INITIAL_VALUES);
      },
    }),
    []
  );

  return (
    <HandlersModalContext.Provider value={modalHandlers}>
      <PropsModalContext.Provider value={{ modalType, modalProps }}>
        {children}
      </PropsModalContext.Provider>
    </HandlersModalContext.Provider>
  );
};

export { ModalProvider };
