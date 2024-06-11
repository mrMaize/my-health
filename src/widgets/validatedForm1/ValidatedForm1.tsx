import { useCallback, useState } from 'react';

import {
  EErrorMessages,
  EValidation,
} from '../../features/validatedInputSimple/interfaces/interfaces';
import { ValidatedInputSimple } from '../../features/validatedInputSimple/ui/ValidatedInput';

const ValidatedForm1 = () => {
  const [errors, setErrors] = useState<{
    [x: string]: EErrorMessages | undefined;
  }>();

  const [validatedLogin, setValidatedLogin] = useState<string>('');

  const handleSetError = useCallback(
    (fieldName: string) => (error: EErrorMessages | undefined) => {
      if (!errors) {
        setErrors({
          [fieldName]: error,
        });
      } else if (errors[fieldName] !== error) {
        setErrors({ ...errors, [fieldName]: error });
      }
    },
    [errors]
  );

  return (
    <>
      <ValidatedInputSimple
        label="Имя"
        value={validatedLogin}
        onChange={setValidatedLogin}
        onError={handleSetError('name')}
        validation={EValidation.CYRILLIC}
        required
      />

      <ValidatedInputSimple
        label="Фамилия"
        value={validatedLogin}
        onChange={setValidatedLogin}
        onError={handleSetError('lastName')}
        validation={EValidation.CYRILLIC}
        required
      />

      <ValidatedInputSimple
        label="Возраст"
        value={validatedLogin}
        onChange={setValidatedLogin}
        onError={handleSetError('age')}
        validation={EValidation.AGE}
      />
    </>
  );
};

export { ValidatedForm1 };
