import { Box } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';
import classes from './StandardPage.module.sass';

interface Props {
  children: ReactNode;
}

const StandardPage = ({ children }: Props): ReactElement => {
  return (
    <Box className={classes.root}>
      <Box className={classes.background}></Box>
      {children}
    </Box>
  );
};

export default StandardPage;
