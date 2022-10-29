import { DateTime } from 'luxon';

export const toUSFormatDate = (date: DateTime): string => {
  return date.toFormat('MM/dd/yyyy');
};
