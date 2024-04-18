import React, {
  FC,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type NameValue = {
  firstName: string;
  lastName: string;
};

type NameInputProps = {
  value: NameValue;
  onChange: (value: NameValue) => void;
};

const NameInput: FC<NameInputProps> = ({ value, onChange }) => {
  const valueCopy = useRef(value);
  valueCopy.current = value;

  const onChangeFirstName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...valueCopy.current, firstName: e.target.value });
    },
    [onChange]
  );

  const onChangeLastName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...valueCopy.current, lastName: e.target.value });
    },
    [onChange]
  );

  return (
    <div>
      <div>firstName</div>
      <input value={value.firstName} onChange={onChangeFirstName} />
      <div>lastName</div>
      <input value={value.lastName} onChange={onChangeLastName} />
    </div>
  );
};

export const ClosureProblemExample = forwardRef<{ resetState: VoidFunction }>(
  (_, ref) => {
    const [value, setValue] = useState({
      firstName: '',
      lastName: '',
    } as NameValue);

    useImperativeHandle(ref, () => ({
      resetState: () => setValue({ firstName: '', lastName: '' }),
    }));

    return (
      <div>
        <NameInput value={value} onChange={setValue} />
        {JSON.stringify(value)}
      </div>
    );
  }
);
