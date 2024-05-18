import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import styled from 'styled-components';
import {
  autoUpdate,
  offset,
  Placement,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 200px;
  height: 300px;
`;

interface IDropdownProps {
  className?: string;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  target: HTMLElement | null;
  placement?: Placement;
}

const Dropdown: FC<IDropdownProps & PropsWithChildren> = ({
  isOpen,
  className,
  target,
  children,
  setOpen,
}) => {
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    placement: 'bottom',
    whileElementsMounted: autoUpdate,
    middleware: [offset(5)],
    elements: {
      reference: target,
    },
  });

  const dismiss = useDismiss(context);

  const { getFloatingProps } = useInteractions([dismiss]);

  if (!isOpen || !target) {
    return null;
  }

  return (
    <DropdownContainer
      className={className}
      ref={refs.setFloating}
      style={floatingStyles}
      {...getFloatingProps()}
    >
      {children}
    </DropdownContainer>
  );
};

export { Dropdown };
