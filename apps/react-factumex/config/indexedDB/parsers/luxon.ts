import { DateTime } from 'luxon';

interface LuxonParser {
  dump(date: DateTime): string;
  load(isoDate: string): DateTime;
}

const luxonParser: LuxonParser = {
  dump: (date: DateTime): string => {
    return date.toISO();
  },
  load: (isoDate: string): DateTime => {
    const date = DateTime.fromISO(isoDate);
    return date;
  },
};

export default luxonParser;
