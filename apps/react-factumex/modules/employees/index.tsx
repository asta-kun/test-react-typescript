import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import classes from './index.module.sass';
import StandardBeautifulContainer from '../../containers/StandardBeautifulContainer';
import { Page } from '../../hooks/use-navigation';
import { useGetEventsQuery } from 'apps/react-factumex/config/redux/api/services/employees/service';

const SignIn = (): ReactElement => {
  const { data } = useGetEventsQuery({});
  console.log('data:', data);
  return (
    <Box className={classes.root}>
      <StandardBeautifulContainer
        page={Page.employees}
        display={{ backButton: false }}
      >
        HOLA
      </StandardBeautifulContainer>
    </Box>
  );
};

export default SignIn;
