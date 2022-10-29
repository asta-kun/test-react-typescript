import * as Yup from 'yup';
import { FormValues } from '../../types.d';

export const loginValidations = Yup.object().shape({
  username: Yup.string()
    .required('Field required.')
    .min(1, 'It must be at least 1 characters')
    .max(20, 'It must not exceed 20 characters'),
  password: Yup.string()
    .required('Field required')
    .min(1, 'It must be at least 1 characters')
    .max(100, 'It must not exceed 100 characters'),
} as Record<keyof FormValues, Yup.AnySchema<unknown, unknown, unknown>>);
