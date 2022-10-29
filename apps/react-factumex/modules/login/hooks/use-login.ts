import { defaults } from 'lodash';
import { Resolver } from 'react-hook-form/dist/types/resolvers';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues } from '../types.d';
import { loginValidations } from './utils/login-validations';
import {
  useForm,
  Control,
  FieldError,
  UseFormHandleSubmit,
} from 'react-hook-form';

const defaultEmptyValues: FormValues = {
  username: '',
  password: '',
};

interface Props {
  defaultValues?: Partial<FormValues>;
}

interface Response {
  control: Control<FormValues>;
  errors: Partial<Record<keyof FormValues, FieldError | undefined>>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
}

const useLogin = ({ defaultValues }: Props = {}): Response => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaults(defaultValues, defaultEmptyValues),
    resolver: yupResolver(loginValidations) as Resolver<FormValues, unknown>,
    mode: 'all',
  });

  return { control, errors, handleSubmit };
};

export default useLogin;
