import React, { ForwardedRef, forwardRef, ReactElement } from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';

const I18nDatePicker = forwardRef(function I18nDatePicker(
  props: DatePickerProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  return <DatePicker {...props} ref={ref} />;
});

export default I18nDatePicker;
