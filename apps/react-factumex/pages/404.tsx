import { withDynamicPortals } from '@factumex/core/decorators';
import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import ErrorComponent from '../containers/Error';
import withDefaultDecorators from '../decorators/withDefault';
import withDefaultPageDecorator from '../decorators/withDefaultPage';

const Error404 = (): ReactElement => {
  return (
    <Box textAlign="center" pt={20}>
      <ErrorComponent code={404} description="The page does not exist." />
    </Box>
  );
};

export default withDefaultPageDecorator(
  withDynamicPortals(withDefaultDecorators(Error404))
);
