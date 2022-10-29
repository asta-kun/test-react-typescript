import { Box, TextField } from '@mui/material';
import React, { ReactElement } from 'react';
import useLogin from '../hooks/use-login';
import LoginIcon from '@mui/icons-material/Login';
import { Controller } from 'react-hook-form';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import { useLoadingWithCallback, useShake } from '@factumex/core/hooks';
import StandardButton from '../../../components/common/StandardButton';
import { useLoginMutation } from '../../../config/redux/api/services/auth/service';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../config/redux/store/auth/slice';
import toast from 'react-hot-toast';
import useNavigation, { Page } from '../../../hooks/use-navigation';

const LoginForm = (): ReactElement => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const {
    withEvents: { employees },
  } = useNavigation(Page.login);
  const { control, handleSubmit, errors } = useLogin();
  const [shake, shakeRegister] = useShake<'username' | 'password'>();

  const [disabled, withLoading] = useLoadingWithCallback();

  const onSubmit = withLoading(async () => {
    await new Promise((resolve) => {
      handleSubmit(
        (values) => {
          login(values)
            .unwrap()
            .then(({ token, message }) => {
              if (!token) throw new Error(message || 'Token is empty');
              dispatch(setToken(token));
              toast.success('Login successful');

              // go to employees page
              employees();
            })
            .catch((error) => {
              toast.error(error?.message || 'Login failed');
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
    <Box>
      <Box mb={3}>
        <Controller
          name="username"
          control={control}
          render={({ field }): ReactElement =>
            shakeRegister(
              'username',
              <TextField
                {...field}
                label="Username"
                onCopy={(e): void => e.preventDefault()}
                disabled={disabled}
                fullWidth
                placeholder="admin"
                error={!!errors.username}
                helperText={errors.username?.message}
                size="small"
                InputProps={{ startAdornment: <PersonIcon /> }}
              />
            )
          }
        />
      </Box>
      <Box mb={3}>
        <Controller
          name="password"
          control={control}
          render={({ field }): ReactElement =>
            shakeRegister(
              'password',
              <TextField
                {...field}
                label="Password"
                disabled={disabled}
                fullWidth
                type="password"
                placeholder="My secret password"
                error={!!errors.password}
                helperText={errors.password?.message}
                size="small"
                InputProps={{ startAdornment: <KeyIcon /> }}
              />
            )
          }
        />
      </Box>

      {/* actions */}
      <Box textAlign="right">
        <StandardButton
          color="primary"
          startIcon={<LoginIcon />}
          variant="contained"
          disableElevation
          disabled={disabled}
          onClick={onSubmit}
        >
          Login
        </StandardButton>
      </Box>
    </Box>
  );
};

export default LoginForm;
