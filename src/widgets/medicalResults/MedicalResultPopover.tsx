import { useRef, useState } from 'react';
import styled from 'styled-components';

import { Button, Dropdown, Tooltip } from '../../shared/components';

const ContextMenu = styled(Dropdown)`
  background: blue;
  gap: 5px;
`;

const AddMedicalResultsPopover = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  console.log('hello');

  return (
    <>
      <Tooltip title="Откроется модальное окно для заполнения данных">
        <Button ref={buttonRef} onClick={() => setIsOpen((prev) => !prev)}>
          Click me
        </Button>
      </Tooltip>
      <ContextMenu
        target={buttonRef.current}
        isOpen={isOpen}
        setOpen={setIsOpen}
      >
        <Button>Добавить анализ</Button>
        <Button>Добавить анализ</Button>
        <Button>Добавить анализ</Button>
        <Button>Добавить анализ</Button>
      </ContextMenu>
    </>
  );
};

export { AddMedicalResultsPopover };
