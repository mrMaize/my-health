import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  FloatingFocusManager,
  useDismiss,
  useInteractions,
} from '@floating-ui/react';
import styled, { css } from 'styled-components';

const DropdownContainer = styled.div(
  ({ theme: { colors, borderRadius } }) => css`
    display: flex;
    flex-direction: column;
    border: 1px solid ${colors.background.main};
    border-radius: ${borderRadius.xxs};
    background: ${colors.primary.light};
    width: 100px;
  `
);

interface IDropdownProps {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  className?: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const Dropdown: FC<IDropdownProps & PropsWithChildren> = ({
  isOpen,
  anchorEl,
  className,
  children,
  setOpen,
}) => {
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    placement: 'bottom-end',
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
    elements: {
      reference: anchorEl,
    },
  });

  const dismiss = useDismiss(context);

  const { getFloatingProps } = useInteractions([dismiss]);

  if (!isOpen) return null;

  return (
    <FloatingFocusManager context={context} modal={false}>
      <DropdownContainer
        className={`Popover ${className}`}
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
      >
        {children}
      </DropdownContainer>
    </FloatingFocusManager>
  );
};

export { Dropdown };
