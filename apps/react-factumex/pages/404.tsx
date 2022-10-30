import { withDynamicPortals } from '@factumex/core/decorators';
import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../config/redux/store/auth/slice';
import ErrorComponent from '../containers/Error';
import withDefaultDecorators from '../decorators/withDefault';
import withDefaultPageDecorator from '../decorators/withDefaultPage';
import { Page } from '../hooks/use-navigation';

const Error404 = (): ReactElement => {
  const { token } = useSelector(selectAuth);

  return (
    <Box textAlign="center" pt={20}>
      <ErrorComponent
        code={404}
        description="The page does not exist."
        redirectTo={token ? Page.employees : Page.login}
      />
    </Box>
  );
};

export default withDefaultPageDecorator(
  withDynamicPortals(withDefaultDecorators(Error404))
);
