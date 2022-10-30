import { Box, Grid } from '@mui/material';
import Error404 from '../../../containers/Error';
import { toInteger } from 'lodash';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { Page } from '../../../hooks/use-navigation';
import { UploadContextProvider } from './management';

const UploadSection = (): ReactElement => {
  const { query } = useRouter();
  const employeeId = toInteger(query.employeeId);

  if (!employeeId)
    return (
      <Box textAlign="center" pt={20}>
        <Error404
          code={404}
          description="This employee does not exist."
          redirectTo={Page.employees}
        />
      </Box>
    );

  return (
    <Box textAlign="center">
      <Box width="900px" maxWidth="90%" margin="10px auto">
        <Grid container>
          <Grid item xs={12}>
            <UploadContextProvider />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UploadSection;
