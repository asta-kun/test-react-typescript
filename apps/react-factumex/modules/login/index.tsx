import { Box } from '@mui/system';
import StandardBeautifulContainer from '../../containers/StandardBeautifulContainer';
import React, { ReactElement } from 'react';
import classes from './index.module.sass';
import { Page } from '../../hooks/use-navigation';

const SignIn = (): ReactElement => {
  return (
    <Box mt={2}>
      <StandardBeautifulContainer page={Page.login}>
        something
      </StandardBeautifulContainer>
    </Box>
  );
};

export default SignIn;
