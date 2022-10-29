import React, { ComponentType } from 'react';
import StandardPage from '../containers/StandardPage';

function withDefaultPageDecorator<T>(
  Component: ComponentType<T | unknown>
): ComponentType<T> {
  return function PageDecorator(props) {
    return (
      <StandardPage>
        <Component {...props} />
      </StandardPage>
    );
  };
}

export default withDefaultPageDecorator;
