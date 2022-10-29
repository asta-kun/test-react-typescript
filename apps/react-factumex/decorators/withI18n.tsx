import { useIsomorphicLayoutEffect } from '@factumex/core/hooks';
import React, { ComponentType } from 'react';
import { useDispatch } from 'react-redux';
import {
  LocaleSetting,
  localeSettings,
  defaultLocale,
} from '../config/i18n/settings';
import { setLocale } from '../config/redux/store/i18n/slice';

function getLocale(target?: string): LocaleSetting {
  // logic to get locale from target

  return localeSettings[defaultLocale];
}

function withI18n<T>(Component: ComponentType<T | unknown>): ComponentType<T> {
  return function I18nDecorator(props) {
    const dispatch = useDispatch();

    useIsomorphicLayoutEffect(function setDefaultLocale() {
      dispatch(setLocale(getLocale().locale));
    }, []);

    return (
      <>
        <Component {...props} />
      </>
    );
  };
}

export default withI18n;
