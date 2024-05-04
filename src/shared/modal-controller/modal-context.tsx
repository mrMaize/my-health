import { createContext } from 'react';

interface IHandlersModalContext {
  onModalOpen: (type: string, props?: object) => void;
  onModalClose: VoidFunction;
}

const HandlersModalContext = createContext<IHandlersModalContext | null>(null);

interface IPropsModalContext {
  modalType: string | null;
  modalProps?: any;
}

const PropsModalContext = createContext<IPropsModalContext | null>(null);

export type { IPropsModalContext, IHandlersModalContext };
export { HandlersModalContext, PropsModalContext };
