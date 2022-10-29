import React, { ReactElement, ReactNode } from 'react';
import { MuiThemeProvider } from './index';
import { Provider } from 'react-redux';
import { store } from './redux';
import LocaleDate from './i18n/LocaleDate';

interface Props {
  children: ReactNode;
}

const DefaultRootProviders = ({ children }: Props): ReactElement => {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <LocaleDate>{children}</LocaleDate>
      </MuiThemeProvider>
    </Provider>
  );
};

export default DefaultRootProviders;
