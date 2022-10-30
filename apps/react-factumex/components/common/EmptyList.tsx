import { Box } from '@mui/material';
import React, { ReactElement } from 'react';

const EmptyList = (): ReactElement => {
  return (
    <Box textAlign="center">
      <Box component="h3">Empty List</Box>
    </Box>
  );
};

export default EmptyList;
