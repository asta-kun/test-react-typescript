import { LinearProgress, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement, useEffect } from 'react';
import classes from './Error.module.sass';
import Image from 'next/image';
import Logo from '../public/images/logo.svg';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import useNavigation, { Page } from '../hooks/use-navigation';
import { isInteger } from 'lodash';

interface Props {
  description?: string;
  code?: number;
  redirectTo?: Page;
}

const Error404 = ({
  code = 404,
  description = 'The page does not exist.',
  redirectTo,
}: Props): ReactElement => {
  const { withEvents } = useNavigation(Page.main);
  useEffect(function redirect() {
    const timeout = setTimeout(() => {
      if (redirectTo === Page.employees) {
        withEvents.employees();
      } else if (redirectTo === Page.login) {
        withEvents.login();
      }
    }, 3_000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Paper className={classes.root}>
      <Box className={classes.icon}>
        <WarningAmberIcon />
      </Box>
      <Box className={classes.message}>Error {code}</Box>
      <Box className={classes.description}>{description}</Box>
      <Image {...Logo} height={40} width={230} alt="logo" priority={false} />

      {isInteger(redirectTo) && (
        <Box mt={3}>
          <Box className={classes.redirect}>
            <Box>You are being redirected...</Box>
            <Box>
              <LinearProgress />
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default Error404;
