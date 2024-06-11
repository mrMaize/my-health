import { useMemo } from 'react';

import { EErrorMessages, EValidation } from '../interfaces/interfaces';
import {
  validateAge,
  validateCyrillic,
  validateLatin,
} from '../validations/validations';

type TProps = {
  value: string;
  validation?: EValidation;
};

const useValidation = ({ value, validation }: TProps) => {
  return useMemo(() => {
    if (!value) {
      return undefined;
    }

    if (validation === EValidation.REQUIRED) {
      if (!value) {
        return EErrorMessages.REQUIRED;
      }
    } else if (validation === EValidation.CYRILLIC) {
      if (!validateCyrillic(value)) {
        return EErrorMessages.CYRILLIC;
      }
    } else if (validation === EValidation.LATIN) {
      if (!validateLatin(value)) {
        return EErrorMessages.LATIN;
      }
    } else if (validation === EValidation.AGE) {
      if (!validateAge(value)) {
        return EErrorMessages.AGE;
      }
    } else {
      return undefined;
    }
  }, [validation, value]);
};

export { useValidation };
