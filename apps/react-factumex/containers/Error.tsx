import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import classes from './Error.module.sass';
import Image from 'next/image';
import Logo from '../public/images/logo.svg';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface Props {
  description?: string;
  code?: number;
}

const Error404 = ({
  code = 404,
  description = 'The page does not exist.',
}: Props): ReactElement => {
  return (
    <Paper className={classes.root}>
      <Box className={classes.icon}>
        <WarningAmberIcon />
      </Box>
      <Box className={classes.message}>Error {code}</Box>
      <Box className={classes.description}>{description}</Box>
      <Image {...Logo} height={40} width={230} alt="logo" priority={false} />
    </Paper>
  );
};

export default Error404;
