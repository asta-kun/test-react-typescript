import React, { ReactElement, ReactNode } from 'react';
import { localeSettings } from './settings';
import { LocalizationProvider } from '@mui/x-date-pickers';
import DateAdapter from '@mui/lab/AdapterLuxon';
import { useSelector } from 'react-redux';
import { selectI18n } from '../redux/store/i18n/slice';

interface Props {
  children: ReactNode;
}

const LocaleDate = ({ children }: Props): ReactElement => {
  const { locale } = useSelector(selectI18n);
  return (
    <LocalizationProvider
      dateAdapter={DateAdapter}
      locale={localeSettings[locale].language}
    >
      {children}
    </LocalizationProvider>
  );
};

export default LocaleDate;
