import { Box } from '@mui/material';
import React, { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../config/redux/store/auth/slice';
import Error404 from '../containers/Error';

function withProtected<T>(
  Component: ComponentType<T | unknown>
): ComponentType<T> {
  return function PageDecorator(props) {
    const { token } = useSelector(selectAuth);

    if (!token)
      return (
        <Box textAlign="center" pt={20}>
          <Error404
            code={401}
            description="You are not allowed to see this section."
          />
        </Box>
      );
    return <Component {...props} />;
  };
}

export default withProtected;
