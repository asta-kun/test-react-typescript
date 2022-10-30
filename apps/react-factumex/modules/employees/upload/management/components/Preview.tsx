import { Box, Grid, IconButton } from '@mui/material';
import usePagination from 'apps/react-factumex/hooks/use-pagination';
import React, { ReactElement } from 'react';
import { IBlobEntity } from '../types.d';
import classes from './Preview.module.sass';
import BlobImage from './BlobImage';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

interface Props {
  items: IBlobEntity[];
}

const Preview = ({ items }: Props): ReactElement | null => {
  const { results, previous, next } = usePagination({
    items,
    pageSize: 1,
    defaultPage: 1,
  });

  if (!results.length) return null;
  return (
    <Box className={classes.preview}>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <Box>
            <IconButton onClick={previous}>
              <ArrowCircleLeftIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box>
            <BlobImage blob={results[0].blob} />
          </Box>
        </Grid>
        <Grid item xs={1}>
          <Box>
            <IconButton onClick={next}>
              <ArrowCircleRightIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Preview;
