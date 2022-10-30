import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import CakeIcon from '@mui/icons-material/Cake';
import { useLoadingWithCallback, useShake } from '@factumex/core/hooks';
import { Box, Grid, TextField } from '@mui/material';
import React, { ReactElement } from 'react';
import { Resolver } from 'react-hook-form/dist/types/resolvers';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FieldError, Controller } from 'react-hook-form';
import { DateTime } from 'luxon';
import * as Yup from 'yup';
import I18nDatePicker from '../../../components/common/form-fields/I18nDatePicker';
import StandardButton from '../../../components/common/StandardButton';
import toast from 'react-hot-toast';
import { useAddEmployeeMutation } from '../../../config/redux/api/services/employees/service';

interface FormValues {
  name: string;
  last_name: string;
  birthday: DateTime | null;
}

export const validations = Yup.object().shape({
  name: Yup.string()
    .required('Field required.')
    .min(1, 'It must be at least 1 characters')
    .max(20, 'It must not exceed 20 characters'),
  last_name: Yup.string()
    .required('Field required')
    .min(1, 'It must be at least 1 characters')
    .max(100, 'It must not exceed 100 characters'),
  birthday: Yup.mixed().test(
    'validate-date',
    'The date is not valid.',
    (date: DateTime | null) => {
      if (!date) return false;

      return date.isValid;
    }
  ),
} as Record<keyof FormValues, Yup.AnySchema<unknown, unknown, unknown>>);

interface Props {
  onClose: () => void;
}

const EmployeeForm = ({ onClose }: Props): ReactElement => {
  const [loading, withLoading] = useLoadingWithCallback();
  const [shake, shakeRegister] = useShake<keyof FormValues>();
  const [addEmployee] = useAddEmployeeMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      last_name: '',
      birthday: null,
    },
    resolver: yupResolver(validations) as Resolver<FormValues, unknown>,
    mode: 'all',
  });

  const onSubmit = withLoading(async () => {
    await new Promise((resolve) => {
      handleSubmit(
        (values) => {
          addEmployee({
            ...values,
            birthday: (values.birthday as DateTime).toFormat('yyyy/MM/dd'),
          })
            .unwrap()
            .then(() => {
              toast.success('The employee was created successfully');

              // go to employees page
              onClose();
            })
            .catch((error) => {
              toast.error(error?.message || 'Creation failed');
              shake('*');
            })
            .finally(() => resolve(null));
        },
        (errors) => {
          Object.keys(errors).forEach((key) => {
            shake(key as keyof typeof errors);
          });
          resolve(null);
        }
      )();
    });
  });

  return (
    <Box width={350} padding="20px">
      <Box>
        <Box mb={2}>
          <Controller
            name="name"
            control={control}
            render={({ field }): ReactElement =>
              shakeRegister(
                'name',
                <TextField
                  {...field}
                  label="Name"
                  onCopy={(e): void => e.preventDefault()}
                  disabled={loading}
                  fullWidth
                  placeholder="Juan"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  size="small"
                />
              )
            }
          />
        </Box>
        <Box mb={2}>
          <Controller
            name="last_name"
            control={control}
            render={({ field }): ReactElement =>
              shakeRegister(
                'last_name',
                <TextField
                  {...field}
                  label="Last Name"
                  disabled={loading}
                  fullWidth
                  placeholder="Smith"
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                  size="small"
                />
              )
            }
          />
        </Box>

        <Box mb={2}>
          <Controller
            name="birthday"
            control={control}
            render={({ field }): ReactElement => (
              <I18nDatePicker
                {...field}
                inputFormat="yyyy/MM/dd"
                disableFuture
                label="Birthdate"
                mask="____/__/__"
                disabled={loading}
                onChange={(raw): void => {
                  const date = raw as DateTime;
                  field.onChange(date);
                }}
                renderInput={(params): ReactElement =>
                  shakeRegister(
                    'birthday',
                    <TextField
                      {...params}
                      error={!!errors.birthday}
                      helperText={(errors.birthday as FieldError)?.message}
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: <CakeIcon />,
                      }}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: 'YYYY/MM/DD',
                      }}
                      size="small"
                    />
                  )
                }
              />
            )}
          />
        </Box>
      </Box>

      {/* actions */}

      <Box mt={4}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <StandardButton
              color="secondary"
              startIcon={<CloseIcon />}
              variant="contained"
              disableElevation
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </StandardButton>
          </Grid>
          <Grid item>
            <StandardButton
              color="primary"
              startIcon={<DoneAllIcon />}
              variant="contained"
              disableElevation
              onClick={onSubmit}
              disabled={loading}
            >
              Confirm
            </StandardButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EmployeeForm;
