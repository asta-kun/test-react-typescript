import { DateTime } from 'luxon';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { MixedSchema } from 'yup/lib/mixed';
import { RequiredStringSchema } from 'yup/lib/string';

interface Response {
  schemas: {
    name: RequiredStringSchema<string | undefined>;
    luxonDate: MixedSchema;
  };
}

const useSchemas = (): Response => {
  const schemas = useMemo(() => {
    const name = Yup.string()
      .required('Field required.')
      .min(1, 'It must be at least 1 characters')
      .max(100, 'It must not exceed 100 characters');

    const luxonDate = Yup.mixed().test(
      'validate-date',
      'The date is not valid.',
      (date: DateTime | null) => {
        if (!date) return false;

        return date.isValid;
      }
    );

    return { name, luxonDate };
  }, []);

  return { schemas };
};

export default useSchemas;
