import React, { ComponentType, ReactElement } from 'react';
import withI18n from './withI18n';
import withPersistedData from './withPersistData';

function withDefaultDecorators<T>(
  Component: ComponentType<T | unknown>
): ComponentType<T> {
  const NextComponent = (props: T): ReactElement => {
    return <Component {...props} />;
  };

  return withI18n(withPersistedData(NextComponent as ComponentType<unknown>));
}

export default withDefaultDecorators;
