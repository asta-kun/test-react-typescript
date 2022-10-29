import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import LoginForm from './components/LoginForm';
import classes from './index.module.sass';
import Image from 'next/image';
import Logo from '../../public/images/logo.svg';

const SignIn = (): ReactElement => {
  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Box textAlign="center" mb={3}>
          <Image
            {...Logo}
            height={40}
            width={230}
            alt="logo"
            priority={false}
          />
        </Box>

        <LoginForm />
      </Box>
    </Box>
  );
};

export default SignIn;
