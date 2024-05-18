import {
  cloneElement,
  FC,
  Fragment,
  MutableRefObject,
  ReactElement,
  RefCallback,
  useCallback,
  useState,
} from 'react';
import styled, { css } from 'styled-components';
import {
  autoUpdate,
  offset,
  Placement,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react';

const TooltipContainer = styled.div(
  ({ theme: { colors, boxShadow, borderRadius, fontSize } }) => css`
    display: flex;
    padding: 5px;
    width: max-content;
    background: ${colors.background.main};
    color: ${colors.white};
    border-radius: ${borderRadius.xxs};
    box-shadow: ${boxShadow.xs};
    font-size: ${fontSize.s};
    font-weight: 500;
  `
);

const setRefValue = (
  ref: MutableRefObject<any> | RefCallback<any>,
  value: any
): void => {
  if (typeof ref === 'function') {
    ref(value);
  } else {
    ref.current = value;
  }
};

const useForkRef = (...refs: (MutableRefObject<any> | RefCallback<any>)[]) => {
  return useCallback(
    (element: HTMLElement) => {
      refs.forEach((ref) => {
        if (ref) {
          setRefValue(ref, element);
        }
      });
    },
    [refs]
  );
};

interface ITooltipProps {
  title: string;
  placement?: Placement;
  children: ReactElement;
}

const Tooltip: FC<ITooltipProps> = ({ title, placement = 'top', children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5)],
  });

  const hover = useHover(context);
  const focus = useFocus(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
  ]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const unionRefs = useForkRef(refs.setReference, children.ref);

  if (children.props.disabled) {
    return children;
  }

  return (
    <Fragment>
      {cloneElement(children, {
        ref: unionRefs,
        ...getReferenceProps(),
      })}
      {isOpen && (
        <TooltipContainer
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {title}
        </TooltipContainer>
      )}
    </Fragment>
  );
};

export { Tooltip };
