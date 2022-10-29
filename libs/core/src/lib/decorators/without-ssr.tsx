import { NoSsr } from '@mui/material';
import React, { ReactElement, FC } from 'react';

export const withoutSSR = <T,>(Component: FC<T>) => {
  return (props: T): ReactElement => (
    <NoSsr>
      <Component {...props} />
    </NoSsr>
  );
};
