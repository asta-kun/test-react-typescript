import { defaultsDeep } from 'lodash';

interface Options {
  upperCase: Partial<{
    year: boolean;
    month: boolean;
    day: boolean;
  }>;
}

/**
 * Returns date format used by Intl.DateTimeFormat (for specified `options`).
 * Example for Serbia: `DD/MM/YYYY`
 *
 * **Note** that this will always return the two decimal format for day and month and four for year (e.g. `DD/MM/YYYY`)
 */
export const getLocalShortDateFormat = (
  locale: string,
  options?: Partial<Options>
): string => {
  const { upperCase } = defaultsDeep(options, {
    upperCase: {
      year: true,
      month: true,
      day: true,
    },
  } as Options) as Options;

  const format = {
    year: 'YYYY',
    month: 'MM',
    day: 'DD',
  };

  const year = 2222;
  const month = 12;
  const day = 15;
  const date = new Date(year, month - 1, day);

  const formattedDate = new Intl.DateTimeFormat(locale).format(date);
  return formattedDate
    .replace(
      `${year}`,
      upperCase.year ? format.year.toUpperCase() : format.year.toLowerCase()
    )
    .replace(
      `${month}`,
      upperCase.month ? format.month.toUpperCase() : format.month.toLowerCase()
    )
    .replace(
      `${day}`,
      upperCase.day ? format.day.toUpperCase() : format.day.toLowerCase()
    );
};
