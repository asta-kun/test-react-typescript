import { useIsomorphicLayoutEffect } from '@factumex/core/hooks';
import React, { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../config/redux/store/auth/slice';
import useNavigation, { Page } from '../hooks/use-navigation';

function withSessionOnLogin<T>(
  Component: ComponentType<T | unknown>
): ComponentType<T> {
  return function PageDecorator(props) {
    const { token } = useSelector(selectAuth);

    const {
      withEvents: { employees },
    } = useNavigation(Page.login);

    useIsomorphicLayoutEffect(() => {
      // if token is not empty, go to employees page
      if (token) employees();
    }, [token]);

    if (token) return null;
    return <Component {...props} />;
  };
}

export default withSessionOnLogin;
