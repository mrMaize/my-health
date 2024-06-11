import { ChangeEvent, FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useValidation } from '../validatedInputSimple/hooks/useValidation';
import {
  EErrorMessages,
  EValidation,
} from '../validatedInputSimple/interfaces/interfaces';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Lalel = styled.span``;

const Error = styled.div`
  color: darkred;
  font-size: 12px;
  height: 14px;
`;

const RequiredMark = styled(Lalel)`
  color: red;
`;

type TProps = {
  value: string;
  label: string;
  onChange: (data: string) => void;
  onError: (error: EErrorMessages | undefined) => void;
  validation?: EValidation;
  type?: 'text' | 'number' | 'date';
  required?: boolean;
};

const ValidatedInputYup: FC<TProps> = ({
  type = 'text',
  value,
  label,
  onChange,
  onError,
  validation,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState<string>(value || '');

  const error = useValidation({ value: inputValue, validation });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    onError(error);
    onChange(inputValue);
  }, [error, inputValue, onChange, onError]);

  return (
    <Container>
      <Lalel>
        {label}
        {required ? <RequiredMark>*</RequiredMark> : null}:
      </Lalel>
      <input type={type} value={inputValue} onChange={handleInputChange} />
      <Error>{error ?? ''}</Error>
    </Container>
  );
};

export { ValidatedInputYup };
