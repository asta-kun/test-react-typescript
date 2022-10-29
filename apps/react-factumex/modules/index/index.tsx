import React, { ReactElement } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Grid, Theme } from '@mui/material';
import withDefaultPageDecorator from '../../decorators/withDefaultPage';
import { withDynamicPortals } from '@factumex/core/decorators';
import withDefaultDecorators from '../../decorators/withDefault';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 700,
    margin: '0 auto',
    maxWidth: '95%',
  },
  container: {
    textAlign: 'center',
    // height: '100vh',
    padding: '120px 0 30px 0',
    overflowY: 'auto',
  },
}));

export function MainPageIndex(): ReactElement {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        className={classes.container}
      >
        login
      </Grid>
    </Box>
  );
}

export default withDynamicPortals(
  withDefaultPageDecorator(withDefaultDecorators(MainPageIndex))
);
